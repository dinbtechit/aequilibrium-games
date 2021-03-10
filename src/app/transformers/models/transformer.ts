export enum ITeam {
  Autobot = 'autobot',
  Deception = 'decepticon'
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
  battleResults?: IIndividualBattleResults;
}

export enum IIndividualBattleResults {
  Winner = 'winner',
  Loser = 'loser',
  Tie = 'tie',
  Survivor = 'survivor'
}

export enum IBattleResults {
  Autobots = 'autobots',
  Decepticons = 'decepticons',
  AllDestroyed = 'allDestroyed',
  Tie = 'tie',
  BattleInit = 'battleInit'
}

export interface IBattleStats {
  numberOfBattles: number;
  battleResults: IBattleResults;
  winningTeam: Map<string, ITransformer>;
  losingTeam: Map<string, ITransformer>;
}
