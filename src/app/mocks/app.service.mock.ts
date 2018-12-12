import { of, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

export class AppServiceMock implements AppService {
  clickerLogger: Subject<any> = new Subject();
  reactiveMethod(): Observable<number[]> {
    return of([1, 2, 3, 4, 5]);
  }
}
