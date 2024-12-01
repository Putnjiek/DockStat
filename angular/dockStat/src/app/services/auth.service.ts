import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "auth/"

  constructor(private api: ApiService) { }

  /**
   * Enable authentication by setting a password
   * @param {string} password 
   */
  async enable(password: string) {
    await this.api.post(this.url + "enable", password)
  }

  /**
   * Disable authentication by providing the existing password
   * @param {string} password 
   */
  async disable(password: string) {
    await this.api.post(this.url + "disable", password)
  }
}
