import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ErrorHandlerService } from '../ExceptionServices/ErrorHandlerService ';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `${environment.authUrl}`;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password
    }
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      catchError((error) => this.errorHandler.handleError(error)), // Handle errors
      map((response: any) => {
        // Process the response
        sessionStorage.setItem("email", response.email);
        sessionStorage.setItem("accessToken", `Bearer ${response.accessToken}`);
        return response;
      })
    );
  }

  getAuthentication() {
    return sessionStorage.getItem("email");
  }

  getEmail(): string | null {
    if (this.getAuthentication()) {
      return sessionStorage.getItem('email')
    }
    return null; // or undefined if you prefer
  }

  getToken() {
    if (this.getAuthentication()) {
      return sessionStorage.getItem('accessToken')
    }
    return null; // or undefined if you prefer
  }


isLogin() {
  const email = sessionStorage.getItem('email');
  const accessToken = sessionStorage.getItem('accessToken');

  // Check if the user is logged in and has a valid token
  return email !== null && accessToken !== null;
}

isAdmin() {
  const email = sessionStorage.getItem('email');
  const accessToken = sessionStorage.getItem('accessToken');
  const adminUsers = ['user1', 'user2', 'user3']; // List of admin users
  
  // Check if the logged-in user is an admin
  return email !== null && adminUsers.includes(email) && accessToken !== null;
}



  outLogin() {
    return (sessionStorage.getItem('email') == null ||
      sessionStorage.getItem('accessToken') == null);
  }


  logOut() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('accessToken');
  }
}
