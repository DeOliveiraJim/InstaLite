import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class AbstractService {
  baseurl = environment.url;

  // HOW TO USE IT IN LES CLASSES DERIVEES ?

  // CreateShop(data: any): Observable<Shop> {
  //   return this.http
  //     .post<Shop>(
  //       this.baseurl + '/shops',
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.errorHandler)); HERE !
  // }
  
  // Error handling
  errorHandler(error: any) {
    if (!environment.production) console.log(error.status);
    return throwError(() => {
      return error;
    });
  }
}
