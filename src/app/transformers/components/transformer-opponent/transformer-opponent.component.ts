import {Component, Input, OnInit} from '@angular/core';
import {ITransformer} from '../../models/transformer';
import {TransformersService} from '../../services/transformers.service';

@Component({
  selector: 'app-transformer-opponent',
  templateUrl: './transformer-opponent.component.html',
  styleUrls: ['./transformer-opponent.component.scss']
})
export class TransformerOpponentComponent implements OnInit {

  @Input()
  transformerTeam = '';
  @Input()
  transformer: ITransformer;


  constructor(private transformersService: TransformersService) {
    this.transformer = this.transformersService.initializer();
  }

  ngOnInit(): void {
  }

  onImgError(event: any): void {
    event.target.src = `/assets/images/default-${this.transformerTeam.toLowerCase()}.jpg`;
  }

}
