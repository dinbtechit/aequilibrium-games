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
  numberInput: string;
  terrainElevation: any;
  clickAndDrag = false;
  numberOfCastles: number;
  planeRotateDegree = 25;

  constructor(private castleService: CastleService) {
    this.canvasSize = 0;
    this.terrainElevation = 0;
    this.grid = [];
    this.numberOfCastles = 0;
    this.numberInput = '';
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
    this.numberInput = this.grid.toString();
    const landscape = this.grid.map(x => x === '' ? -20000 : x)
      .map((x, i) => (x === null ? -20000 : +x));
    this.numberOfCastles = this.castleService.countCastles(landscape);
  }

  castleBuildableLand(landIndex: number): boolean {
    const valueAt = this.castleService.indexesOfCastle[landIndex];
    let buildCastle = false;
    if (valueAt === '*' || valueAt === 'p' || valueAt === 'v') {
      buildCastle = true;
    }
    return buildCastle;
  }

  numericInput(): void {
    setTimeout(() => {
      if (this.numberInput.trim() === '') {
        this.grid = [];
      } else {
        this.grid = this.numberInput.split(',');
      }
      this.countCastles();
    }, 140);
  }
}
