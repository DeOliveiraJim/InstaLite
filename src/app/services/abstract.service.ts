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
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = 'Erreur !!';
      if (error.error.message != undefined) {
        errorMessage = 'Erreur : ' + error.error.message;
      } else if (error.error.error != undefined) {
        errorMessage = 'Erreur : ' + error.error.error;
      } else {
        errorMessage = 'Erreur : ' + error.error;
      }
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
