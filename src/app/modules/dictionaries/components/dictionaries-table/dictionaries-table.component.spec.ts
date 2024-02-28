import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesTableComponent } from './dictionaries-table.component';

describe('DictionariesTableComponent', () => {
  let component: DictionariesTableComponent;
  let fixture: ComponentFixture<DictionariesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionariesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionariesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
