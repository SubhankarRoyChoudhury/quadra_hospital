import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'http://127.0.0.1:8000';

  http_headers_urlencoded = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  http_headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/', {
      headers: this.http_headers_urlencoded,
    });
  }

  findUserById(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/users/' + id, {
      headers: this.http_headers_urlencoded,
    });
  }

  create(post: Post): Observable<any> {
    return this.httpClient.post(
      this.apiURL + '/users/create/',
      JSON.stringify(post),
      {
        headers: this.http_headers_urlencoded,
      }
    );
  }

  // update(id: number, post: Post): Observable<any> {
  //   const payload = new HttpParams().set('data', JSON.stringify(post));

  //   return this.httpClient.put(
  //     this.apiURL + '/updateUsers/' + id + '/update/',
  //     payload,
  //     {
  //       headers: this.http_headers_urlencoded,
  //     }
  //   );
  // }

  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(
      `${this.apiURL}/updateUsers/${id}/update/`,
      // this.apiURL + '/updateUsers/' + id + '/update/',
      JSON.stringify(post),
      {
        headers: this.http_headers_urlencoded,
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/users/' + id + '/delete/', {
      headers: this.http_headers_urlencoded,
    });
  }
}
