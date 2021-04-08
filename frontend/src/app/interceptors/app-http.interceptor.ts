import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    @Inject('API_URL') private baseUrl: string,
    public router: Router,
    public toasterService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  counter = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.spinner.show();
    request = request.clone({ url: `${this.baseUrl}/${request.url}`});
    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body) {
            evt.body.message && this.toasterService.success(evt.body.message)
          } this.spinner.hide();
        }
      }, errEvt => {
        this.spinner.hide();
        if(this.counter > 0) {
          errEvt.error.message ? this.toasterService.error(errEvt.error.message) : this.toasterService.error('Something went wrong');
        }
        // for the Preflight request
        ++this.counter;
      })
    );
  }
}



