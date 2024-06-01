import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsermenuComponent } from './user-menu.component';

describe('UsermenuComponent', () => {
  let component: UsermenuComponent;
  let fixture: ComponentFixture<UsermenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
