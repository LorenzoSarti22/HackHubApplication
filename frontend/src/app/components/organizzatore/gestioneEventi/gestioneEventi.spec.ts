import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneEventi } from './gestioneEventi';

describe('GestioneEventi', () => {
  let component: GestioneEventi;
  let fixture: ComponentFixture<GestioneEventi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioneEventi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioneEventi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
