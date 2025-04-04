import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { order, PaginatedResponseOrder } from 'src/app/Models/Orders';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private globalApi = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  getOrders(page: number = 0, size: number = 10): Observable<PaginatedResponseOrder> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponseOrder>(`${this.globalApi}/admin/getallitems/status-process-pending`, { params });
  }
 
  getOrdersByStatusCompleteReturn(page: number = 0, size: number = 10): Observable<PaginatedResponseOrder> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponseOrder>(`${this.globalApi}/admin/getallitems/status-complete-return`, { params });
  }

  updateRequestOrderStatus(id: number, status: number): Observable<string> {
    const params = new HttpParams().set('status', status.toString());
    return this.http.put<string>(`${this.globalApi}/admin/${id}/status`, null, { params });
  }

  findByCodeAndPhoneNumber(name: string): Observable<order[]> {
    return this.http.get<order[]>(`${this.globalApi}/admin/findByCodeOrPhoneNumber/${name}`);
  }

  deleteOrderById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.globalApi}/admin/order/${id}`);
  }
}
