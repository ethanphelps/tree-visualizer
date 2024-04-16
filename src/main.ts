import { Render } from "./render";
import { Config } from "./config";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <canvas
        id="treeCanvas"
        class="canvas"
        width=${Config.CANVAS_SIZE}
        height=${Config.CANVAS_SIZE}
      ></canvas>
`

const canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
canvas.style.background = "#242424"

const render = new Render();