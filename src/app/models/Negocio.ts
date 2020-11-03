import { StringLiteral } from 'typescript';
import { Cliente } from './Cliente';
import { Perfil } from './Perfil'

export class Negocio{
    id:number;
    perfil:Perfil;
    constructor(){
        this.password = this.codigo = '';
        this.ruc = null;
        this.perfil = new Perfil();
        this.clientes = new Array<Cliente>();
    }
    
    password:string;
    codigo:string;
    clientes:Cliente[];
    ruc:number;
}