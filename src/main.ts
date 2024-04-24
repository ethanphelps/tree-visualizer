import { Render } from "./render";
import { Config } from "./config";
import { EditMode, EditModes } from "./modes";
import { StateMediator } from "./controls/state-mediator";
import { ButtonRow } from "./controls/button-row";


// TODO: figure out how to propagate state updates from this object into the render object when corresponding button is clicked
export const editModeState: Record<EditMode, boolean> = {
  [EditModes.CURSOR]: true,
  [EditModes.RECTANGLE]: false,
  [EditModes.CIRCLE]: false,
  [EditModes.LINE]: false,
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <canvas
        id="treeCanvas"
        class="canvas"
        width=${Config.CANVAS_SIZE}
        height=${Config.CANVAS_SIZE}
      ></canvas>
`

export const canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
export const context = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.style.background = "#242424"

const render = new Render();
const buttonRow = new ButtonRow();
const stateMediator = new StateMediator(render, buttonRow);

const buttonRowHtml = document.createElement("div");
buttonRowHtml.id = "buttonRow";
buttonRowHtml.innerHTML = buttonRow.renderButtons();
document.querySelector<HTMLDivElement>('#app')!.insertBefore(
  buttonRowHtml,
  document.getElementById("treeCanvas") 
);

// do below for each edit mode 
const cursorClick = (event: MouseEvent) => { };
const cursorButton = document.createElement("div");
cursorButton.innerHTML = `<button id="${EditModes.CURSOR}" onClick="cursorClick">Cursor</button>`;
document.getElementById("buttonRow")!.appendChild(cursorButton);