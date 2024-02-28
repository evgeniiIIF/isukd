import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupComponent } from './multi-lookup.component';

describe('MultiLookupComponent', () => {
  let component: MultiLookupComponent;
  let fixture: ComponentFixture<MultiLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiLookupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
