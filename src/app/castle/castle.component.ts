import {Component, OnInit} from '@angular/core';
import {MatSliderChange} from '@angular/material/slider';
import {CastleService} from './services/castle.service';

@Component({
  selector: 'app-castle',
  templateUrl: './castle.component.html',
  styleUrls: ['./castle.component.scss']
})
export class CastleComponent implements OnInit {
  canvasSize: any;
  grid: any[];
  terrainElevation: any;
  clickAndDrag = false;
  numberOfCastles: number;
  planeRotateDegree = 45;

  constructor(private castleService: CastleService) {
    this.canvasSize = 0;
    this.terrainElevation = 0;
    this.grid = [];
    this.numberOfCastles = 0;
  }

  ngOnInit(): void {

  }

  onCanvasSize(event: MatSliderChange): void {
    this.canvasSize = event.value === null ? 0 : event.value;
    this.grid = Array(this.canvasSize).fill(null);
    this.countCastles();
  }

  mousedown(b: any): void {
    this.clickAndDrag = true;
    if (this.clickAndDrag) {
      this.grid[b] = this.terrainElevation;
      this.countCastles();
    }
  }

  mouseover(b: any): void {
    if (this.clickAndDrag) {
      this.grid[b] = this.terrainElevation;
      this.countCastles();
    }
  }

  mouseup(): void {
    this.clickAndDrag = false;
    this.countCastles();
  }


  rotatePlaneRight(): void {
    if (this.planeRotateDegree !== 360) {
      this.planeRotateDegree = this.planeRotateDegree + 20;
    }
  }

  rotatePlaneLeft(): void {
    if (this.planeRotateDegree !== 0) {
      this.planeRotateDegree = this.planeRotateDegree - 20;
    }
  }

  countCastles(): void {
    const landscape = this.grid.map((x, i) => (x === null ? -200000000 : x));
    this.numberOfCastles = this.castleService.countCastles(landscape);
  }

  castleBuildableLand(landIndex: number): boolean {
    const buildCastle = this.castleService.indexesOfCastle.indexOf(landIndex) > -1;
    return buildCastle;
  }
}
