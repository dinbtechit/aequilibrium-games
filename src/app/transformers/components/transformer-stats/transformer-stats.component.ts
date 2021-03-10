import {Component, Input, OnInit} from '@angular/core';
import {ITeam, ITransformer} from '../../models/transformer';
import {TransformersService} from '../../services/transformers.service';


@Component({
  selector: 'app-transformer-stats',
  templateUrl: './transformer-stats.component.html',
  styleUrls: ['./transformer-stats.component.scss']
})
export class TransformerStatsComponent implements OnInit {

  @Input()
  transformerTeam: ITeam = ITeam.Autobot;
  @Input()
  transformer: ITransformer;


  constructor(private transformersService: TransformersService) {
    this.transformer = this.transformersService.initilizer();
  }

  ngOnInit(): void {
  }


}
