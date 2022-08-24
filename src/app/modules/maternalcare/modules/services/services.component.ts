import { Component, OnInit } from '@angular/core';
// import { AnyNaptrRecord } from 'd/ns';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  focused: boolean;
  painting: boolean;
  erase: boolean;
  canvas: any;
  ctx: any;
  x: any
  y:any
  i = 0;
  canvasWidth: any;
  canvasHeight: any;
  canvasData: any;
  constructor() { }
   
  
  
  public keyUp = [];
  public buttons = [];
  public coords = [];
  public identity = [];
  public checker = [];
  ngOnInit(): void {

  }

  trackMouse(e){

  this.canvas = document.getElementById("myCanvas");
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ctx = this.canvas.getContext("2d");

  this.y = e.layerY;
  this.x = e.layerX;
  let test_identity = this.x + ',' + this.y + ''
  console.log(test_identity);
  
  let evicted_dot = -1;
  let r = 20;
  let ar =  Math.ceil((r/2)) //Radius size for both dot and search 
  this.identity = [];
  this.checker = [];
  for (let a = -ar; a <= ar; a++) {
    // identity.push((this.x + a) + ',' + (this.y + a));
    for (let b = -ar; b <= ar; b++) {
      this.identity.push((this.x + a) + ',' + (this.y  + b));
    }
  }
  // console.log(identity, ' identity');
  // let identity = this.x + ',' + this.y + '';
  for (let ide of this.identity) {
    this.checker.push(this.coords.map((el) => el.id).indexOf(ide));
  }
  let check_bool =  this.checker.every((check)=>{ return check == -1; });
  console.log(this.checker, ' checker', check_bool);
  for (let check of this.checker) {
      if(check != -1){
        evicted_dot = this.checker.indexOf(check);
      }
  }
  console.log(evicted_dot, this.identity[evicted_dot]);
  
  // this.coords.push({id: this.x + ',' + this.y, x: this.x, y: this.y});
  console.log(this.identity, ' identity');
  // let checker =  this.coords.map((el) => el.id).indexOf(identity);
  
  this.updateCanvas(this.identity[evicted_dot] + '', check_bool, this.x + ',' + this.y, this.x, this.y, r, this.ctx);
  // // this.ctx.fillRect(this.x -5,this.y -5,10,10);
  console.log(this.coords, " coords");
// 
}

point(x, y, r, canvas) {
    canvas.lineWidth = 2;
    canvas.fillStyle = "rgba(69, 1, 124, 0.3)";
    canvas.beginPath();
    canvas.arc(x, y, r, 0, 2 * Math.PI, true);
    canvas.stroke();
    canvas.fill();
  
}

updateCanvas(evicted_dot, check_bool, i, x, y, r, canvas) {
  // console.log(evicted_dot == 'undefined');
  
  if(check_bool == false && evicted_dot != 'undefined'){
    console.log("splicing");
    
    this.coords.splice(this.coords.map((el) => el.id).indexOf(evicted_dot),1);
  }else if(check_bool == true){
    console.log("pushing");
    
    this.coords.push({id: i , x: x, y: y})
  } 
  canvas.clearRect(0,0,600,400);
  for (let coord of this.coords) {
    
    this.point(coord.x, coord.y,r,canvas)
  }
}
}
