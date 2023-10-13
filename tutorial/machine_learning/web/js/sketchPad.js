class sketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
			background-color:white;
			box-shadow: 0px 0px 10px 2px black;
		`;
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.paths = [];
    // to detect mouse actions
    this.#addEventListners(); // # private method: you can't use this outside of class
  }

  // Define private method
  // creating canvas to draw
  #addEventListners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) { // clickしているときのみ
        const mouse = this.#getMouse(evt);

        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
        // console.log(this.paths.length);
      }

      this.canvas.onmouseup = () => {
        this.isDrawing = false;
      };
    };
  }

  #redraw = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths); // defined in draw.js
  };

  // private method extracted from addEventListners
  // get mouse position in canvas
  #getMouse = (evt) => {
    const rect = this.canvas.getBoundingClientRect(); // return the info of cursor position.
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  };
}
