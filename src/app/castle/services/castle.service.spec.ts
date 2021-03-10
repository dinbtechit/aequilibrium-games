import {TestBed} from '@angular/core/testing';

import {CastleService} from './castle.service';

fdescribe('CastleService', () => {
  let service: CastleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('1.You can always build a castle at the start of the array, provided it is non-empty', () => {
    const landscape: any = [
      [ , 4, 2],
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(2);
    }
  });

  it('2.You can always build a castle at the end of the array, provided it is non-empty', () => {
    const landscape: any = [
      [2, 4, ],
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(2);
    }
  });

  it('3.should build only 1 castle when everything is same landscape (i.e., All Peeks or All Valley)', () => {
    const landscape = [
      [1, 1, 1, 1],
      [2, 2, 2, 2],
      [6, 6, 6, 6],
      [-1, -1, -1, -1],
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(2);
    }
  });

  it('4.should build only 1 castle per peek or valley', () => {
    const landscape = [
      [1, 4, 3, 6, 2],
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(5);
    }
  });

  it('should be able to build only 3 castles when series of integers', () => {
    const landscape = [
      [2, 6, 6, 6, 4], // Peek
      [2, 1, 1, 1, 6], // Valley
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(3);
    }
  });

  it('should be able to build only 3 castles when each integer is different', () => {
    const landscape = [
      [1, 4, 2],
      [6, 2, 4],
    ];
    for (const land of landscape) {
      const numberOfCastles = service.countCastles(land);
      expect(numberOfCastles).toEqual(3);
    }
  });
});
