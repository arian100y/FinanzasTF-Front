export class Gasto{
    id:number;constructor(){
        this.descripcion = "";
        this.envioMonto = null;
        this.fecha = "";
        this.monto = null;
    }
    descripcion: string;
    deuda_id: number;
    envioMonto: number;
    fecha: string;
    monto: number;
}