import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../../models/user.model';
import { checkAuthResponse } from '../interfaces/check-auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  public user?: User;

  constructor() {}

  /**
   * Logs in a user with the provided username and password.
   * @param username The username of the user.
   * @param password The password of the user.
   * @returns An observable of the HTTP response containing the authentication token.
   */
  async loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/auth/token/login';
    const body = { username: username, password: password };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Logs out the user using the token endpoint.
   * @returns An observable of the HTTP response.
   */
  async logoutWithTokenEndpoint() {
    const url = environment.baseUrl + '/auth/token/logout';
    const body = {};

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Deletes the user account.
   * @param password The current password of the user.
   * @returns An observable of the HTTP response.
   */
  async deleteUser(password: string) {
    const url = environment.baseUrl + '/auth/users/me/';
    const body = { current_password: password };

    return lastValueFrom(this.http.request('delete', url, { body }));
  }

  /**
   * Checks if the user is authenticated.
   * @returns A boolean indicating whether the user is authenticated.
   */
  async checkAuth() {
    const url = `${environment.baseUrl}/auth/users/me/?${new Date().getTime()}`;

    try {
      const resp = await lastValueFrom(this.http.get<checkAuthResponse>(url));
      this.user = new User(resp);

      return resp && resp.id;
    } catch (err) {
      return false;
    }
  }

  /**
   * Updates the user's information.
   * @param user The updated user object.
   * @returns An observable of the HTTP response.
   */
  async updateUser(user: User) {
    const url = environment.baseUrl + '/auth/users/me/';
    const body = user.asJson();

    return lastValueFrom(this.http.patch(url, body));
  }

  /**
   * Registers a new user.
   * @param username The username of the new user.
   * @param email The email address of the new user.
   * @param password The password of the new user.
   * @param passwordRepeat The repeated password for confirmation.
   * @returns An observable of the HTTP response.
   */
  async registerUser(
    username: string,
    email: string,
    password: string,
    passwordRepeat: string
  ) {
    const url = environment.baseUrl + '/auth/users/';
    const body = {
      username: username,
      email: email,
      password: password,
      re_password: passwordRepeat,
    };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Authenticates an email for activation.
   * @param uid The user ID for email authentication.
   * @param token The activation token.
   * @returns An observable of the HTTP response.
   */
  async authenticateEmail(uid: string, token: string) {
    const url = environment.baseUrl + '/auth/users/activation/';
    const body = { uid: uid, token: token };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Requests a password reset for the user's email.
   * @param email The email address for password reset.
   * @returns An observable of the HTTP response.
   */
  async requestPasswordReset(email: string) {
    const url = environment.baseUrl + '/auth/users/reset_password/';
    const body = { email: email };

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Sets a new password using the provided user ID, token, and password.
   * @param uid The user ID.
   * @param token The password reset token.
   * @param password The new password.
   * @returns An observable of the HTTP response.
   */
  async setNewPassword(uid: string, token: string, password: string) {
    const url = environment.baseUrl + '/auth/users/reset_password_confirm/';
    const body = { uid: uid, token: token, new_password: password };

    return lastValueFrom(this.http.post(url, body));
  }
}
