import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsizeComponent } from './add-productsize.component';

describe('AddProductsizeComponent', () => {
  let component: AddProductsizeComponent;
  let fixture: ComponentFixture<AddProductsizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductsizeComponent]
    });
    fixture = TestBed.createComponent(AddProductsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
