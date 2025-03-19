import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidade } from '../models/especialidade.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  private apiUrl = 'https://localhost:7260/api/v1/Especialidades'

  constructor(private http: HttpClient) { }

  getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.apiUrl);
  }

  getEspecialidade(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${this.apiUrl}/${id}`);
  }

  addEspecialidade(Especialidade: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.apiUrl, Especialidade);
  }

  updateEspecialidade(Especialidade: Especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(this.apiUrl, Especialidade);
  }

  deleteEspecialidade(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
