export enum ITeam {
  Autobot = 'A',
  Deception = 'D'
}

export interface ITransformer {
  team: ITeam;
  name: string;
  strength: number;
  intelligence: number;
  speed: number;
  endurance: number;
  rank: number;
  courage: number;
  firepower: number;
  skill: number;
  overallRating: number;
  battleResults?: IBattleResults;
}

export enum IBattleResults {
  Autobots = 'autobots',
  Decepticons = 'decepticons',
  AllDestroyed = 'allDestroyed',
  Tie = 'tie',
  Survivor = 'survivor'
}
