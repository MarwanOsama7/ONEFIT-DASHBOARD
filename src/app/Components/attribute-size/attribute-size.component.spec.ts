import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSizeComponent } from './attribute-size.component';

describe('AttributeSizeComponent', () => {
  let component: AttributeSizeComponent;
  let fixture: ComponentFixture<AttributeSizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeSizeComponent]
    });
    fixture = TestBed.createComponent(AttributeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
