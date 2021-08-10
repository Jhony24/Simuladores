import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroFuturoComponent } from './ahorro-futuro.component';

describe('AhorroFuturoComponent', () => {
  let component: AhorroFuturoComponent;
  let fixture: ComponentFixture<AhorroFuturoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AhorroFuturoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroFuturoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
