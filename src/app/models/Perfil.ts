export class Perfil{
id:number;
nombre:string;
apellidoM:string;
constructor(){
    this.notificaciones = new Array<Notification>();
    this.nombre = this.apellidoP = this.apellidoM = this.correo = this.direccion = "";
    this.telefono = this.dni = null;
}
apellidoP:string;
correo:string;
telefono:number;
direccion:string;
notificaciones:Notification[];
dni:number;
}