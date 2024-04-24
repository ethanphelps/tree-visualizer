import { EditMode } from "../modes";
import { Render } from "../render";
import { ButtonRow } from "./button-row";

// can't pass in button row bc button row also imports state mediator
// get rid of this and find better way to manage 
export class StateMediator {
    renderer: Render;
    buttonRow: ButtonRow;

    constructor(
        render: Render,
        buttonRow: ButtonRow
    ) {
        this.renderer = render;
        this.buttonRow = buttonRow;
    }

    setEditorMode(mode: EditMode) {
        this.renderer.setEditorMode(mode);
    }
}