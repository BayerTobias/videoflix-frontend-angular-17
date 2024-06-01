import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { menuStateService } from '../../services/menu-state.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UsermenuComponent {
  public menuOpen: boolean = false;

  private authService = inject(AuthService);
  private menuService = inject(menuStateService);
  private router = inject(Router);

  togglemenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUploadOverlay() {
    this.menuService.uploadOverlayOpen = !this.menuService.uploadOverlayOpen;
    this.menuOpen = false;
  }

  toggleUserOverlay() {
    this.menuService.userOverlayOpen = !this.menuService.userOverlayOpen;
    this.menuOpen = false;
  }

  async logout() {
    try {
      await this.authService.logoutWithTokenEndpoint();
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error(err);
    }
  }
}
