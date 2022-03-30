import { HomeService } from './home.service';
import { Component, Input, OnInit } from '@angular/core';
import { Aluno } from './aluno.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private service: HomeService) {}

  @Input() dados: Aluno;

  ngOnInit(): void {
    this.service.buscaAlunos().subscribe(data => this.dados = data);
  }
}
