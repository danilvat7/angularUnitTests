/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyComponent } from './my.component';
import { AppService } from '../app.service';
import { AppServiceMock } from '../mocks/app.service.mock';
import { of } from 'rxjs';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let de: DebugElement;
  let appService;
  const numbers = [1, 2, 3, 4];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [{ provide: AppService, useClass: AppServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    appService = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calls: reactiveMethod', () => {
    fixture.detectChanges();
    spyOn(appService, 'reactiveMethod').and.returnValue(of(numbers));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.numbers).toEqual(numbers);
  });

  it('should call service method', fakeAsync( () => {
    component.numbers = numbers;
    fixture.detectChanges();
    appService.clickerLogger.next(2);
    tick(500)
    fixture.detectChanges();
    expect(component.numbers).toEqual([4, 3, 2, 1]);

  }));

  it('should call: fireObservable', fakeAsync(() => {
    spyOn(component, 'changeNumbers');
    appService.clickerLogger.next(1)
    tick(500)
    fixture.detectChanges();
    expect(component.changeNumbers).toHaveBeenCalled();
  }));
});
