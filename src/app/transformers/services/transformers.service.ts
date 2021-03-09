import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ITeam, ITransformer} from '../models/transformer';
import * as util from '../../shared/utils/validation-utils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformersService {

  public autobots: Map<string, ITransformer>;
  public deceptions: Map<string, ITransformer>;


  constructor(private http: HttpClient) {
    this.autobots = new Map<string, ITransformer>();
    this.deceptions = new Map<string, ITransformer>();
  }

  public sortTransformers(team: Map<string, ITransformer>): Map<string, ITransformer> {
    team[Symbol.iterator] = function*() {
      yield* [...this.entries()].sort((a, b) => b[1].rank - a[1].rank);
    };
    /*console.log(new Map([...team]));*/
    return new Map([...team]);
  }

  public async getAllTransformers(): Promise<void> {
    const transformers = await this.http.get<any[]>('/assets/data/transformers.json').toPromise().then(
      (resolve) => {
        for (const t of resolve) {
          const [name, team, strength, intelligence, speed, endurance, rank, courage, firepower, skill] = t;
          const transformer: ITransformer = {
            name,
            team: team === 'A' ? ITeam.Autobot : ITeam.Deception,
            strength,
            intelligence,
            speed,
            endurance,
            rank,
            courage,
            firepower,
            skill,
            overallRating: strength + intelligence + speed + endurance + firepower,
          };

          if (!this.validateTransformer(transformer)) {
            // Skip adding Invalid Transformers...
            continue;
          }

          if (transformer.team === ITeam.Autobot) {
            this.autobots.set(name, transformer);
          } else {
            this.deceptions.set(name, transformer);
          }
        }
        // Step 2 - Sort Transformers by rank
        this.autobots = this.sortTransformers(this.autobots);
        this.deceptions = this.sortTransformers(this.deceptions);
      });
  }

  private validateTransformer(transformer: ITransformer): boolean {
    // TODO Validate using Schema
    const schema = {
      name: (val: string) => {
        return val !== null;
      },
      team: (val: string) => {
        return val !== null;
      },
      strength: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      intelligence: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      speed: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      endurance: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      rank: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      courage: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      firepower: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      skill: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
      overallRating: (val: number) => {
        return !isNaN(val) && Number(val) === val;
      },
    };
    if (transformer.name === null) {
      return false;
    } else if (!util.checkIfValidNumber(transformer.strength)
      || !util.checkIfValidNumber(transformer.intelligence)
      || !util.checkIfValidNumber(transformer.speed)
      || !util.checkIfValidNumber(transformer.endurance)
      || !util.checkIfValidNumber(transformer.rank)
      || !util.checkIfValidNumber(transformer.courage)
      || !util.checkIfValidNumber(transformer.firepower)
      || !util.checkIfValidNumber(transformer.skill)
      || !util.checkIfValidNumber(transformer.overallRating)) {
      return false;
    }
    return true;
  }
}
