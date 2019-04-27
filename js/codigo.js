// img.crossOrigin = 'Anonymous';
function preload() {
  bg = loadImage('img/background.png');
  // bg_completo = loadImage('img/Bases/background.png');
  sprite_perso = loadAnimation('img/perso/base/perso_1.png', 'img/perso/base/perso_8.png');
  sprite_barco = loadAnimation('img/perso/barco/perso_barco_1.png', 'img/perso/barco/perso_barco_3.png');
  sprite_perso_tes = loadAnimation('img/perso/base/tesouro/tesouro_1.png', 'img/perso/base/tesouro/tesouro_3.png');
  base_polvo = loadImage('img/polvo/base/polvo_base.png');
  base_polvo_com = loadImage('img/polvo/completo/polvo_completo.png');
  polvo_ten_1 = loadAnimation('img/polvo/tentaculo_1/tentaculo_1.png', 'img/polvo/tentaculo_1/tentaculo_3.png');
  polvo_ten_2 = loadAnimation('img/polvo/tentaculo_2/tentaculo_1.png', 'img/polvo/tentaculo_2/tentaculo_3.png');
  polvo_ten_3 = loadAnimation('img/polvo/tentaculo_3/tentaculo_1.png', 'img/polvo/tentaculo_3/tentaculo_4.png');
  polvo_ten_4 = loadAnimation('img/polvo/tentaculo_4/tentaculo_1.png', 'img/polvo/tentaculo_4/tentaculo_3.png');

}

function setup(){
	createCanvas(240,160);
  frameRate(12);
  obj_Deus = new Deus(12);
  
}

function draw(){
  
  obj_Deus.carregarBG();
  obj_Deus.personagem.posicionarPersonagem();
  // obj_Deus.personagem.carregarSprite(0, 120, 80);
		
}

function keyPressed() {
  if(keyCode == LEFT_ARROW){
    obj_Deus.botaoPressionado(-obj_Deus.variacaoSpr);
  }else if(keyCode == RIGHT_ARROW){
    obj_Deus.botaoPressionado(obj_Deus.variacaoSpr);
  }
  
}


class Deus {
	constructor(frame){
    this.frames = frame;
    this.bg = bg;
    this.personagem = new Personagem();
    this.pontuacao = 0;
    this.variacaoSpr = 2;
  }
  
  carregarBG(){
    image(this.bg, 0, 0);
  }

  botaoPressionado(lado){
    this.personagem.posicionarPersonagem(lado);
  }
  

}

class Personagem {
	constructor(){
    this.sprite = sprite_perso;
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
      // console.log(this.posicaoAtual);
    }
    else if(this.posicaoAtual > 0 && lado < 0){
      this.posicaoAtual = this.posicaoAtual + lado;
    }
    else if(this.posicaoAtual < 8 && lado > 0){
      this.posicaoAtual = this.posicaoAtual + lado;
    }
    if(this.posicaoAtual < 0){
      this.posicaoAtual = 0;
    }
    

    if(this.posicaoAtual > 7){
      this.animacaoTesouro();
    }else{
      this.carregarSprite();
    }
    
    
  }

  animacaoTesouro(){
    animation(this.animaTesouro, 175 , 135);

    if(this.animaTesouro.getFrame() == this.animaTesouro.getLastFrame()){
      let pontuacao = 3/obj_Deus.frames;
      obj_Deus.pontuacao = obj_Deus.pontuacao + pontuacao;
      console.log(obj_Deus.pontuacao);
      
    }
  }
  // teste(){
  //   // alert('asdasd');
  // }
  

}


