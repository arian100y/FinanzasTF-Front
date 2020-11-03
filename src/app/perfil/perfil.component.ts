import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Cliente } from '../models/Cliente';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cliente:Cliente;
  constructor(private appComponent:AppComponent) { }

  ngOnInit(): void {
    console.log(this.appComponent.info)
    this.cliente = this.appComponent.info;
  }

}
