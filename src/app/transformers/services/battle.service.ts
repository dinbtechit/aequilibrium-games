import {Injectable} from '@angular/core';
import {IBattleResults, ITransformer} from '../models/transformer';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() {
  }

  battle(autobot: { key: string, value: ITransformer }, decepticon: { key: string, value: ITransformer }): IBattleResults {

    // Special Rules
    if (autobot.key === decepticon.key) {
      console.log('All Destroyed');
      return IBattleResults.AllDestroyed;
    }

    if (autobot.key === 'Optimus Prime' && decepticon.key !== 'Predaking') {
      console.log('sp - A');
      return IBattleResults.Autobots;
    } else if (decepticon.key === 'Optimus Prime' && autobot.key !== 'Predaking') {
      console.log('sp - D');
      return IBattleResults.Decepticons;
    }

    // 1. 4 or more points Of courage
    const fourOrMorePointsOfCourageAuto: boolean = (autobot.value.courage - decepticon.value.courage) >= 4;
    console.log(`autobot.value.courage - decepticon.value.courage : ${autobot.value.courage} - ${decepticon.value.courage}`)
    const fourOrMorePointsOfCourageDecep: boolean = (decepticon.value.courage - autobot.value.courage) >= 4;
    //    3 or more points Of strength
    const threeOrMorePointsOfStrengthAuto: boolean = (autobot.value.strength - decepticon.value.strength) >= 3;
    console.log(`autobot.value.courage - decepticon.value.courage : ${autobot.value.strength} - ${decepticon.value.strength}`);
    const threeOrMorePointsOfStrengthDecep: boolean = (decepticon.value.strength - autobot.value.strength) >= 3;

    // 2. 3 or more points of Skill
    const threeOrMorePointsOfSkillAuto: boolean = (autobot.value.skill - decepticon.value.skill) >= 3;
    const threeOrMorePointsOfSkillDecep: boolean = (decepticon.value.skill - autobot.value.skill) >= 3;
    console.log(`autobot.value.skill - decepticon.value.skill : ${autobot.value.skill} - ${decepticon.value.skill}`);
    console.log(`threeOrMorePointsOfSkillAuto : ${threeOrMorePointsOfSkillAuto}`);
    console.log(`threeOrMorePointsOfSkillDecep : ${threeOrMorePointsOfSkillDecep}`);

    // overall rating
    const overallRatingAuto: boolean = autobot.value.overallRating > decepticon.value.overallRating;
    const overallRatingDecep: boolean = decepticon.value.overallRating > autobot.value.overallRating;


    if (fourOrMorePointsOfCourageAuto && !fourOrMorePointsOfCourageDecep
      && threeOrMorePointsOfStrengthAuto && !threeOrMorePointsOfStrengthDecep) {
      console.log('condition1.1 - A');
      return IBattleResults.Autobots;
    } else if (!fourOrMorePointsOfCourageAuto && fourOrMorePointsOfCourageDecep
      && !threeOrMorePointsOfStrengthAuto && threeOrMorePointsOfStrengthDecep) {
      console.log('condition1.1 - D');
      return IBattleResults.Decepticons;
    }

    if (threeOrMorePointsOfSkillAuto && !threeOrMorePointsOfSkillDecep) {
      console.log('condition2 -A ');
      return IBattleResults.Autobots;
    } else if (!threeOrMorePointsOfSkillAuto && threeOrMorePointsOfSkillDecep) {
      console.log('condition2 - D');
      return IBattleResults.Decepticons;
    }

    if (overallRatingAuto && !overallRatingDecep) {
      console.log(`condition3 - A => ${autobot.value.overallRating} > ${decepticon.value.overallRating}`);
      return IBattleResults.Autobots;
    } else if (!overallRatingAuto && overallRatingDecep) {
      console.log('condition3 - D');
      return IBattleResults.Decepticons;
    }
    console.log('Tie');
    return IBattleResults.Tie;
  }
}
