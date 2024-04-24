import { EditMode, EditModes } from "../modes";
import { StateMediator } from "./state-mediator";

export class ButtonRow {
    clickHandlers: Record<EditMode, (event: MouseEvent) => void>;
    stateMediator: StateMediator;

    constructor() {
        this.clickHandlers = {
            [EditModes.CIRCLE]: () => {},
            [EditModes.RECTANGLE]: () => {},
            [EditModes.LINE]: () => {},
            [EditModes.CURSOR]: () => {},
        }
        for (const mode of Object.values(EditModes)) {
            this.clickHandlers[mode] = ((event: MouseEvent) => {
                this.stateMediator.setEditorMode(mode);
            }).bind(this);
            console.log(`${mode} click handler!`);
        }
    }

    /**
     * TODO: make this assign correct click function to each button based on the mode
     */
    renderButtons () {
        let divs = "";
        for (const mode of Object.values(EditModes)) {
            divs += `<button id="${mode}" onClick="${this.clickHandlers[mode]}">${mode}</button>`;
        }
        return divs;
    }
}