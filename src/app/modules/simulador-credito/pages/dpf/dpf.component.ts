import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dpf',
  templateUrl: './dpf.component.html',
  styleUrls: ['./dpf.component.scss'],
})
export class DpfComponent implements OnInit {
  tabActive = 1;
  amountSelectType: number;
  amount: number;
  min: number;
  frequencyEnd: any;
  rate: any;
  rate2: any;
  rateE: any;
  months: any;
  frequeSelected: any;
  bandRate: boolean;
  interWon: any;
  irf: any;
  totalReceive: any;
  selectAhorroBand: any;
  showMensual: boolean;
  showVencimiento: boolean;
  isEnabled: boolean;
  enabledButton: boolean;
  ratea: any;
  rateb: any;

  createDPF: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}
  frecuency = [{ name: 'Mensual' }, { name: 'Vencimiento' }];

  rateEnd = [{ name: 'Nominal' }, { name: 'Efectiva' }];

  /* Anterior 
    datos = [
      {dias: '0 - 30', rate_a: '4.50', rate_b: '4.50', pos: 0},
      {dias: '31 - 60', rate_a: '4.55', rate_b: '4.75', pos: 1},
      {dias: '61 - 90', rate_a: '5.08', rate_b: '5.30', pos: 2},
      {dias: '91 - 180', rate_a: '5.65', rate_b: '6.00', pos: 3},
      {dias: '181 - 270', rate_a: '6.55', rate_b: '7.00', pos: 4},
      {dias: '271 - 360', rate_a: '7.15', rate_b: '7.70', pos: 5}
    ];
  */

  /* Junio 03 2021
  datos = [
    {dias: '0 - 30', rate_a: '4.50', rate_b: '4.50', pos: 0},
    {dias: '45 - 60', rate_a: '4.55', rate_b: '4.75', pos: 1},
    {dias: '61 - 90', rate_a: '5.08', rate_b: '5.30', pos: 2},
    {dias: '91 - 180', rate_a: '5.65', rate_b: '6.00', pos: 3},
    {dias: '181 - 270', rate_a: '6.55', rate_b: '7.00', pos: 4},
    {dias: '271 - 360', rate_a: '7.15', rate_b: '7.70', pos: 5}
  ]; */

  //nuevos
  //rate a - pago mensual - nominal
  //rate b - pago vencimiento - efectiva
  datos = [
    { dias: '0 - 30', rate_a: '4.07', rate_b: '4.00', pos: 0 },
    { dias: '45 - 60', rate_a: '4.15', rate_b: '4.25', pos: 1 },
    { dias: '61 - 90', rate_a: '4.90', rate_b: '5.00', pos: 2 },
    { dias: '91 - 120', rate_a: '5.35', rate_b: '5.50', pos: 3 },
    { dias: '121 - 180', rate_a: '5.80', rate_b: '6.00', pos: 4 },
    { dias: '181 - 270', rate_a: '6.75', rate_b: '7.00', pos: 5 },
    { dias: '271 - 360', rate_a: '7.45', rate_b: '7.70', pos: 6 },
  ];

  typeAhorro = [
    { type: 'Socio', amount: 30 },
    { type: 'Cliente', amount: 1 },
    { type: 'Convenio', amount: 100 },
    { type: 'Plus', amount: 10 },
    { type: 'Encaje', amount: 100 },
    { type: 'Programado', amount: 1 },
    { type: 'Programado Infantil - Juvenil', amount: 15 },
    { type: 'Programado Escolar', amount: 20 },
    { type: 'Programado Navideño', amount: 20 },
    { type: 'Programado Ejecutivo', amount: 50 },
    { type: 'Programado Gold', amount: 300 },
    { type: 'Programado Futuro', amount: 50 },
    { type: 'Programado Jubilación', amount: 50 },
    { type: 'Credi - Ahorro', amount: 50 },
    { type: 'Tradicional', amount: 50 },
  ];

  ngOnInit(): void {
    this.unlockInputs();
    this.selectAhorroBand = 0;
    this.amount = 100;
    this.months = 30;
    this.frequencyEnd = 'Mensual';
    this.frequeSelected = 'Mensual';
    this.rate = 4.55;
    this.rate2 = 4.75;
    this.bandRate = true;
    this.rateE = 'Nominal';

    this.createDPF = this.formBuilder.group({
      typeAhorroForm: [''],
      amountForm: ['', Validators.required],
      frecuencyForm: [''],
      rateForm: [''],

      //nationality: new FormControl('')
    });
  }

  lockInputs() {
    this.isEnabled = true;
  }

  unlockInputs() {
    this.isEnabled = false;
  }

  cleanDPF() {
    this.unlockInputs();
    this.selectAhorroBand = 0;
    this.amount = 100;
    this.months = 30;
    this.frequencyEnd = 'Mensual';
    this.frequeSelected = 'Mensual';
    /* 
    this.ratea = 4.50;
    this.rateb = 4.50;
    */
    this.ratea = 4.5;
    this.rateb = 4.5;
    this.bandRate = true;
    this.rateE = 'Nominal';
    this.totalReceive = 0.0;
    this.showMensual = false;
    this.showVencimiento = false;
  }

  changeTab(value: number) {
    this.tabActive = value;
  }

  amountSelected() {
    this.amount = Number(this.amountSelectType);
  }
  calculateMin(event) {
    if (Number(event.target.value) <= 100) {
      event.target.value = 100;
      this.amount = 100;
    }
  }
  calculateMinDias(event) {
    if (Number(event.target.value) <= 30) {
      event.target.value = 30;
      //  this.amount = Number(this.amountSelectType);
    }
  }

  frequeSelect() {
    if (this.frequeSelected === 'Mensual') {
      this.bandRate = true;
      this.rateE = 'Nominal';
      this.rate = 4.55;
    } else if (this.frequeSelected === 'Vencimiento') {
      this.bandRate = false;
      this.rateE = 'Efectiva';
      this.rate = 4.75;
    }
    this.months = 30;
  }

  rateSelect() {
    if (this.rateE === 'Nominal') {
      this.rate = 4.55;
    }
    if (this.rateE === 'Efectiva') {
      this.rate = 4.75;
    }
    this.months = 30;
  }

  newCalculeDPF() {
    let min, max;
    if (this.months <= 360) {
      const x = _.filter(this.datos, (o: any) => {
        min = o.dias.split('-')[0];
        max = o.dias.split('-')[1];
        return (
          this.months >= parseInt(min, 10) && this.months <= parseInt(max, 10)
        );
      });
      this.ratea = x[0].rate_a;
      this.rateb = x[0].rate_b;
    } else if (this.months > 360) {
      this.ratea = 8.7;
      this.rateb = 9.0;
    }

    //Aqui hago el calculo
    this.irf = 0;
    if (this.frequeSelected === 'Mensual') {
      this.interWon =
        Number(this.amount) * (this.ratea / 100) * (this.months / 360);
    } else if (this.frequeSelected === 'Vencimiento') {
      this.interWon =
        Number(this.amount) * (this.rateb / 100) * (this.months / 360);
    }
    //Multiplica al interes ganado el 2% para obtener el irf
    if (this.months <= 364) {
      this.irf = this.interWon * 0.02;
    }
    this.totalReceive = (this.amount + this.interWon - this.irf).toFixed(2);

    if (this.frequeSelected === 'Mensual') {
      this.showVencimiento = false;
      this.showMensual = true;
    } else if (this.frequeSelected === 'Vencimiento') {
      this.showMensual = false;
      this.showVencimiento = true;
    }
    this.ratea = this.ratea.toFixed(2);
    this.rateb = this.rateb.toFixed(2);
    this.lockInputs();
  }

  selectAhorro(selectAhorro: any) {
    this.selectAhorroBand = selectAhorro;
  }
  /* */
  onSubmit() {}

  get f() {
    return this.createDPF.controls;
  }
}
