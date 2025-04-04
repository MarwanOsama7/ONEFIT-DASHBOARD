import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponseShipping, Shipping } from 'src/app/Models/Shipping';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private globalApi = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  insertShipping(shippingData: any): Observable<any> {
    return this.http.post<Shipping>(this.globalApi + "/admin/shipping/insert", shippingData);
  }
  public update(id: number, categoryData: Shipping): Observable<Shipping> {
    return this.http.put<Shipping>(this.globalApi + '/admin/shipping/update/' + id, categoryData);
  }
  getShipping(page: number = 0, size: number = 10): Observable<PaginatedResponseShipping> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponseShipping>(this.globalApi + "/admin/shippingpaginate/findall", { params });
  }
  findById(id: Number) {
    return this.http.get<Shipping>(this.globalApi + "/admin/shipping/findbyid/" + id);
  }
  toggleFreeShippingForAll(): Observable<any> {
    return this.http.put<any>(this.globalApi + "/admin/toggle-all", {});
  }
}
