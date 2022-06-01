import { Component, OnInit } from '@angular/core';

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

  constructor() { }
  public keyUp = [];
  public buttons = [];

  ngOnInit(): void {
    this.erase = true;
    window.addEventListener("load", () => {
      // const eraser = document.getElementById("eraser") as HTMLButtonElement;
      const canvas = document.querySelector("#canvas") as HTMLCanvasElement;

      //console.log(this.canvas);
      const ctx = canvas.getContext("2d");
      console.log(ctx, " this is my ctx ")
      canvas.height = 384;
      canvas.width = 384;

      // var background = new Image();
      // background.src = "assets/img/abdomen.png";

      // // Make sure the image is loaded first otherwise nothing will draw.
      // background.onload = function () {
      //   ctx.drawImage(background, 0, 0);
      // }

      function startPosition(e) {
        this.painting = true;
      }

      function finishedPosition() {
        this.painting = false;
        ctx.beginPath();
      }

      function flip() {
        this.erase = !this.erase;
        // console.log(this.erase);
      }
      function update(e) {
        let Y = e.clientY - 180;
        let X = e.clientX - 141;
        
        ctx.arc(X, Y, 10, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(X, Y);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

      }
      function draw(e) {
        let Y = e.clientY - 180;
        let X = e.clientX - 141;

        if (!this.painting) {
          update(e);
          return;
        }
      
        if (!this.erase) {
          
          ctx.lineWidth = 20;
          ctx.lineCap = "round";
          ctx.strokeStyle = 'rgba(255,83,73,.25)';

          ctx.lineTo(X, Y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(X, Y);

        } else {
          ctx.clearRect(X - 15, Y - 15, 30, 30);
          return;
        }
      }

      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", finishedPosition);
      canvas.addEventListener("mousemove", draw);
      // canvas.addEventListener("mousemove", update);
      canvas.addEventListener("dblclick", flip);
    });
  }



  // flip(): void{
  //   this.erase = !this.erase;
  //   this.keyUp = [];
  //   this.buttons = [];
  //   this.buttons.push('save');
  // }
}
