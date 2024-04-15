import { Render } from "./render";

const SIZE = 500;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <canvas
        id="treeCanvas"
        class="canvas"
        width=${SIZE}
        height=${SIZE}
      ></canvas>
`

const canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
canvas.style.background = "#242424"

const render = new Render();