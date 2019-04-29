// img.crossOrigin = 'Anonymous';
function preload() {
  bg = loadImage('img/background.png');
  // bg_completo = loadImage('img/Bases/background.png');
  
  sprite_perso = loadAnimation('img/perso/base/perso_1.png', 'img/perso/base/perso_8.png');
  sprite_pego = loadAnimation('img/perso/pego/pego.png', 'img/perso/pego/pego_2.png');
  sprite_barco = loadAnimation('img/perso/barco/perso_barco_1.png', 'img/perso/barco/perso_barco_2.png');
  barco_parado = loadImage('img/perso/barco/perso_barco_3.png');
  sprite_perso_tes = loadAnimation('img/perso/base/tesouro/tesouro_1.png', 'img/perso/base/tesouro/tesouro_3.png');
  base_polvo = loadImage('img/polvo/base/polvo_base.png');
  base_polvo_com = loadImage('img/polvo/completo/polvo_completo.png');
  polvo_ten_1 = loadAnimation('img/polvo/tentaculoA/tentaculo_1.png', 'img/polvo/tentaculoA/tentaculo_3.png');
  polvo_ten_2 = loadAnimation('img/polvo/tentaculoB/tentaculo_1.png', 'img/polvo/tentaculoB/tentaculo_4.png');
  polvo_ten_3 = loadAnimation('img/polvo/tentaculoC/tentaculo_1.png', 'img/polvo/tentaculoC/tentaculo_4.png');
  polvo_ten_4 = loadAnimation('img/polvo/tentaculoD/tentaculo_1.png', 'img/polvo/tentaculoD/tentaculo_3.png');

}

function setup(){
	createCanvas(240,160);
  frameRate(12);
  obj_Deus = new Deus(12);
  alert("Pressione Seta Esquerda e Direita para jogar ");
}

function draw(){
  obj_Deus.engine();
}

function keyPressed() {
  if(keyCode == LEFT_ARROW && obj_Deus.iniciado){
    obj_Deus.botaoPressionado(-obj_Deus.variacaoSpr);
  }else if(keyCode == RIGHT_ARROW && obj_Deus.iniciado){
    obj_Deus.botaoPressionado(obj_Deus.variacaoSpr);
  }
  if(keyCode == RIGHT_ARROW && !obj_Deus.iniciado){
    obj_Deus.iniciado = true;
  }
  
}

class Deus {
	constructor(frame){
    this.iniciado = false;
    this.frames = frame;
    this.frameAtual = 1;
    this.frameContador = 1;
    this.framePegoFim = 1;
    this.pego = false;
    this.bg = bg;
    this.sprBarco = sprite_barco;
    this.sprPego = sprite_pego;
    this.personagem = new Personagem();
    this.octopus = new Octopus();
    this.pontuacao = 0;
    this.pontuacaoTemp = 0;
    this.variacaoSpr = 2;
    this.vidas = 3;
  }

  engine(){
    this.carregarBG();
    this.carregarBarquinho();
    this.contadorFrame();
    this.mostrarPontuacao();
    
    // this.contadorFrame();
    
    this.octopus.carregarBase();
    this.octopus.carregarTentaculos();
    if(this.iniciado){
      this.personagem.posicionarPersonagem();
      this.verificarDerrota();
    }
    if(this.pego){
      this.mostrarPego();
    }
  }

  iniciar(){
    this.iniciado = true;
  }
  
  carregarBG(){
    image(this.bg, 0, 0);
  }

  mostrarPontuacao(){
    textSize(20);
    text(this.pontuacao, 120, 20);
  }

  carregarBarquinho(){
    if(!this.iniciado){
      // image(this.sprBarco.getImageAt(0), 20, 4);
      animation(this.sprBarco, 35, 15);
    }
    if(this.vidas == 2){
      image(barco_parado, 50, 4);
    }
    if(this.vidas == 3){
      image(barco_parado, 53, 4);
      image(barco_parado, 70, 4);
    }
    
  }

