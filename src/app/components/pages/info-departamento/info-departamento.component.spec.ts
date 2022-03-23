import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDepartamentoComponent } from './info-departamento.component';

describe('InfoDepartamentoComponent', () => {
  let component: InfoDepartamentoComponent;
  let fixture: ComponentFixture<InfoDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
