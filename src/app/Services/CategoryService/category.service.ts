import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, PaginatedResponse } from 'src/app/Models/Category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private globalApi = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  insertCategory(categoryData: any): Observable<any> {
    return this.http.post<Category>(this.globalApi + "/admin/categoryinsert/insert", categoryData);
  }
  public update(id: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(this.globalApi + '/admin/category/update/' + id, categoryData);
  }
  getCategories(page: number = 0, size: number = 10): Observable<PaginatedResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse>(this.globalApi + "/admin/categorypaginate/findall", { params });
  }
  findById(id: Number) {
    return this.http.get<Category>(this.globalApi + "/admin/category/findbyid/" + id);
  }

  getCategoriesWithCategoryTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.globalApi+"/admin/getCategoryWithCategoryTypes");
  }

  getCategoryIdsAndNames(): Observable<any> {
    return this.http.get<any>(this.globalApi +"/admin/findcategoryidandname");
  }

  getCategoryTypeIdsAndNames(): Observable<any> {
    return this.http.get<any>(this.globalApi +"/admin/findcategorytypeidandname");
  }
}
