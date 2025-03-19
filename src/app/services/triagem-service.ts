import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Triagem } from '../models/triagem.model'

@Injectable({
  providedIn: 'root'
})
export class TriagemService {

  private apiUrl = 'https://localhost:7260/api/v1/triagens'

  constructor(private http: HttpClient) { }

  getTriagens(): Observable<Triagem[]> {
    return this.http.get<Triagem[]>(this.apiUrl);
  }

  getTriagemById(id: number): Observable<Triagem> {
    return this.http.get<Triagem>(`${this.apiUrl}/${id}`);
  }

  addTriagem(Triagem: Triagem): Observable<Triagem> {
    return this.http.post<Triagem>(this.apiUrl, Triagem);
  }

  updateTriagem(Triagem: Triagem): Observable<Triagem> {
    return this.http.put<Triagem>(this.apiUrl, Triagem);
  }

  deleteTriagem(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
