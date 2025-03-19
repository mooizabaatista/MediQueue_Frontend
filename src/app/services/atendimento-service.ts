import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendimento } from '../models/atendimento.model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  private apiUrl = 'https://localhost:7260/api/v1/atendimentos'

  constructor(private http: HttpClient) { }

  getAtendimentos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(this.apiUrl);
  }

  getFila(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.apiUrl}/fila`);
  }

  chamarProximo(): Observable<Atendimento> {
    return this.http.post<Atendimento>(`${this.apiUrl}/chamar-proximo`, null);
  }

  getAtendimentoById(id: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.apiUrl}/${id}`);
  }

  addAtendimento(Atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.apiUrl, Atendimento);
  }

  updateAtendimento(Atendimento: Atendimento): Observable<Atendimento> {
    return this.http.put<Atendimento>(this.apiUrl, Atendimento);
  }

  deleteAtendimento(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
