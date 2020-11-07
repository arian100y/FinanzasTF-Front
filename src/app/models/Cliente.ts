import { Deuda } from './Deuda';
import { Perfil } from './Perfil';
import { Tasa } from './Tasa';

export class Cliente{
    credito:string;
    fechaEmision:string;
    id:number;
    constructor(){
        this.perfil = new Perfil();
        this.tasa = new Tasa();
        this.deudas = new Array<Deuda>();
        this.moneda =this.fechaEmision = this.credito= "";
    }
    mantenimiento:boolean;
    moneda:string;
    negocio_id:number;
    perfil:Perfil;
    tasa:Tasa;
    deudas:Deuda[];
    perfil_id:number;

    

}