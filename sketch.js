//--------------------SEJA BEM VINDO AO PONG!---------------------//
//Use as teclas "W" e "S" para o jogador da esquerda e "P" e "L" para o jogador da direita

//Jogo feito por: Miguel Andrade

const canvas_size = 500;
let p1_points = 0;
let p2_points = 0;
//----------------------------  A BOLA  ---------------------------//
class Ball{
  constructor(size){
    this.size = size;
    this.pos = {x: 250, y: 250};
    this.speed = {x: 4, y: 0};
    this.onCoverAreaP1 = false;
    this.onCoverAreaP2 = false;
  }
  
  
  run(area_p1 ,area_p2){

//DETECTAR ÁREA DE COLISÃO
    
    if(
      this.pos.y <= area_p1.begin && this.pos.y >= area_p1.end
      ){
       this.onCoverAreaP1 = true;
       }else{this.onCoverAreaP1 = false}
    
    if
      (
        this.pos.y <= area_p2.begin && this.pos.y >= area_p2.end
      ){
      this.onCoverAreaP2 = true;
      }else{this.onCoverAreaP2 = false}
    
    
//REBATER A BOLA NAS PAREDES (EM CIMA E EMBAIXO)
    if(this.pos.y <= 20 || this.pos.y >= canvas_size - 20)
    {
      this.speed.y *= (-1);
    }
    
    
//REBATER NOS JOGADORES
    if(
      this.pos.x <= 40 && this.onCoverAreaP1 ||
      this.pos.x >= canvas_size - 40 && this.onCoverAreaP2
      )
    {
      let newAngle = Math.floor(Math.random() * 3) + 1;
      if(this.speed.y > 0){this.speed.y = newAngle}
      else{this.speed.y = newAngle * (-1)}
      this.speed.x *= (-1);
    }
    
    if(this.pos.x > canvas_size + 50){
        this.pos.x = canvas_size/2;
        this.pos.y = canvas_size/2;
        p1_points += 1;
      }
    else if(this.pos.x < -50){
      this.pos.x = canvas_size/2;
      this.pos.y = canvas_size/2;
      p2_points += 1;
    }

    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
    
    noStroke();
    fill("red");
    circle(this.pos.x, this.pos.y, this.size);
  }
}

//-------------------------------------------------------------------//
//---------------------------  OS JOGADORES  ------------------------//

class Player{
  constructor(size, side,  speed, moveKeys){
    this.pos = canvas_size /2;
    this.size = size;
    this.speed = speed;
    this.keyLeft = moveKeys.keyLeft;
    this.keyRight = moveKeys.keyRight;
    this.coverArea = {
      begin: this.pos + this.size/2,
      end: this.pos - this.size/2
    };
    if(side == "left"){
      this.side = 20;
    }
    else if(side == "right"){
      this.side = canvas_size - 20;
    }
  }
  
  
  
  movement(){
    
    this.coverArea = {
      begin: this.pos + this.size/2,
      end: this.pos - this.size/2
    };

    if(keyIsDown(this.keyLeft) && this.pos >= 20 + this.size/2){
      this.pos -= this.speed;
    }
    else if(keyIsDown(this.keyRight) && this.pos <= canvas_size - 20 - this.size/2){
      this.pos += this.speed;
    }
    
    noStroke();
    fill("black");
    rectMode(CENTER);
    rect(this.side, this.pos, 10, this.size);
  }
}
//---------------------------------------------------------------------//
//---------------------  DECLARAÇÃO DOS OBJETOS  ----------------------//

let player_1 = new Player(100, "left", 5, {keyLeft: 87, keyRight: 83});

let player_2 = new Player(100, "right", 5, {keyLeft:80, keyRight: 76});

let ball_1 = new Ball(20);


function setup() {
  createCanvas(canvas_size, canvas_size);
}

function draw() {
  background(220);
  
  ball_1.run(player_1.coverArea, player_2.coverArea);
  
  player_1.movement();
  player_2.movement();

  text( p1_points + "||" + p2_points, 250, 30);
  textSize(20);
}