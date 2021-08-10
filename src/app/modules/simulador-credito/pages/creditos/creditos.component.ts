import { Component, OnInit, ɵConsole } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA = [
  { capitalReducido: 1, interes: 1, abonoCap: 1.0079, cuota: 2, seguroDes: 3, avpi: 6, ahorro: 4, cuotaFinal: 67 },
  { capitalReducido: 1, interes: 1, abonoCap: 1.0079, cuota: 2, seguroDes: 3, avpi: 6, ahorro: 4, cuotaFinal: 67 },
];

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.scss']
})
export class CreditosComponent implements OnInit {
  lineCredit: any;

  datosTabla = [];
  dataSource: any;
  /* VARIABLES INICIALES */
  capital: number;
  plazo: number;
  tasa: any;
  cuota: number;
  avpi: number;
  ahorro: number;
  seguroDes: number;
  dias: number;


  /* PORCENTAHJE AVPI */
  porcentajeAVPI = 0.02;

  /* PORCENTAHJE AHORRO */
  porcentajeAhorro = 0.06;

  /* SEGURO DESGRAVAMEN */
  porcentajesSeguroDesgra = 0.00066;


  /* VARIABLES TABLA*/
  capitalReducido: number;
  interesTabla: number;
  abonoCapTabla: number;
  seguroDesgraTabla: number;
  cuotaFinalTabla: number;

  totalCapitalReducido: number;
  totalInteresTabla: number;
  totalAbonoCap: number;
  totalSeguroDesgra: number;
  totalCuotaFinal: number;

  frequency: number;
  amortization: any;


  frecuencyList = [
    { forma: 'Diario', number: 1 },
    { forma: 'Semanal', number: 2 },
    { forma: 'Mensual', number: 3 },
    { forma: 'Bimestral', number: 4 },
    { forma: 'Trimestral', number: 5 },
    { forma: 'Tetramestral', number: 6 },
    { forma: 'Semestral', number: 7 },
    { forma: 'Anual', number: 8 },
  ];

  /* lineCreditList = [
    { nombre: 'Credi Ahorro (17,99%)', rate: 17.99 },
    { nombre: 'Micro Credi Ahorro (14,99%)', rate: 14.99 },
  ]; */

  lineCreditList = [
    { nombre: 'Credi Ahorro (14,99%)', rate: 14.99 },
    { nombre: 'Micro Credi Ahorro (17,99%)', rate: 17.99 },
  ];

  amortizationList = [
    { nombre: 'Francés' },
    { nombre: 'Alemán' },
  ];


  displayedColumns: string[] = ['numCuotas', 'capitalReducido', 'interes', 'abonoCap', 'cuota', 'seguroDes', 'avpi', 'ahorro', 'cuotaFinal'];

  constructor() { }

  ngOnInit(): void { }

  reset() {
    this.tasa = 0;
    this.capital = 0;
    this.cuota = 0;
    this.avpi = 0;
    this.ahorro = 0;
    this.interesTabla = 0;
    this.seguroDesgraTabla = 0;
    this.abonoCapTabla = 0;
    this.cuotaFinalTabla = 0;
    this.plazo = 0;
    this.datosTabla = []
    this.dataSource = [];
    this.lineCredit = '';
  }
  rateSelected() {
    this.tasa = Number(this.lineCredit);
  }
  calculeCredit() {
    this.tasa = (this.tasa / 100);
    //this.tasa = (this.tasa / 100);
    this.capitalReducido = this.capital;

    const tasaDiv = this.tasa / 12;

    this.cuota = (tasaDiv * ((1 + tasaDiv) ** this.plazo)) * this.capital / (((1 + tasaDiv) ** this.plazo) - 1);
    this.avpi = this.capital * (this.porcentajeAVPI / this.plazo);
    this.ahorro = this.capital * (this.porcentajeAhorro / this.plazo);


    let totalInteres = 0;
    let totalAbonoCapi = 0;
    let totalCuotas = 0;
    let totalSeguroDesgra = 0;
    let totalAvpi = 0;
    let totalAhorro = 0;
    let totalCuotasFinales = 0;

    /* FOR */
    for (let index = 0; index <= this.plazo; index++) {
      this.interesTabla = ((this.capitalReducido * this.tasa) / 360) * 30;
      this.seguroDesgraTabla = (this.capitalReducido * this.porcentajesSeguroDesgra);
      this.abonoCapTabla = this.cuota - this.interesTabla;
      this.cuotaFinalTabla = (this.cuota + this.ahorro + this.avpi + this.seguroDesgraTabla);

      totalInteres = totalInteres + this.interesTabla;
      totalAbonoCapi = totalAbonoCapi + this.abonoCapTabla;
      totalCuotas = totalCuotas + this.cuota;
      totalSeguroDesgra = totalSeguroDesgra + this.seguroDesgraTabla;
      totalAvpi = totalAvpi + this.avpi;
      totalAhorro = totalAhorro + this.ahorro;
      totalCuotasFinales = totalCuotasFinales + this.cuotaFinalTabla;

      if (index === this.plazo) {
        let datosF = {
          numCuotas: 'TOTAL',
          capitalReducido: this.capitalReducido.toFixed(2),
          interes: totalInteres.toFixed(2),
          cuota: totalCuotas.toFixed(2),
          seguroDes: totalSeguroDesgra.toFixed(2),
          avpi: totalAvpi.toFixed(2),
          ahorro: totalAhorro.toFixed(2),
          abonoCap: totalAbonoCapi.toFixed(2),
          cuotaFinal: totalCuotasFinales.toFixed(2),

        }
        this.datosTabla.push(datosF);
      } else {
        let datos = {
          numCuotas: index + 1,
          capitalReducido: this.capitalReducido.toFixed(2),
          interes: this.interesTabla.toFixed(2),
          cuota: this.cuota.toFixed(2),
          seguroDes: this.seguroDesgraTabla.toFixed(2),
          avpi: this.avpi.toFixed(2),
          ahorro: this.ahorro.toFixed(2),
          abonoCap: this.abonoCapTabla.toFixed(2),
          cuotaFinal: this.cuotaFinalTabla.toFixed(2),

        }
        this.datosTabla.push(datos);
      }
      this.capitalReducido = this.capitalReducido - this.abonoCapTabla;
    }
    this.dataSource = this.datosTabla;
  }

  calculateMinMax(event) {
    if (Number(event.target.value) <= 0) {
      event.target.value = 0;
    }
    if (Number(event.target.value) >= 72) {
      event.target.value = 72;
    }
  }
  calculateMinCapital(event) {
    if (Number(event.target.value) <= 0) {
      event.target.value = 0;
    }

  }
}