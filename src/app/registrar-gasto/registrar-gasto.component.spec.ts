import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGastoComponent } from './registrar-gasto.component';

describe('RegistrarGastoComponent', () => {
  let component: RegistrarGastoComponent;
  let fixture: ComponentFixture<RegistrarGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarGastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
