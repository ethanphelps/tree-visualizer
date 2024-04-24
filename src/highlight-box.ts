import { Config } from "./config";
import { context } from "./main";

export type HighlightBounds = [number, number, number, number];

export class HighlightBox {
    x: number;
    y: number;
    mouseX: number;
    mouseY: number;
    color: string;
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

        this.draw();
    }

    /**
     * Draws highlight box based on starting point and mouse cursor.
     * Box should be transparent...
     * Need to handle all four quadrants for mouse position relative to initial click position.
     */
    draw() {
        context.beginPath();
        context.fillStyle = Config.HIGHLIGHT_COLOR;
        context.fillRect(this.x, this.y, this.mouseX - this.x, this.mouseY - this.y);
        context.strokeStyle = Config.HIGHLIGHT_BORDER;
        context.strokeRect(this.x, this.y, this.mouseX - this.x, this.mouseY - this.y);
    }

    updateMouseCoordinates(mouseX: number, mouseY: number) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    /**
     * Return top left corner and bottom right corner based on current orientation.
     * Takes into account which quadrant the mouse is in (see ipad drawing)
     */
    getBounds(): HighlightBounds  {
        if (this.mouseX >= this.x) {
            if (this.mouseY >= this.y) {
                return [this.x, this.y, this.mouseX, this.mouseY];
            }
            return [this.x, this.mouseY, this.mouseX, this.y];
        } 
        else {
            if (this.mouseY >= this.y) {
                return [this.mouseX, this.y, this.x, this.mouseY];
            }
            return [this.mouseX, this.mouseY, this.x, this.y];
        }
    }

}