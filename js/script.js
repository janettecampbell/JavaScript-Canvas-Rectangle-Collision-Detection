"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// declare variables
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
const violetRectangleX = canvas.width / 2 - 50;
const violetRectangleY = canvas.height / 2 - 50;
let rectangle1;
let rectangle2;
// Implementation

const init = () => {
  // Orange Rectangle
  rectangle1 = new Rectangle(undefined, undefined, 100, 100, "#ff5630");

  // Violet Rectangle
  rectangle2 = new Rectangle(
    violetRectangleX,
    violetRectangleY,
    100,
    100,
    "#6554c0"
  );
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  init();
});

// Objects
class Rectangle {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  draw = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#36b37e";
    ctx.fillStyle = this.color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };

  update = () => {
    this.draw();
  };
}

// Animation Loop
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rectangle1.x = mouse.x;
  rectangle1.y = mouse.y;
  rectangle1.update();
  rectangle2.update();

  // Collision detection
  if (
    mouse.x + 100 >= violetRectangleX &&
    mouse.x <= violetRectangleX + 100 &&
    mouse.y + 100 >= violetRectangleY &&
    mouse.y <= violetRectangleY + 100
  ) {
    rectangle2.color = "#ff5630";
  } else {
    rectangle2.color = "#6554c0";
  }
};

init();
animate();
