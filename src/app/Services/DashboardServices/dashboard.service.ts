import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private globalApi = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  countNeworders(): Observable<any> {
    return this.http.get(this.globalApi + "/countneworders/count");
  }

  countAllorders(): Observable<any> {
    return this.http.get(this.globalApi + "/countallorders/count");
  }

}
