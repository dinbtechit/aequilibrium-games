import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { CastleService } from './services/castle.service';

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
    // this.grid = [null, , 2, , , , , , , , , , , , , , , , ];
  }

  onCanvasSize(event: MatSliderChange): void {
    setTimeout(() => {
      this.canvasSize = event.value === null ? 0 : event.value;
      this.grid = Array(this.canvasSize).fill(null);
      this.countCastles();
    }, 0);
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

  countCastles(): void {
    this.numberOfCastles = this.castleService.countCastles(this.grid);
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

  castleBuildableLand(landIndex: number): boolean {
    /*this.countCastles();*/
    const buildCastle = this.castleService.indexesOfCastle.indexOf(landIndex) > -1;
    return buildCastle;
  }
}
