import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {
   clickerLogger: Subject<any> = new Subject();
  constructor() {}

  reactiveMethod(): Observable<any[]> {
    return of([1, 2, 3, 4, 5]).pipe(delay(2000));
  }
}
