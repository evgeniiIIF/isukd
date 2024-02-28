import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryTableComponent } from './dictionary-table.component';

describe('TableComponent', () => {
  let component: DictionaryTableComponent;
  let fixture: ComponentFixture<DictionaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
