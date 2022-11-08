import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string = 'http://localhost:8000/estudiantes/';
  private headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http
      .get(this.url)
      .pipe(map((response) => response as Estudiante[]));
  }

  getById(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}${id}`);
  }

  save(estudiante: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, estudiante, {
      headers: this.headers,
    });
  }

  update(estudiante: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.put<Estudiante>(
      `${this.url}${estudiante.id}`,
      estudiante,
      {
        headers: this.headers,
      }
    );
  }

  delete(id: string): Observable<Estudiante> {
    return this.http.delete<Estudiante>(`${this.url}${id}`, {
      headers: this.headers,
    });
  }
}
