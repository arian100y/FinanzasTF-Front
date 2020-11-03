import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarClienteTasaComponent } from './registrar-cliente-tasa.component';

describe('RegistrarClienteTasaComponent', () => {
  let component: RegistrarClienteTasaComponent;
  let fixture: ComponentFixture<RegistrarClienteTasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarClienteTasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarClienteTasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
