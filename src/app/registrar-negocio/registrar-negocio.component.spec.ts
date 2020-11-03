import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNegocioComponent } from './registrar-negocio.component';

describe('RegistrarNegocioComponent', () => {
  let component: RegistrarNegocioComponent;
  let fixture: ComponentFixture<RegistrarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
