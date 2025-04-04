import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagesComponent } from './edit-images.component';

describe('EditImagesComponent', () => {
  let component: EditImagesComponent;
  let fixture: ComponentFixture<EditImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditImagesComponent]
    });
    fixture = TestBed.createComponent(EditImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
