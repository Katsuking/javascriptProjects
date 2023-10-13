import { Mover, Vector } from "natureofcode-canvas-ed";
import { drawImageOnCanvas } from "../imageEdit.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particle = new Mover(5, 100, 20, 200, [1, 1, 1], canvas);
const wind = new Vector(0.01, 0);
const gravity = new Vector(0, 1);

let particles = [];

function update() {
  // clear the canvas before we draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 5; i++) {
    particles.push(
      new Mover(1, 200, 20, 100 * i, [(155 * i) ^ 2, 155, 155 * i], canvas),
    );
  }

  particles.forEach((p) => {
    // p.applyForce(gravity)
    p.applyForce(wind);
    p.checkEdges();
    p.update();
    p.display();
  });

  for (let i = particles.length - 1; i > 0; i--) {
    if (particles[i].finished()) {
      // console.log("removed")
      particles.splice(i, 1);
    }
  }

  particle.applyForce(gravity);
  particle.applyForce(wind);
  particle.checkEdges();
  particle.update();
  particle.display(false);
  requestAnimationFrame(update);
}

update();

// image manipulation
const img = new Image();
img.onload = function () {
  // paint into canvas
  drawImageOnCanvas(img, canvas, ctx);
};

img.src = "./imgs/.1.jpg";
