import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransformersService} from './services/transformers.service';
import {IBattleResults, IBattleStats, IIndividualBattleResults, ITeam, ITransformer} from './models/transformer';
import {BattleService} from './services/battle.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.scss']
})
export class TransformersComponent implements OnInit, OnDestroy {

  autobots = new Map<string, ITransformer>();
  decepticons = new Map<string, ITransformer>();

  currentAutobot: ITransformer;
  currentDecepticons: ITransformer;
  subscriptionsA: Subscription;
  subscriptionsD: Subscription;

  autobotTeam = ITeam.Autobot;
  decepticonsTeam = ITeam.Deception;

  battleStats: IBattleStats = {};

  constructor(private transformersService: TransformersService,
              private battleService: BattleService) {
    this.currentAutobot = this.transformersService.initilizer();
    this.currentDecepticons = this.transformersService.initilizer();

    this.subscriptionsA = this.battleService.getOpponents().autobot.subscribe((autobot) => {
      this.currentAutobot = autobot;
    });
    this.subscriptionsD = this.battleService.getOpponents().decepticon.subscribe((deceptions) => {
      this.currentDecepticons = deceptions;
    });
  }

  async ngOnInit(): Promise<void> {
    await this.transformersService.getAllTransformers();
    this.autobots = this.transformersService.autobots;
    this.decepticons = this.transformersService.deceptions;
  }

  ngOnDestroy(): void {
    this.subscriptionsA.unsubscribe();
    this.subscriptionsD.unsubscribe();
  }


  async beginBattle(): Promise<void> {
    // 1. Count the possible battle by team size(s)
    const numberOfPossibleBattles = this.battleService.numberOfPossibleBattles({
      autobots: this.autobots, decepticon: this.decepticons
    });

    const autobotsBattleQ: any = [];
    const decepticonsBattleQ: any = [];


    this.prepareBattleQ({numberOfPossibleBattle: numberOfPossibleBattles, transformersTeam: this.autobots, battleQ: autobotsBattleQ});
    this.prepareBattleQ({numberOfPossibleBattle: numberOfPossibleBattles, transformersTeam: this.decepticons, battleQ: decepticonsBattleQ});

    console.log(autobotsBattleQ);
    console.log(decepticonsBattleQ);

    if (autobotsBattleQ.length === decepticonsBattleQ.length) {

      for (let i = 0; i < numberOfPossibleBattles; i++) {
        const autobot: ITransformer = autobotsBattleQ.shift();
        const decepticon: ITransformer = decepticonsBattleQ.shift();
        this.battleService.setOpponents({autobot, decepticon});
        console.log(autobot);
        console.log(decepticon);
        await this.delay(1000);
        const battleResult: IBattleResults = this.battleService.battle(
          {key: autobot.name, value: autobot},
          {key: decepticon.name, value: decepticon});

        console.log(battleResult);
        if (battleResult === IBattleResults.AllDestroyed) {
          this.prepareBattleStats({
            isAllDestroyed: true,
            numberOfBattles: i + 1,
            autobots: this.autobots,
            decepticons: this.decepticons
          });
          break;
        }

        if (battleResult === IBattleResults.Autobots) {
          autobot.battleResults = IIndividualBattleResults.Winner;
          decepticon.battleResults = IIndividualBattleResults.Loser;
        } else if (battleResult === IBattleResults.Decepticons) {
          decepticon.battleResults = IIndividualBattleResults.Winner;
          autobot.battleResults = IIndividualBattleResults.Loser;
        } else if (battleResult === IBattleResults.Tie) {
          decepticon.battleResults = IIndividualBattleResults.Tie;
          autobot.battleResults = IIndividualBattleResults.Tie;
        }
        this.prepareBattleStats({
          isAllDestroyed: false,
          numberOfBattles: i + 1,
          autobots: this.autobots,
          decepticons: this.decepticons
        });

        console.log(this.battleStats);
      }

    } else {
      console.error('Oops..BattleQ size is not equal.');
    }
  }

  async delay(n: number): Promise<any> {
    n = n || 2000;
    return new Promise(done => {
      setTimeout(() => {
        done();
      }, n);
    });
  }


  prepareBattleQ(args: { numberOfPossibleBattle: number, transformersTeam: Map<string, ITransformer>, battleQ: any }): void {
    const {numberOfPossibleBattle} = args;
    const {transformersTeam} = args;
    const {battleQ} = args;
    if (numberOfPossibleBattle === 0) {
      return;
    }
    let cnt = 1;
    for (const [k, v] of transformersTeam) {
      if (cnt <= numberOfPossibleBattle) {
        console.log(cnt);
        console.log(numberOfPossibleBattle);
        battleQ.push(v);
        cnt += 1;
      } else {
        break;
      }
    }
  }

  prepareBattleStats(args: {
    isAllDestroyed: boolean,
    numberOfBattles: number,
    autobots: Map<string, ITransformer>,
    decepticons: Map<string, ITransformer>
  }): void {
    const {isAllDestroyed} = args;
    const {numberOfBattles} = args;
    const {autobots} = args;
    const {decepticons} = args;

    if (isAllDestroyed) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.AllDestroyed,
      };
      return;
    }

    const numberWinnersInAutobot = this.getCountStats({
      statsFor: IIndividualBattleResults.Winner,
      transformersTeam: autobots
    });

    const numberWinnersInDecepticon = this.getCountStats({
      statsFor: IIndividualBattleResults.Winner,
      transformersTeam: decepticons
    });

    if (numberWinnersInAutobot > numberWinnersInDecepticon) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.Autobots,
      };
      this.markSurvivors({losingTeam: decepticons});

    } else if (numberWinnersInAutobot < numberWinnersInDecepticon) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.Decepticons,
      };
      this.markSurvivors({losingTeam: autobots});
    } else if (numberWinnersInAutobot === numberWinnersInDecepticon) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.Tie,
      };
    } else {
      console.error('Unable to determine winner/survivors');
    }

  }

  getCountStats(args: { statsFor: IIndividualBattleResults, transformersTeam: Map<string, ITransformer> }): number {
    const {transformersTeam} = args;
    const {statsFor} = args;
    let count = 0;
    for (const [k, v] of transformersTeam) {
      if (v.battleResults === statsFor) {
        count += 1;
      }
    }
    return count;
  }

  markSurvivors(args: { losingTeam: Map<string, ITransformer> }): void {
    const {losingTeam} = args;
    for (const [k, v] of losingTeam) {
      if (!v.battleResults) {
        v.battleResults = IIndividualBattleResults.Survivor;
      }
    }
  }


}
