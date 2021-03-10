import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IBattleStats, IIndividualBattleResults, ITransformer} from '../../models/transformer';
import {MatTableDataSource} from '@angular/material/table';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-battle-result',
  templateUrl: './battle-result.component.html',
  styleUrls: ['./battle-result.component.scss']
})
export class BattleResultComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'team', 'rank', 'battleResults'];
  winnerDatasource: MatTableDataSource<ITransformer>;
  losingTeamSurvivorsDatasource: MatTableDataSource<ITransformer>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: IBattleStats) {

    const winningTeam: ITransformer[] = [];
    for (const [key, value] of this.data.winningTeam) {
      winningTeam.push(value);
    }

    this.winnerDatasource = new MatTableDataSource(winningTeam);
    const survivors: ITransformer[] = [];
    for (const [k, v] of data.losingTeam) {
      if (v.battleResults === IIndividualBattleResults.Survivor) {
        survivors.push(v);
      }
    }
    this.losingTeamSurvivorsDatasource = new MatTableDataSource<ITransformer>(survivors);

  }

  ngOnInit(): void {
  }

  onImgError(event: any, team: string): void {
    event.target.src = `/assets/images/default-${team.toLowerCase()}.jpg`;
  }

  public get IIndividualBattleResults(): any {
    return IIndividualBattleResults;
  }

  originalOrder(a: KeyValue<string, ITransformer>, b: KeyValue<string, ITransformer>): number {
    return 0;
  }
}