  botaoPressionado(lado){
    this.personagem.posicionarPersonagem(lado);
  }

  contadorFrame(){
    this.frameAtual++;
    // console.log(this.frameContador);
    if(this.iniciado && (this.frameAtual == this.frames)){
      this.octopus.Alternacao();
    }
    if(this.iniciado && (this.frameAtual == this.frames) && this.personagem.posicaoAtual > 7){
      this.pontuacao++;
      this.pontuacaoTemp++;
      // console.log(this.pontuacao);
    }
    if(this.frameAtual > 11){
      this.frameAtual = 1;
    }
    
  }

  retornarBarquinho(){
    this.pontuacao = this.pontuacao + this.pontuacaoTemp;
    this.pontuacaoTemp = 0;
    this.resetarObjetos();
  }

  mostrarPego(){
    this.frameContador++;
    // console.log(this.frameContador);
    if(this.frameContador < this.framePegoFim){
      animation(this.sprPego, 143, 83);
    }else{
      this.framePegoFim = 0;
      this.frameContador = 0;
      this.pego = false;
    }
    
  }

  verificarDerrota(){
    const posicao = this.personagem.posicaoAtual;
    const inicio1 =  this.octopus.inicio1;
    const inicio2 =  this.octopus.inicio2;
    const inicio3 =  this.octopus.inicio3;
    const inicio4 =  this.octopus.inicio4;

    if((posicao == 0 || posicao == 1) && inicio1 == 3){
      this.retirarVida();
      return true;
    }
    if((posicao == 4 || posicao == 5) && inicio2 == 4){
      this.retirarVida();
      return true;
    }
    if((posicao == 6 || posicao == 7) && inicio3 == 4){
      this.retirarVida();
      return true;
    }
    if(posicao > 7 && inicio4 == 3){
      this.retirarVida();
      return true;
    }

    // console.log(posicao, inicio4);
  }

  retirarVida(){
    this.vidas--;
    this.pego = true;
    this.frameContador = this.frameAtual;
    this.framePegoFim = this.frameAtual + 3 * this.frames;
    // console.log(this.framePegoFim);

    if(this.vidas > 0){
      this.resetarObjetos();
      // console.log(this.vidas);
    }else{
      
      alert("Game Over!! Sua pontuação total foi de: " + this.pontuacao + " pontos");
      // console.log(this.pontuacao);
      this.resetarObjetos();
      location.reload();

    }
  }
  
  resetarObjetos(){
    this.iniciado = false;
    this.personagem = new Personagem();
    this.octopus = new Octopus();
  }
  

}

class Personagem {
	constructor(){
    this.sprite = sprite_perso;
    // this.referenciaDeus = obj_Deus;
    this.animaTesouro = sprite_perso_tes;
    this.posicoes = [
                    createVector(12,38),
                    createVector(14,38),
                    createVector(13,90),
                    createVector(16,90),
                    createVector(72,112),
                    createVector(72,112),
                    createVector(113,113),
                    createVector(113,113),
                    ];
    this.posicaoAtual = 0;
  }


  
  carregarSprite(){
    let sprite_n = this.posicaoAtual;
    let x_img = this.posicoes[sprite_n].x;
    let y_img = this.posicoes[sprite_n].y;

    image(this.sprite.getImageAt(sprite_n), x_img, y_img);
  }

  posicionarPersonagem(lado = 0){
    if(this.posicaoAtual > 7 && lado < 0){
      this.posicaoAtual = 7;
    }
    else if(this.posicaoAtual > 0 && lado < 0){
      this.posicaoAtual = this.posicaoAtual + lado;
    }
    else if(this.posicaoAtual < 8 && lado > 0){
      this.posicaoAtual = this.posicaoAtual + lado;
    }
    if(this.posicaoAtual < 0){
      this.posicaoAtual = 0;
      this.voltarBarquinho();
    }

    if(this.posicaoAtual > 7){
      this.animacaoTesouro();
    }else{
      this.carregarSprite();
    }
    
  }

