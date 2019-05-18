import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProfilComponent } from './register-profil.component';

describe('RegisterProfilComponent', () => {
  let component: RegisterProfilComponent;
  let fixture: ComponentFixture<RegisterProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
