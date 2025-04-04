import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponsePromoCode, PromoCode } from 'src/app/Models/PromoCode';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  private globalApi = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  insertPromoCode(promocodeData: any): Observable<any> {
    return this.http.post<PromoCode>(this.globalApi + "/admin/promoCode/insert", promocodeData);
  }

  getPromoCode(page: number = 0, size: number = 10): Observable<PaginatedResponsePromoCode> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponsePromoCode>(this.globalApi + "/admin/promocodepaginate/findall", { params });
  }

  deletePromoCodeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.globalApi}/admin/promocode/${id}`);
  }
}
