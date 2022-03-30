import { HttpClient } from '@angular/common/http';
import { HomeService } from './components/home/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from './components/home/aluno.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'api-alunos';

  constructor(
    private service: HomeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
    ) {}

  ngOnInit(): void {

    this.dadosDelete = this.formBuilder.group({
      idAlunoInput: ['', Validators.required],
    });

    this.dadosAdicionar = this.formBuilder.group({
      nomeAlunoInput: ['', Validators.required],
      serieAlunoInput: ['', Validators.required],
      matriculaAlunoInput: ['', Validators.required],
    });

    this.dadosAtualizar = this.formBuilder.group({
      idAlunoInputAtt: ['', Validators.required],
      nomeAlunoInputAtt: ['', Validators.required],
      serieAlunoInputAtt: ['', Validators.required],
      matriculaAlunoInputAtt: ['', Validators.required],
    });
  }

  private resetaCor(tipo1, tipo2): void {
    document.getElementById(tipo1).style.color = 'black';
    document.getElementById(tipo2).style.color = 'black';
  }

  public att = false;
  public adc = false;
  public exc = false;

  public dadosAdicionar: FormGroup;
  public nomeAlunoInput: String;
  public serieAlunoInput: String;
  public matriculaAlunoInput: String;

  public dadosDelete: FormGroup;
  public idAlunoInput: number;

  public dadosAtualizar: FormGroup;
  public idAlunoInputAtt: number;
  public nomeAlunoInputAtt: String;
  public serieAlunoInputAtt: String;
  public matriculaAlunoInputAtt: String;

  public attAluno() {
    this.resetaCor('liAdc', 'liExc');
    document.getElementById('liAtt').style.color = 'green';

    this.att = true;
    this.adc = false;
    this.exc = false;
  }

  public adcAluno() {
    this.resetaCor('liAtt', 'liExc');
    document.getElementById('liAdc').style.color = 'green';

    this.adc = true;
    this.att = false;
    this.exc = false;
  }

  public excAluno() {
    this.resetaCor('liAdc', 'liAtt');
    document.getElementById('liExc').style.color = 'green';

    this.exc = true;
    this.adc = false;
    this.att = false;
  }

  public excluirAluno() {
    this.service.excluiAluno(this.idAlunoInput).subscribe(
      (data) => {
        console.log('Aluno Excluído Com Sucesso!');
      },
      (error) => {
        console.log(error);
      }
    );

    window.location.reload();
  }

  public adicionarAluno() {
    const dadosEmitir: Aluno = {
      nome: this.nomeAlunoInput,
      matricula: this.matriculaAlunoInput,
      serieAno: this.serieAlunoInput,
    };

    this.service.adicionarAluno(dadosEmitir).subscribe(
      (data) => {
        console.log('Aluno Cadastrado Com Sucesso!');
      },
      (error) => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  public atualizarAluno() {
    const dadosEmitir: Aluno = {
      nome: this.nomeAlunoInputAtt,
      matricula: this.matriculaAlunoInputAtt,
      serieAno: this.serieAlunoInputAtt,
    };

    this.service.atualizarAluno(this.idAlunoInputAtt, dadosEmitir).subscribe(
      (data) => {
        console.log('Aluno Atualizado Com Sucesso!');
      },
      (error) => {
        console.log(error);
      }
    );

    window.location.reload();
  }
}
