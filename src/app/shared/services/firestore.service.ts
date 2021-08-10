import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { log } from 'util';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { firestore } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  constructor(
    private firestore: AngularFirestore, private _http: HttpClient,
    private storage: AngularFireStorage
  ) { }



  public getAgencies() {
    return this.firestore.collection('agencias').snapshotChanges();
  }

  public getOfficers(id_agencia: string) {
    return this.firestore.collection('oficiales', ref => ref.where('id_agencia', '==', id_agencia)).snapshotChanges();
  }

  public getHoursOfficers(id_oficial: string, fecha: string) {
    const a = this.firestore.collection('citas', ref => ref.where('id_oficial', '==', id_oficial).where('fecha','==', fecha)).snapshotChanges();
    return a;
  }
  public createUser(data: any) {
    return this.firestore.collection('clientes').add(data);
  }

  public getClient(cedula: string) {
    return this.firestore.collection('clientes', ref => ref.where('cedula', '==', cedula)).snapshotChanges();
  }
  public verifiDate(fecha: string, idCliente: string) {
    // tslint:disable-next-line: max-line-length
    return this.firestore.collection('citas', ref => ref.where('id_cliente', '==', idCliente).where('fecha', '==', fecha)).snapshotChanges();
  }

  public verifyDateByOfficer(fecha: string, idCliente: string, idOficial: string) {
    // tslint:disable-next-line: max-line-length
    return this.firestore.collection('citas', ref => ref.where('id_cliente', '==', idCliente).where('fecha', '==', fecha).where('id_oficial', '==', idOficial)).snapshotChanges();
  }

  public createDate(data: any) {
    return this.firestore.collection('citas').add(data);
  }

  public setWarningUser(data: any, id: string) {
    return this.firestore.collection('clientes').doc(id).set(data);
  }

  public getLastPdf() {
    return this.firestore.collection('citasPDF', ref => ref.orderBy('numPdf', 'desc').limit(1)).snapshotChanges();
  }
  public plusNumPdf(data: any) {
    return this.firestore.collection('citasPDF').add(data);
  }

  public getAgencie(documentId: string) {
    return this.firestore.collection('agencias').doc(documentId).snapshotChanges();
  }

  public getOfficer(documentId) {
    return this.firestore.collection('oficiales').doc(documentId).snapshotChanges();
  }

  public sendEmail(body) {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    return this._http.post('https://us-central1-turnero-99b58.cloudfunctions.net/sendEmail', body, {'headers': headers});
    //return this._http.post('http://localhost:5001/turnero-99b58/us-central1/sendEmail', body, {'headers': headers});
   //return this._http.post('http://localhost:5001/turnero-99b58/us-central1/sendEmail', body);
  }


  public sendEmailToOfficer(body){
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    
    return this._http.post('https://us-central1-turnero-99b58.cloudfunctions.net/sendEmailToOfficer', body, {'headers': headers});
    //return this._http.post('http://localhost:5001/turnero-99b58/us-central1/sendEmailToOfficer', body, {'headers': headers});
  }



  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: any, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: any) {
    return this.storage.ref(nombreArchivo);
  }
}
