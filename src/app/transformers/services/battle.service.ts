import {Injectable} from '@angular/core';
import {IBattleResults, IBattleStats, ITransformer} from '../models/transformer';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  private autobotOpponent = new Subject<ITransformer>();
  private decepticonOpponent = new Subject<ITransformer>();

  constructor() {
  }

  setOpponents(args: { autobot: ITransformer, decepticon: ITransformer }): void {
    const {autobot} = args;
    const {decepticon} = args;
    this.autobotOpponent.next(autobot);
    this.decepticonOpponent.next(decepticon);
  }

  getOpponents(): { autobot: Observable<ITransformer>, decepticon: Observable<ITransformer> } {
    return {autobot: this.autobotOpponent.asObservable(), decepticon: this.decepticonOpponent};
  }

  battle(autobot: { key: string, value: ITransformer }, decepticon: { key: string, value: ITransformer }): IBattleResults {

    // Special Rules
    if (autobot.key === decepticon.key) {
      return IBattleResults.AllDestroyed;
    }

    if (autobot.key === 'Optimus Prime' && decepticon.key !== 'Predaking') {
      console.log('sp - A');
      return IBattleResults.Autobots;
    } else if (decepticon.key === 'Optimus Prime' && autobot.key !== 'Predaking') {
      console.log('sp - D');
      return IBattleResults.Decepticons;
    } else if (autobot.key === 'Optimus Prime' && decepticon.key === 'Predaking') {
      return IBattleResults.Tie;
    } else if (decepticon.key === 'Optimus Prime' && autobot.key === 'Predaking') {
      return IBattleResults.Tie;
    }

    // 1. 4 or more points Of courage
    const fourOrMorePointsOfCourageAuto: boolean = (autobot.value.courage - decepticon.value.courage) <= -4;
    const fourOrMorePointsOfCourageDecep: boolean = (decepticon.value.courage - autobot.value.courage) <= -4;

    //    3 or more points Of strength
    const threeOrMorePointsOfStrengthAuto: boolean = (autobot.value.strength - decepticon.value.strength) >= 3;
    const threeOrMorePointsOfStrengthDecep: boolean = (decepticon.value.strength - autobot.value.strength) >= 3;

    // 2. 3 or more points of Skill
    const threeOrMorePointsOfSkillAuto: boolean = (autobot.value.skill - decepticon.value.skill) >= 3;
    const threeOrMorePointsOfSkillDecep: boolean = (decepticon.value.skill - autobot.value.skill) >= 3;

    // overall rating
    const overallRatingAuto: boolean = autobot.value.overallRating > decepticon.value.overallRating;
    const overallRatingDecep: boolean = decepticon.value.overallRating > autobot.value.overallRating;

    // Battle Rules Condition 1
    if ((fourOrMorePointsOfCourageAuto && threeOrMorePointsOfStrengthAuto)
      && (!fourOrMorePointsOfCourageDecep && !threeOrMorePointsOfStrengthDecep)) {
      return IBattleResults.Autobots;
    } else if ((!fourOrMorePointsOfCourageAuto && !threeOrMorePointsOfStrengthAuto)
      && (fourOrMorePointsOfCourageDecep && threeOrMorePointsOfStrengthDecep)) {
      return IBattleResults.Decepticons;
    }

    // Battle Rules Condition 2
    if (threeOrMorePointsOfSkillAuto && !threeOrMorePointsOfSkillDecep) {
      return IBattleResults.Autobots;
    } else if (!threeOrMorePointsOfSkillAuto && threeOrMorePointsOfSkillDecep) {
      return IBattleResults.Decepticons;
    }

    // Battle Rules Condition 3
    if (overallRatingAuto && !overallRatingDecep) {
      return IBattleResults.Autobots;
    } else if (!overallRatingAuto && overallRatingDecep) {
      return IBattleResults.Decepticons;
    }

    return IBattleResults.Tie;
  }

  numberOfPossibleBattles(args: { autobots: Map<string, ITransformer>, decepticon: Map<string, ITransformer> }): number {
    const {autobots} = args;
    const {decepticon} = args;
    if (autobots?.size <= decepticon?.size) {
      return autobots.size;
    } else {
      return decepticon.size;
    }
  }

  battleStatsInitializer(): IBattleStats {
    return {
      numberOfBattles: 0,
      battleResults: IBattleResults.BattleInit,
      winningTeam: new Map<string, ITransformer>(),
      losingTeam: new Map<string, ITransformer>(),
    };
  }
}
