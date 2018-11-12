import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NivelFacilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-nivel-facil',
  templateUrl: 'nivel-facil.html',
})
export class NivelFacilPage {

  map: any;
  showFail: boolean;
  showMap: boolean = true;
  showBotoes: boolean = true;
  showTitulo: boolean = true;
  fase_atual: number = 0;
  directionsService: any;
  nivel: number = 0;

  niveis = [
    {
      titulo_nivel: "Nível Fácil",
      fase: {
        titulos: ["O nosso ponto de partida é o edifício sede da Caixa.", "Isso mesmo, chegamos no Palácio da Alvorada, a próxima pista é:", "Parabéns!"],
        enigmas: ["Temos um enigma para decifrar: a pista para o tesouro encontra-se no lugar aonde mora o presidente.", "O tesouro encontra-se em um grande H.", "Você conseguiu encontrar o tesouro!"],
        botoes: [["Palácio do Planalto", "Palácio da Alvorada"], ["Congresso", "Torre de TV"], ["", ""]],
        respostaPorFase: [1, 0],
        coordenadas: [{ lat: -15.8026642, lng: -47.8836722 }, { lat: -15.7927998, lng: -47.8258987 }, { lat: -15.799805, lng: -47.864302 }]

      }
    },
    {
      titulo_nivel: "Nível Intermediário",
      fase: {
        titulos: ["O nosso ponto de partida é o edifício sede da Caixa.", 
                  "Isso mesmo, no Palácio do Planalto encontra-se o presidente da República, siga a próxima pista na trilha do tesouro:",
                  "Acertou! A torre de TV é um ótimo ponto de observação da Capital, veja a próxima pista:",
                  "Chegamos na UNB, universidade referência em diversos cursos internacionalmente. Só que o tesouro ainda não está aqui, veja a próxima pista:",
                  "É isso aí! A estátua foi recebida como presente na inauguração de Brasília. Agora sim, o tesouro encontra-se na próxima pista:",
                  "A elefante Nely foi o motivo da criação do Zoológico de Brasília. Parabéns!"],
        enigmas: ["Temos um enigma para decifrar: encontre o local de trabalho do chefe do executivo.", 
                  "Procure a próxima pista na quarta estrutura mais alta do Brasil.", 
                  "A próxima pista para o tesouro está na maior instituição de ensino superior do centro oeste.",
                  "Sua próxima pista está no local que possui uma réplica da estátua de Rômulo e Rêmulo, doada pelo governo da Itália.", 
                  "Local aonde ficou o presente recebido por Juscelino Kubitscheck do embaixador da Índia em 1957.", 
                  "Você conseguiu encontrar o tesouro!"],
        botoes: [["Palácio do Planalto", "Supremo Tribunal Federal"], 
                 ["Banco Central", "Torre de TV"], 
                 ["Instituto Federal de Educação", "Universidade de Brasília"], 
                 ["Palácio do Buriti", "Museu Nacional"],
                 ["Memorial JK", "Zoológico de Brasília"],
                 ["",""]
                 ],
        respostaPorFase: [0, 1, 1, 0, 1],
        coordenadas: [{ lat: -15.8026642, lng: -47.8836722 },
                      {lat:-15.799045, lng: -47.860911}, 
                      {lat: -15.790592, lng: -47.893112}, 
                      {lat: -15.763172, lng: -47.870392},
                      {lat: -15.784481, lng: -47.908223},
                      {lat: -15.844929, lng: -47.943432} ]

      }
    },
    {
      titulo_nivel: "Nível Avançado",
      fase: {
        titulos: ["O nosso ponto de partida é o edifício sede da Caixa.", 
                  "Você acertou, o busto de Niemyer é apenas uma das atrações da Praça dos Três Poderes, a próxima pista é:", 
                  "Isso mesmo, os restos mortais de JK encontram-se no seu memorial, a próxima pista para o tesouro diz:", 
                  "Isso mesmo, a medalha declarou a Ponte JK a mais bonita do mundo. Siga a próxima pista para encontrar o tesouro:", 
                  "Parabéns!"],
        enigmas: ["Temos um enigma para decifrar: a pista para o tesouro encontra-se no local aonde foi colocado a escultura de Oscar Niemeyer em comemoração ao ato da UNESCO que incluiu brasília como patrimônio histórico da humanidade.",
                  "Você deve ir aonde encontram-se os restos mortais do fundador da cidade.", 
                  "Fundada em 2002, obra do arquiteto Alexandre Chan, recebeu em 2003 a medalha Gustav Lindenthal, outorgada pela sociedade de Engenheiros do Estado da Pensilvânia.", 
                  "Local aonde foi composta a canção 'Exaltação a Brasília', samba de Bastos Tigre.", 
                  "Você conseguiu decifrar todos os enigmas e encontrar o tesouro!"],
        botoes: [["Espaço Oscar Niemeyer", "Praça dos Três Poderes"], 
                 ["Memorial JK", "Cemitério Campo da Esperança"], 
                 ["Museu da República", "Ponte JK"], 
                 ["Palácio da Alvorada","Museu do Catetinho"], ["x","y"]],
        respostaPorFase: [1, 0, 1, 1],
        coordenadas: [{ lat: -15.8026642, lng: -47.8836722 }, 
                      {lat:-15.800864, lng: -47.861282}, 
                      {lat: -15.784237, lng: -47.913419}, 
                      {lat: -15.823014, lng: -47.830069}, 
                      {lat:-15.947537, lng: -47.988262}]

      }
    }

  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nivel = navParams.get('nivel');
  }

  ionViewDidLoad() {
    this.showFail = false;
    this.showMap = true;
    //const matrizCaixa = new google.maps.LatLng(-15.8026642, -47.8836722, 21);
    const mapOptions = {
      zoom: 17,
      center: this.niveis[this.nivel].fase.coordenadas[this.fase_atual],
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({ position: this.niveis[this.nivel].fase.coordenadas[this.fase_atual], map: this.map, title: 'Ponto de partida.' })
  }

  opcaoDois() {
    if (this.niveis[this.nivel].fase.respostaPorFase[this.fase_atual] == 1) {
      this.acertou();
    } else {
      this.errou();
    }
  }

  opcaoUm() {
    if (this.niveis[this.nivel].fase.respostaPorFase[this.fase_atual] == 0) {
      this.acertou();
    } else {
      this.errou();
    }
  }

  acertou() {
    let origem = this.niveis[this.nivel].fase.coordenadas[this.fase_atual]
    this.fase_atual++;
    let destino = this.niveis[this.nivel].fase.coordenadas[this.fase_atual]
    this.realizaMovimento(origem, destino);
    if (this.fase_atual == this.niveis[this.nivel].fase.enigmas.length - 1) {
      this.sucesso();
    }
  }

  sucesso() {
    this.showBotoes = false;
  }

  errou() {
    this.showFail = true;
    this.showMap = false;
    this.showBotoes = false;
    this.showTitulo = false;
  }

  realizaMovimento(origin, destination) {
    this.directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    this.directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
      }
    });
  }

  get titulo() {
    return this.niveis[this.nivel].fase.titulos[this.fase_atual];
  }

  get enigma() {
    return this.niveis[this.nivel].fase.enigmas[this.fase_atual];
  }

  get textoPrimeiraOpcao() {
    return this.niveis[this.nivel].fase.botoes[this.fase_atual][0];
  }

  get textoSegundaOpcao() {
    return this.niveis[this.nivel].fase.botoes[this.fase_atual][1];
  }

  get tituloNivel(){
    return this.niveis[this.nivel].titulo_nivel;
  }

}