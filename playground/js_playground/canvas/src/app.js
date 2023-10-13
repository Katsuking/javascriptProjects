document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!canvas.getContext) {
    console.log("canvas is not loaded");
  }

  // 試しに緑色にcanvasを設定する
  ctx.fillStyle = "green";
  ctx.fillRect(
    canvas.clientWidth / 2 - 100,
    canvas.clientHeight / 2 - 100,
    200,
    200,
  );
});
