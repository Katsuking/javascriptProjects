const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d"); // 描写の準備
const car = new Car(100, 100, 30, 50);

const animate = () => {
  car.update();

  canvas.height = window.innerHeight;
  car.draw(ctx);
  requestAnimationFrame(animate); // calll animate func again and again
};

animate();
