import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CastleService {

  constructor() {
  }

  public indexesOfCastle: any[] = [];
  public peekNValleys: any[] = [];

  public countCastles(landscape: number[]): number {
    this.indexesOfCastle = [];
    const convertStringToNumber = landscape;
    /*console.log(landscape);*/
    const array = this.getPeaksAndValleysIndexes(convertStringToNumber);
    this.indexesOfCastle = array;
    /*console.log(array);*/
    return array.filter(x => x === 'v' || x === 'p' || x === '*').length;
  }

  getPeaksAndValleysIndexes(landscape: any): string[] {
    let previousLand;
    let currentLand;
    let nextLand;
    const emptyLand = -20000;
    const fullLandSize = landscape.length - 1;
    const peaksAndValleys = [];
    let index = 0;
    while (index <= fullLandSize) {
      const prevIndex = index - 1;
      if (prevIndex < 0) {
        if (landscape[index] !== emptyLand) {
          peaksAndValleys[index] = '*';
        }
        index++;
        continue;
      }
      previousLand = landscape[prevIndex];
      while ((index < fullLandSize) && (landscape[index] === landscape[index + 1])) {
        index++;
      }
      if (index >= fullLandSize) {
        if (landscape[index] !== emptyLand) {
          peaksAndValleys[index] = '*';
        }
        break;
      }

      currentLand = landscape[index];
      nextLand = landscape[index + 1];
      if (previousLand !== landscape[prevIndex]) {
        previousLand = landscape[prevIndex];
      }
      if ((currentLand < previousLand) && (currentLand < nextLand)) {
        peaksAndValleys[index] = 'v';
        index++;
        continue;
      }
      if ((currentLand > previousLand) && (currentLand > nextLand)) {
        peaksAndValleys[index] = 'p';
        index++;
        continue;
      }
      index++;
    }
    return peaksAndValleys;
  }

  private getPeekAndValleysCount(landscape: number[]): number {
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
    /*console.log(this.peekNValleys);*/
    return count;
  }


}
