import { Injectable } from '@angular/core';
import {ITransformer} from '../models/transformer';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

  battle(transformers: Map<string, ITransformer[]>): void {

  }
}
