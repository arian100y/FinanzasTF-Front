import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioLoginComponent } from './negocio-login.component';

describe('NegocioLoginComponent', () => {
  let component: NegocioLoginComponent;
  let fixture: ComponentFixture<NegocioLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegocioLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocioLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
