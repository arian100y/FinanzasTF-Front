export class Tasa {
  id: number;
  monto: number;
  periodo: number;
  periodoCapitalizacion: number;
  tipo: number;
  constructor() {
    this.monto = this.periodo = this.tipo = this.periodoCapitalizacion = 0;
  }
}
