import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-authenticate-email',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './authenticate-email.component.html',
  styleUrl: './authenticate-email.component.scss',
})
export class AuthenticateEmailComponent {
  private uid: string = '';
  private token: string = '';
  public sendSuccessful: boolean = false;

  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This method retrieves the 'uid' and 'token' from the route parameters and assigns them to the component's properties.
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('uid');
    const token = this.route.snapshot.paramMap.get('token');

    if (id && token) {
      this.uid = id;
      this.token = token;
    }
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   * This method attempts to authenticate the email using the 'uid' and 'token'. If authentication is successful,
   * it sets 'sendSuccessful' to true. If there is an error, it logs the error to the console.
   */
  async ngAfterViewInit() {
    try {
      await this.authService.authenticateEmail(this.uid, this.token);
      this.sendSuccessful = true;
    } catch (err) {
      console.error(err);
    }
  }
}
