import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CastleService {

  constructor() {
  }

  public indexesOfCastle: any[] = [];
  public peekNValleys: any[] = [];

  getPeaksAndValleysIndexes(landscape: any): string[] {
    // tslint:disable-next-line:one-variable-per-declaration prefer-const
    let index = 0, prev, current, next, max = landscape.length - 1, peaksAndValleys = [];
    while (index <= max) {
      const prevIndex = index - 1;
      if (prevIndex < 0) {
        peaksAndValleys[index] = '*';
        index++;
        continue;
      }
      prev = landscape[prevIndex];
      // increment index proceed until there is a change to account for multiples
      while ((index < max) && (landscape[index] === landscape[index + 1])) {
        index++;
      }
      if (index >= max) {
        peaksAndValleys[index] = '*';
        break;
      }

      current = landscape[index];
      next = landscape[index + 1];
      if (prev !== landscape[prevIndex]) {
        prev = landscape[prevIndex];
      }
      if ((current < prev) && (current < next)) {
        // valley
        peaksAndValleys[index] = 'v';
        index++;
        continue;
      }
      if ((current > prev) && (current > next)) {
        // peak
        peaksAndValleys[index] = 'p';
        index++;
        continue;
      }
      index++;
    }
    return peaksAndValleys;
  }

  public countCastles(landscape: number[]): number {

    this.indexesOfCastle = [];

    const convertStringToNumber = landscape;
    /*console.log(landscape);*/
    const array = this.getPeaksAndValleysIndexes(convertStringToNumber);
    this.indexesOfCastle = array;
    /*console.log(array);*/
    return array.filter(x => x === 'v' || x === 'p' || x === '*').length;

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
