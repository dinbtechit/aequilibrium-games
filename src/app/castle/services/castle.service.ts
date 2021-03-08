import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CastleService {

  constructor() {
  }

  public indexesOfCastle: any[] = [];

  public countCastles(landscape: number[]): number {

    this.indexesOfCastle = [];

    const sameLandscape = landscape.every(land => land === landscape[0]);

    if (sameLandscape) {
      if (landscape[0] == null) {
        return 0;
      }
      this.indexesOfCastle.push(landscape.length - 1);
      return 1;
    }

    let count = 1;

    for (let idx = 0; idx < landscape.length; idx++) {
      if (landscape[idx] > landscape[idx + 1]) {
        this.indexesOfCastle.push(idx);
        count++;
      } else if (landscape[idx] < landscape[idx + 1]) {
        this.indexesOfCastle.push(idx);
        count++;
      }
    }
    const lastCastleBuildIn = this.indexesOfCastle.indexOf(this.indexesOfCastle.length - 1);
    if (lastCastleBuildIn < landscape.length - 1) {
      this.indexesOfCastle.push(landscape.length - 1);
    }
    /*console.log(this.indexesOfCastle);*/
    return count;
  }


}
