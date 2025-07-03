import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNavigation } from './toolbar-navigation';

describe('ToolbarNavigation', () => {
  let component: ToolbarNavigation;
  let fixture: ComponentFixture<ToolbarNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
