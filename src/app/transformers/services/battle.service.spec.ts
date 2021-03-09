import {TestBed} from '@angular/core/testing';

import {BattleService} from './battle.service';
import {IBattleResults, ITeam, ITransformer} from '../models/transformer';

// tslint:disable-next-line:typedef
function getTransformer(inputTransformer: any[]) {
  const [name, team, strength, intelligence, speed, endurance, rank, courage, firepower, skill] = inputTransformer;
  const transformer: ITransformer = {
    name,
    team: team === 'A' ? ITeam.Autobot : ITeam.Deception,
    strength,
    intelligence,
    speed,
    endurance,
    rank,
    courage,
    firepower,
    skill,
    overallRating: strength + intelligence + speed + endurance + firepower,
  };
  return {key: name, value: transformer};
}

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
  });

  fit('Soundwave vs Bluestreak', () => {
    const autobotR = ['Bluestreak', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR = ['Soundwave', 'D', 8, 9, 2, 6, 7, 5, 6, 10];
    expect(IBattleResults.Decepticons).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });

  fit('Soundwave vs Bluestreak with same points Tie', () => {
    const autobotR = ['Bluestreak', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR = ['Soundwave', 'D', 6, 6, 7, 9, 5, 2, 9, 7];
    expect(IBattleResults.Tie).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });

  fit('Optimus Prime (autobot) vs Soundwave - Special Condition', () => {
    const autobotR = ['Optimus Prime', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR = ['Soundwave', 'D', 6, 6, 7, 9, 5, 2, 9, 7];
    expect(IBattleResults.Autobots).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });

  fit('Soundwave vs Optimus Prime (Decep) - Special Condition', () => {
    const autobotR = ['Soundwave', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR  = ['Optimus Prime', 'D', 6, 6, 7, 9, 5, 2, 9, 7];
    expect(IBattleResults.Decepticons).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });

  fit('Soundwave vs soundwave - All Destroed Special Condition', () => {
    const autobotR = ['Soundwave', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR  = ['Soundwave', 'D', 6, 6, 7, 9, 5, 2, 9, 7];
    expect(IBattleResults.AllDestroyed).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });

  fit('Optimus Prime vs Pre - All Destroed Special Condition', () => {
    const autobotR = ['Optimus Prime', 'A', 6, 6, 7, 9, 5, 2, 9, 7];
    const deceptionR  = ['Predaking', 'D', 6, 6, 7, 9, 5, 2, 9, 7];
    expect(IBattleResults.Tie).toEqual(service.battle(getTransformer(autobotR), getTransformer(deceptionR)));
  });
});

