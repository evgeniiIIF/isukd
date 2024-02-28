import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupItemsTableComponent } from './multi-lookup-items-table.component';

describe('MultiLookupItemsTableComponent', () => {
  let component: MultiLookupItemsTableComponent;
  let fixture: ComponentFixture<MultiLookupItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLookupItemsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLookupItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
