import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appComponent:AppComponent, private router : Router) { }

  ngOnInit(): void {
    if(this.appComponent.loggedInNegocio === true){
      this.router.navigate(['clientes'])
    }
    if(this.appComponent.loggedInCliente === true){
      this.router.navigate(['pagos-cliente'])
    }
  }

}
