const draw = {}; // initilize a object

draw.path = (ctx, path, color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath(); // 開始地点
  ctx.moveTo(...path[0]); // pathの始点
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(...path[i]);
  }
  ctx.lineCap = "round"; // ストロークを丸く
  ctx.lineJoin = "round";
  ctx.stroke();
};

// multiple strokes
draw.paths = (ctx, paths, color = "black") => {
  for (const path of paths) {
    draw.path(ctx, path, color);
  }
};
