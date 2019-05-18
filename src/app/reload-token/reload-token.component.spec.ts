import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReloadTokenComponent } from './reload-token.component';

describe('ReloadTokenComponent', () => {
  let component: ReloadTokenComponent;
  let fixture: ComponentFixture<ReloadTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReloadTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReloadTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
