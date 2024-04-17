import { Config } from "./config";
import { Utils } from "./utils";

export type HighlightBounds = [number, number, number, number];

export class HighlightBox {
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
    color: string;
    context: CanvasRenderingContext2D;
    isDragging: boolean;

    constructor(
        x: number,
        y: number,
        mouseX: number,
        mouseY: number,
        color: string = "#FFFFFF",
    ) {
        this.x = x;
        this.y = y;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.color = color;
        this.isDragging = false;
        this.context = Utils.getContext();

        this.draw();
    }

    /**
     * Draws highlight box based on starting point and mouse cursor.
     * Box should be transparent...
     * Need to handle all four quadrants for mouse position relative to initial click position.
     */
    draw() {
        this.context.beginPath();
        this.context.fillStyle = Config.HIGHLIGHT_COLOR;
        this.context.fillRect(this.x, this.y, this.mouseX - this.x, this.mouseY - this.y);
        this.context.strokeStyle = Config.HIGHLIGHT_BORDER;
        this.context.strokeRect(this.x, this.y, this.mouseX - this.x, this.mouseY - this.y);
    }

    updateMouseCoordinates(mouseX: number, mouseY: number) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    /**
     * Return top left corner and bottom right corner based on current orientation.
     * TODO: Make these values accurate! Take into account which quadrant the mouse is in (see ipad drawing)
     */
    getBounds(): HighlightBounds  {
        return [this.x, this.y, this.mouseX - this.x, this.mouseY - this.y];
    }

}