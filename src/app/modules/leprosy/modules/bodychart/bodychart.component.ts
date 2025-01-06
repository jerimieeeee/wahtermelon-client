import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bodychart',
    templateUrl: './bodychart.component.html',
    styleUrls: ['./bodychart.component.scss'],
    standalone: false
})
export class BodychartComponent implements OnInit {
  focused: boolean;
  painting: boolean;
  erase: boolean;
  check_bool: boolean;
  canvas: any;
  ctx: any;
  x: any
  y:any
  i = 0;
  canvasWidth: any;
  canvasHeight: any;
  canvasData: any;
  try = '';
  r = 8;
  ar =  Math.ceil((this.r/2)) 

  input_test = '';
  canvas_bank = [];
  constructor() { }
  public keyUp = [];
  public buttons = [];
  public coords = [];
  public identity = [];
  public checker = [];
  ngOnInit(): void {
    this.check_bool = true;
    this.canvas_bank.push("myCanvas1");
    this.canvas_bank.push("myCanvas2");
    this.canvas_bank.push("myCanvas3");
  }
  tries() {
    console.log(this.try);
    
  }
  trackMouse(e, id: any){
    
  this.canvas = document.getElementById(id);

  if(!this.canvas_bank.includes(id)){
    this.canvas_bank.push(id);
  }
  this.canvasWidth = this.canvas.width;
  this.canvasHeight = this.canvas.height;
  this.ctx = this.canvas.getContext("2d");
    
  this.y = e.layerY;
  this.x = e.layerX;
  let test_identity = this.x + ',' + this.y + ''
  console.log(test_identity);
  
  let evicted_dot = -1;
  this.identity = [];
  this.checker = [];
  for (let a = -this.ar; a <= this.ar; a++) {
    // identity.push((this.x + a) + ',' + (this.y + a));
    for (let b = -this.ar; b <= this.ar; b++) {
      this.identity.push((this.x + a) + ',' + (this.y  + b) + '-' + id);
    }
  }
  // console.log(identity, ' identity');
  // let identity = this.x + ',' + this.y + '';
  for (let ide of this.identity) {
    // console.log("*******", this.coords.map((el) => el.id).indexOf(ide));
    
    this.checker.push(this.coords.map((el) => el.id).indexOf(ide));
  }
  this.check_bool =  this.checker.every((check)=>{ return check == -1; });
  console.log(this.checker, ' checker', this.check_bool);
  for (let check of this.checker) {
      if(check != -1){
        evicted_dot = this.checker.indexOf(check);
      }
  }
  console.log(evicted_dot, this.identity[evicted_dot], " MY EVICTED DOTS");
  
  // this.coords.push({id: this.x + ',' + this.y, x: this.x, y: this.y});
  console.log(this.identity, ' identity');
  // let checker =  this.coords.map((el) => el.id).indexOf(identity);

  this.updateCanvas(this.identity[evicted_dot] + '', this.check_bool, this.x + ',' + this.y + '-' + id, this.x, this.y, this.r, this.ctx);

  // // this.ctx.fillRect(this.x -5,this.y -5,10,10);
  console.log(this.coords, " coords");
  this.check_bool = true;
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
    
    this.coords.push({id: i , x: x, y: y, r: r, canvas: canvas})
  } 
  console.log(this.canvas_bank);
  
  for(let bank of this.canvas_bank){
    this.canvas = document.getElementById(bank);
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");   
    this.ctx.clearRect(0,0,1500,1500);
  }
  for (let coord of this.coords) {
    
    this.point(coord.x, coord.y, coord.r,coord.canvas)
  }
}
activeTrackMouse(e) {
  this.identity = [];
  this.checker = [];
  this.y = e.layerY;
  this.x = e.layerX;
  for (let a = -this.ar; a <= this.ar; a++) {
    // identity.push((this.x + a) + ',' + (this.y + a));
    for (let b = -this.ar; b <= this.ar; b++) {
      this.identity.push((this.x + a) + ',' + (this.y  + b));
    }
  }
  // console.log(identity, ' identity');
  // let identity = this.x + ',' + this.y + '';
  for (let ide of this.identity) {
    this.checker.push(this.coords.map((el) => el.id).indexOf(ide));
  }
  this.check_bool =  this.checker.every((check)=>{ return check == -1; });
  console.log(this.check_bool, this.checker);
  
}

}
