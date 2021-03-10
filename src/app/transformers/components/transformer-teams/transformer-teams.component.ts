import {Component, Input, OnInit} from '@angular/core';
import {KeyValue} from '@angular/common';
import {IIndividualBattleResults, ITransformer} from '../../models/transformer';

@Component({
  selector: 'app-transformer-teams',
  templateUrl: './transformer-teams.component.html',
  styleUrls: ['./transformer-teams.component.scss']
})
export class TransformerTeamsComponent implements OnInit {

  @Input()
  transformerTeam = '';
  @Input()
  transformers: Map<string, ITransformer>;

  constructor() {
    this.transformers = new Map<string, ITransformer>();
  }

  ngOnInit(): void {
  }

  onImgError(event: any): void {
    event.target.src = `/assets/images/default-${this.transformerTeam.toLowerCase()}.jpg`;
  }

  public get IIndividualBattleResults(): any {
    return IIndividualBattleResults;
  }

  originalOrder(a: KeyValue<string, ITransformer>, b: KeyValue<string, ITransformer>): number {
    return 0;
  }

  reverseKeyOrder(a: KeyValue<string, ITransformer>, b: KeyValue<string, ITransformer>): number {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  valueOrder(a: KeyValue<string, ITransformer>, b: KeyValue<string, ITransformer>): number {
    return b.value.rank - a.value.rank;
  }

}
