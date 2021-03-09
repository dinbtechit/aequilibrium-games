import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TransformersService} from './services/transformers.service';
import {ITeam, ITransformer} from './models/transformer';
import {tap} from 'rxjs/operators';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-transformers',
  templateUrl: './transformers.component.html',
  styleUrls: ['./transformers.component.scss']
})
export class TransformersComponent implements OnInit, AfterViewInit {

  autobots = new Map<string, ITransformer>();
  deceptions = new Map<string, ITransformer>();

  constructor(private tfaService: TransformersService) {
  }

  async ngOnInit(): Promise<void> {
    await this.tfaService.getAllTransformers();
    this.autobots = this.tfaService.autobots;
    this.deceptions = this.tfaService.deceptions;
    this.autobots = await this.tfaService.sortTransformers(this.autobots);
  }

  ngAfterViewInit(): void {

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
