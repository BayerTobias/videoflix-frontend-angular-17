import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonWithoutIconComponent } from '../button-without-icon/button-without-icon.component';
import { Router, RouterModule } from '@angular/router';
import { UsermenuComponent } from '../../../home/components/user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonWithoutIconComponent,
    RouterModule,
    UsermenuComponent,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public signUpPage: boolean = false;
  public forgotPasswordPage: boolean = false;
  public homePage: boolean = false;

  private router = inject(Router);

  ngOnInit() {
    this.signUpPage = this.router.url.includes('/sign-up');
    this.forgotPasswordPage = this.router.url.includes('/forgot-password');
    this.homePage = this.router.url.includes('/home');
  }
}
