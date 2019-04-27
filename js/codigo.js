// img.crossOrigin = 'Anonymous';
function preload() {
  bg = loadImage('img/background.png');
  perso_1 = loadImage('perso/background.png');
  polvo_1 = loadImage('polvo/background.png');
}

function setup(){
	createCanvas(240,160);
  frameRate(10);
  obj_Deus = new Deus(10);
  obj_Deus.carregarBG();
  // var teste = loadImage('img/background.png');
  // image(img, 0, 0);
}

function draw(){
  
  
		
}


class Deus {
	constructor(frame){
    this.framerate = frame;
    this.bg = bg;
  }
  
  carregarBG(){
     image(this.bg, 0, 0);
  }
  

}
