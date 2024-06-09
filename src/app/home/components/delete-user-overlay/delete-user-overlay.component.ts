import { Component, inject } from '@angular/core';
import { ButtonWithoutIconComponent } from '../../../shared/components/button-without-icon/button-without-icon.component';
import { AuthService } from '../../../auth/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputWithErrorComponent } from '../../../shared/components/form-input-with-error/form-input-with-error.component';
import { CustomValidators } from '../../../auth/custom-validators';
import { Router } from '@angular/router';
import { menuStateService } from '../../services/menu-state.service';

@Component({
  selector: 'app-delete-user-overlay',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormInputWithErrorComponent,
    ButtonWithoutIconComponent,
  ],
  templateUrl: './delete-user-overlay.component.html',
  styleUrl: './delete-user-overlay.component.scss',
})
export class DeleteUserOverlayComponent {
  private menuService = inject(menuStateService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  public password: FormControl;
  public sending: boolean = false;
  public httpError: boolean = false;

  constructor() {
    this.password = this.fb.control('', [
      Validators.required,
      CustomValidators.passwordLengthValidator(8),
    ]);
  }

  /**
   * Closes the user overlay and opens the main user menu.
   */
  closeOverlay() {
    this.menuService.deleteUserOverlayOpen = false;
    this.menuService.userOverlayOpen = true;
  }

  /**
   * Deletes the user account.
   * @remarks
   * This method sets the sending flag to true and the HTTP error flag to false before attempting to delete the user account.
   * After the deletion request, it clears the local storage and navigates the user to the login page.
   * If an error occurs during the deletion process, it logs the error and sets the HTTP error flag to true.
   */
  async deleteAccount() {
    if (this.password.valid) {
      this.sending = true;
      this.httpError = false;
      try {
        const password = this.password.value;
        await this.authService.deleteUser(password);
        localStorage.clear();
        this.router.navigateByUrl('/login');
      } catch (err) {
        console.error(err);
        this.httpError = true;
      }
      this.sending = false;
      this.password.markAsTouched();
    }
  }
}
