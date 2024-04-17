import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    BASE_URL: string;
    constructor(
        private http: HttpClient,
    ) {
        this.BASE_URL = environment.API_URL;
    }

    getQuestions(): Observable<any> {
        return this.http.get(`assets/json/question.json`).pipe(
          map((response: any) => {
            return response;
          }),
          catchError((err: any) => {
            return err;
          })
        );
      }
      

}