import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosNegocioComponent } from './pagos-negocio.component';

describe('PagosNegocioComponent', () => {
  let component: PagosNegocioComponent;
  let fixture: ComponentFixture<PagosNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
