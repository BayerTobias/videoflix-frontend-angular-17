import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { menuStateService } from '../../services/menu-state.service';
import { merge } from 'rxjs';

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

  /**
   * Toggles the menu open/close state.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Toggles the upload overlay open/close state.
   */
  toggleUploadOverlay() {
    this.menuService.uploadOverlayOpen = !this.menuService.uploadOverlayOpen;
    this.menuOpen = false;
  }

  /**
   * Toggles the user overlay open/close state.
   */
  toggleUserOverlay() {
    this.menuService.userOverlayOpen = !this.menuService.userOverlayOpen;
    this.menuOpen = false;
  }

  /**
   * Routes to the home page with the specified query parameter.
   * @param queryParam - The query parameter for the visibility of the home page.
   */
  routeHome(queryParam: string) {
    this.router.navigate([], {
      queryParams: { visibility: queryParam },
      queryParamsHandling: 'merge',
    });
    this.menuOpen = false;
  }

  /**
   * Logs out the user.
   */
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