  voltarBarquinho(){
    obj_Deus.retornarBarquinho();
  }

  animacaoTesouro(){
    animation(this.animaTesouro, 175 , 135);
  }
  // teste(){
  //   // alert('asdasd');
  // }
  

}

class Octopus {
	constructor(){
    this.pego = sprite_pego;
    this.base = base_polvo;
    this.sprTentaculo1 = polvo_ten_1;
    this.sprTentaculo2 = polvo_ten_2;
    this.sprTentaculo3 = polvo_ten_3;
    this.sprTentaculo4 = polvo_ten_4;
    this.inicio1 = int(random(1, 2));
    this.inicio2 = int(random(1, 5));
    this.inicio3 = int(random(1, 5));
    this.inicio4 = int(random(1, 4));
    this.variacao1 = 1;
    this.variacao2 = 1;
    this.variacao3 = 1;
    this.variacao4 = 1;
    this.tentaculo1 = [
                    createVector(82,52),
                    createVector(67,53),
                    createVector(48,47),
                  ];
    this.tentaculo2 = [
                    createVector(110,64),
                    createVector(109,78),
                    createVector(100,87),
                    createVector(101,106)
                  ];
    this.tentaculo3 = [
                    createVector(143,83),
                    createVector(143,91),
                    createVector(145,99),
                    createVector(149,109)
                  ];
    this.tentaculo4 = [
                    createVector(177,90),
                    createVector(177,100),
                    createVector(179,111)
                  ];
  }
  
  carregarBase(){
    image(this.base, 46, 34);
  }

  Alternacao(){
    this.variacao1 = int(random([-1, 1]));
    this.variacao2 = int(random([-1, 1]));
    this.variacao3 = int(random([-1, 1]));
    this.variacao4 = int(random([-1, 1]));
    // console.log(this.variacao1, this.variacao2, this.variacao3, this.variacao4);
    
    if((this.inicio1 > 2 && this.variacao1 > 0) || (this.inicio1 < 1 && this.variacao1 < 0)){
      this.variacao1 = -this.variacao1;
    }
    if((this.inicio2 > 3 && this.variacao2 > 0) || (this.inicio2 < 1 && this.variacao2 < 0)){
      this.variacao2 = -this.variacao2;
    }
    if((this.inicio3 > 3 && this.variacao3 > 0) || (this.inicio3 < 1 && this.variacao3 < 0)){
      this.variacao3 = -this.variacao3;
    }
    if((this.inicio4 > 2 && this.variacao4 > 0) || (this.inicio4 < 1 && this.variacao4 < 0)){
      this.variacao4 = -this.variacao4;
    }

    this.inicio1 = this.inicio1 + this.variacao1;
    this.inicio2 = this.inicio2 + this.variacao2;
    this.inicio3 = this.inicio3 + this.variacao3;
    this.inicio4 = this.inicio4 + this.variacao4;
    // console.log(this.inicio1,this.inicio2,this.inicio3,this.inicio4);

    
  }

  carregarTentaculos(){
    for (let index = 0; index < this.inicio1; index++) {
      const element = this.tentaculo1[index];
      image(this.sprTentaculo1.getImageAt(index), element.x, element.y);
      
    }
    for (let index = 0; index < this.inicio2; index++) {
      const element = this.tentaculo2[index];
      image(this.sprTentaculo2.getImageAt(index), element.x, element.y);

    }
    for (let index = 0; index < this.inicio3; index++) {
      const element = this.tentaculo3[index];
      image(this.sprTentaculo3.getImageAt(index), element.x, element.y);

    }
    for (let index = 0; index < this.inicio4; index++) {
      const element = this.tentaculo4[index];
      image(this.sprTentaculo4.getImageAt(index), element.x, element.y);

    }

  }


}


