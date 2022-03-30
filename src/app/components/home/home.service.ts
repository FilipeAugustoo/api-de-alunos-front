import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from './aluno.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URL = 'https://aw-alunos-restapi.herokuapp.com/alunos';

  constructor(private httpClient: HttpClient) { }

  public buscaAlunos() {
    return this.httpClient.get<Aluno>(this.URL);
  }

  public excluiAluno(id) {
    return this.httpClient.delete<Aluno>(`${this.URL}/${id}`);
  }

  public adicionarAluno(aluno: Aluno)  {
    return this.httpClient.post(this.URL, aluno);
  }

  public atualizarAluno(id, aluno: Aluno) {
    return this.httpClient.put(`${this.URL}/${id}`, aluno);
  }
}
