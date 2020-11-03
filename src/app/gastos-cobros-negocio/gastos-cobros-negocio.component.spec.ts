import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosCobrosNegocioComponent } from './gastos-cobros-negocio.component';

describe('GastosCobrosNegocioComponent', () => {
  let component: GastosCobrosNegocioComponent;
  let fixture: ComponentFixture<GastosCobrosNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosCobrosNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosCobrosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
