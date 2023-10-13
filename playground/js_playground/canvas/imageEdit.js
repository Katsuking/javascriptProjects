export function drawImageOnCanvas(img, canvas, ctx) {
  const maxSide = Math.max(img.width, img.height);
  const scale = 400 / maxSide;
  const canvasWidth = img.width * scale;
  const canvasHeight = img.height * scale;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, 0, canvasWidth, canvasHeight);
}
