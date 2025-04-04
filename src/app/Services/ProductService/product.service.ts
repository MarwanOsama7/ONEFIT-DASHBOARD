import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image, PaginatedResponseProduct, Product, ProductSizes } from 'src/app/Models/Product';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private globalApi = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.globalApi}/admin/product/insert`, productData);
  }

  updateStockForMultipleSizes(productId: number, sizeUpdates: any[]): Observable<any> {
    const params = { productId: productId.toString() };
    return this.http.put(`${this.globalApi}/admin/update-stock-multiple`, sizeUpdates, {
      params,
      responseType: 'text' // Expect plain text response
    });
  }

  updateProduct(id: number, product: any): Observable<any> {
    const params = { id: id.toString() };
    return this.http.put(`${this.globalApi}/admin/updateproduct`, product, {
      params,
      responseType: 'text' // Expect plain text response
    });
  }

  // Method to update images for a specific product
  updateImagesProduct(productId: number, images: File[]): Observable<string> {
    const formData = new FormData();

    formData.append('productId', productId.toString());

    images.forEach((image, index) => {
      formData.append('images', image);
    });

    return this.http.post(`${this.globalApi}/admin/addnewImages`, formData, {
      responseType: 'text' // Expecting a text response
    });
  }
  deleteImageById(id: Number) {
    return this.http.delete(this.globalApi + "/admin/deleteImagesById/" + id);
  }

  deleteImagesByProductId(productId: number) {
    return this.http.delete(this.globalApi + `/admin/deleteImagesByProductId/` + productId);
  }
  getProducts(page: number = 0, size: number = 10): Observable<PaginatedResponseProduct> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponseProduct>(this.globalApi + "/admin/productpaginate/findall", { params });
  }

  findProductSizeByProductId(id: number) {
    let params = new HttpParams().set('productId', id.toString());
    return this.http.get<ProductSizes[]>(this.globalApi + "/admin/productsize/findbyproductid", { params });
  }

  findImages(id: number): Observable<Image[]> {
    let params = new HttpParams().set('id', id.toString());
    return this.http.get<Image[]>(this.globalApi + "/admin/findimagesbyproductid", { params });
  }


  findByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.globalApi}/admin/findByNameSearch/${name}`);
  }

  findBySlug(slug: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.globalApi + "/product/findbyname/" + slug);
  }

}
