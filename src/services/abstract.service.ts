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
    let errors = error.error.errors;
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = 'Error Code: ${error.status}\n${error.message}\n';
      if (error.error != undefined) {
        errorMessage =
          'Error Code:' +
          error.error.status +
          '\n' +
          '|| ' +
          error.error.message +
          '\n';
      }
      if (errors != undefined) {
        errors.forEach((element: { field: string; message: string }) => {
          errorMessage += element.field + ' -> ' + element.message + '\n';
        });
      }
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
