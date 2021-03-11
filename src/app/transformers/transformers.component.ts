import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransformersService} from './services/transformers.service';
import {IBattleResults, IBattleStats, IIndividualBattleResults, ITeam, ITransformer} from './models/transformer';
import {BattleService} from './services/battle.service';
import {Subscription} from 'rxjs';
import {BattleResultComponent} from './components/battle-result/battle-result.component';
import {MatDialog} from '@angular/material/dialog';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
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

  battleStats: IBattleStats;
  visible = false;

  constructor(private transformersService: TransformersService,
              private battleService: BattleService,
              private dialog: MatDialog) {
    this.currentAutobot = this.transformersService.initializer();
    this.currentDecepticons = this.transformersService.initializer();
    this.battleStats = this.battleService.battleStatsInitializer();

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
    this.visible = false;
    await this.ngOnInit();
    // 1. Count the possible battle by team size(s)
    const numberOfPossibleBattles = this.battleService.numberOfPossibleBattles({
      autobots: this.autobots, decepticon: this.decepticons
    });

    const autobotsBattleQ: any = [];
    const decepticonsBattleQ: any = [];


    this.prepareBattleQ({numberOfPossibleBattle: numberOfPossibleBattles, transformersTeam: this.autobots, battleQ: autobotsBattleQ});
    this.prepareBattleQ({numberOfPossibleBattle: numberOfPossibleBattles, transformersTeam: this.decepticons, battleQ: decepticonsBattleQ});


    if (autobotsBattleQ.length === decepticonsBattleQ.length) {

      for (let i = 0; i < numberOfPossibleBattles; i++) {
        const autobot: ITransformer = autobotsBattleQ.shift();
        const decepticon: ITransformer = decepticonsBattleQ.shift();
        this.battleService.setOpponents({autobot, decepticon});
        this.visible = true;
        await this.delay(1000);
        const battleResult: IBattleResults = this.battleService.battle(
          {key: autobot.name, value: autobot},
          {key: decepticon.name, value: decepticon});

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
      }
      this.visible = false;
      this.displayBattleStatsDialog(this.battleStats);


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
        winningTeam: new Map<string, ITransformer>(),
        losingTeam: new Map<string, ITransformer>()
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
        winningTeam: autobots,
        losingTeam: decepticons
      };
      this.markSurvivors({losingTeam: decepticons});

    } else if (numberWinnersInAutobot < numberWinnersInDecepticon) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.Decepticons,
        winningTeam: decepticons,
        losingTeam: autobots
      };
      this.markSurvivors({losingTeam: autobots});
    } else if (numberWinnersInAutobot === numberWinnersInDecepticon) {
      this.battleStats = {
        numberOfBattles,
        battleResults: IBattleResults.Tie,
        winningTeam: new Map<string, ITransformer>(),
        losingTeam: new Map<string, ITransformer>()
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

  displayBattleStatsDialog(data: IBattleStats): void {
    this.dialog.open(BattleResultComponent, {
      width: '60%',
      data
    });
  }


}
