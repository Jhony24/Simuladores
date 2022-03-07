import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
	selector: 'app-ahorro-futuro',
	templateUrl: './ahorro-futuro.component.html',
	styleUrls: ['./ahorro-futuro.component.scss']
})
export class AhorroFuturoComponent implements OnInit {

	constructor() { }

	type: any;
	rate: number;
	time: number;
	amount: number;
	deposit: number;
	bonus: number;
	valorNuevo:number;
	totalReceive: any;
	interesTotal: any;
	// Minimos
	timeMin: number;
	amountMin: number;
	depositMin: number;

	isEnabled: boolean;
	showTotal: boolean;

	/*typeAhorro = [
		{ type: 'Programado', rate: 4, time: 6, amount: 1, deposit: 1, bonus: 1 },
		{ type: 'Programado Infantil', rate: 4, time: 6, amount: 15, deposit: 10, bonus: 1 },
		{ type: 'Programado Escolar', rate: 5, time: 6, amount: 20, deposit: 10, bonus: 1.25 },
		{ type: 'Programado Navideño', rate: 5, time: 6, amount: 20, deposit: 10, bonus: 1.25 },
		{ type: 'Programado Ejecutivo', rate: 6, time: 12, amount: 50, deposit: 35, bonus: 1.50 },
		{ type: 'Programado Gold', rate: 7, time: 12, amount: 300, deposit: 50, bonus: 1.75 },
		{ type: 'Programado Futuro', rate: 7, time: 24, amount: 50, deposit: 20, bonus: 1.75 },
	];*/

	//Tasa 2022
	typeAhorro = [
		{ type: 'Programado', rate: 5, time: 6, amount: 1, deposit: 1, bonus: 1 },
		{ type: 'Programado Infantil', rate: 5, time: 6, amount: 15, deposit: 10, bonus: 1 },
		{ type: 'Programado Escolar', rate: 6, time: 6, amount: 20, deposit: 10, bonus: 1.25 },
		{ type: 'Programado Navideño', rate: 6, time: 6, amount: 20, deposit: 10, bonus: 1.25 },
		{ type: 'Programado Ejecutivo', rate: 7, time: 12, amount: 50, deposit: 35, bonus: 1.50 },
		{ type: 'Programado Gold', rate: 8, time: 12, amount: 300, deposit: 50, bonus: 1.75 },
		{ type: 'Programado Futuro', rate: 9, time: 24, amount: 50, deposit: 20, bonus: 1.75 },
	];

	ngOnInit(): void {
	}


	typeSelected() {
		const result = _.filter(this.typeAhorro, (o: any) => {
			return (o.type === this.type);
		});

		this.rate = result[0].rate;
		this.time = result[0].time;
		this.amount = result[0].amount;
		this.deposit = result[0].deposit;
		this.bonus = result[0].bonus;

		this.timeMin = result[0].time;
		this.amountMin = result[0].amount;
		this.depositMin = result[0].deposit;
	}

	calculateAmountMin(event) {
		if (Number(event.target.value) <= this.amountMin) {
			event.target.value = this.amountMin;
			this.amount = this.amountMin;
		}
	}

	calculateDepositMin(event) {
		if (Number(event.target.value) <= this.depositMin) {
			event.target.value = this.depositMin;
			this.deposit = this.depositMin;
		}
	}

	calculateTimeMin(event) {
		if (Number(event.target.value) <= this.timeMin) {
			event.target.value = this.timeMin;
			this.time = this.timeMin;
		}
	}

	cleanAP(){
		this.showTotal = false;
		this.type = '';
		this.amount = 0;
		this.deposit = 0;
		this.time = 0;
		this.unlockInputsAP();
	}

	lockInputsAP(){
		this.isEnabled = true;
	}

	unlockInputsAP(){
		this.isEnabled = false;
	}

	calculeAP() {
		let newSaldo = this.amount + this.deposit;
		let newInteres = 0;
		let interesTotal = 0;
		const newRate = this.rate / 100;
		const interes1 =  newSaldo * newRate / 360 * 30;

		newSaldo = newSaldo + interes1;

		interesTotal += interes1;
		for (let index = 0; index < this.time - 1; index++) {
			const saldoC = newSaldo   + this.deposit;
			this.valorNuevo=saldoC;
			newInteres = saldoC * newRate / 360 * 30 ;
			newSaldo = newSaldo + newInteres + this.deposit;
			interesTotal += newInteres;
		}

		this.showTotal = true;
		console.log(this.valorNuevo);
		var interesNuevo = ((this.deposit*this.time))+this.amount - this.valorNuevo;
		console.log(interesNuevo);
		this.totalReceive = this.valorNuevo.toFixed(2);
		this.interesTotal = (interesNuevo*-1).toFixed(2);
		this.lockInputsAP();
	}

}
