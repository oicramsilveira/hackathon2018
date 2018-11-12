import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NivelFacilPage } from '../nivel-facil/nivel-facil';
import { NivelIntermediarioPage } from '../nivel-intermediario/nivel-intermediario';
import { NivelAvancadoPage } from '../nivel-avancado/nivel-avancado';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  nivelFacil() {
    this.navCtrl.push(NivelFacilPage, {nivel : 0})
  }

  nivelIntermediario(){
    this.navCtrl.push(NivelFacilPage, {nivel : 1})
  }

  nivelAvancado(){
    this.navCtrl.push(NivelFacilPage, {nivel : 2})
  }
}
