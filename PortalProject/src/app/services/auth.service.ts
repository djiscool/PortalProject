import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponseDto, UserForAuthenticationDto } from '../Dtos/dtos';
import { catchError, Observable, of, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface UserLogin {
  Username: string;
  Password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  public loginUser = (route: string, body: any) => {
    return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, environment.apiUrl), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }



}
