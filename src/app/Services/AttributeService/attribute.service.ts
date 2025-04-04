import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color, PaginatedResponseColors, PaginatedResponseSize, Size } from 'src/app/Models/Attributes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private globalApi = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  insertColor(color: Omit<Color, 'id'>): Observable<any> {
    return this.http.post<Color>(this.globalApi + "/admin/color/insert", color);
  }

  insertSize(color: Omit<Size, 'id'>): Observable<any> {
    return this.http.post<Size>(this.globalApi + "/admin/size/insert", color);
  }

  findColorIdsAndNames(): Observable<any> {
    return this.http.get<any>(this.globalApi + "/admin/findcoloridsandnames");
  }

  findSizeIdsAndNames(): Observable<any> {
    return this.http.get<any>(this.globalApi + "/admin/findsizeidsandnames");
  }
  getColors(page: number = 0, size: number = 10): Observable<PaginatedResponseColors> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponseColors>(this.globalApi + "/admin/colorpaginate/findall", { params });
  }

  getSizes(page: number = 0, size: number = 10): Observable<PaginatedResponseSize> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponseSize>(this.globalApi + "/admin/sizepaginate/findall", { params });
  }
}
