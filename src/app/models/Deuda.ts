import { Gasto } from './Gasto';

export class Deuda{

    id:number;
    constructor(){
        this.gastos = new Array<Gasto>();
    }
    gastos:Gasto[];
    cliente_id: number;
    fecha: string;
    hayMora: boolean;
    interes: number;
    metodoPago: boolean;
    monto: number;
    montoMantenimiento: number;
    pagado: boolean;
}