import { Config } from "../config";
import { Drawable } from "../model/Drawable";
import { Movable } from "../model/movable";
import { Selectable } from "../model/selectable";
import { context } from "../main";

export class Rectangle implements Drawable, Movable, Selectable {
    topLeftX: number;
    topLeftY: number;
    bottomRightX: number;
    bottomRightY: number;
    width: number;
    height: number;
    color: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
    ) {
        this.topLeftX = x;
        this.topLeftY = y;
        this.bottomRightX = x;
        this.bottomRightY = y;
        this.width = width;
        this.height = height;
        this.color = Config.DEFAULT_COLOR
    }

    draw(): void {
        context.beginPath();
        context.fillStyle = this.color;
        context.fillRect(this.topLeftX, this.topLeftY, this.bottomRightX - this.topLeftX, this.bottomRightY - this.topLeftY);
    }

    /**
     * Moves node relative to some change in x and y
     */
    move(deltaX: number, deltaY: number) {
        this.topLeftX += deltaX;
        this.topLeftY += deltaY;
    }
    
    /**
     * Moves node to an absolute x,y coordinate
     */
    moveAbsolute(x: number, y: number) {
        this.topLeftX = x;
        this.topLeftY = y;
    }

    select(): void { 

    }

    deselect(): void { 

    }

    clicked(): boolean {

    }

    /**
     * Updates width/height by dragging mouse (used on creation)
     */
    updateSize(canvasX: number, canvasY: number): void {
        this.bottomRightX = canvasX;
        this.bottomRightY = canvasY;
    }

    /**
     * Updates width by dragging left or right edge
     */
    updateWidth(canvasX: number) {

    }

    /**
     * Updates height by dragging top or bottom edge
     */
    updateHeight(canvasX: number) {

    }

}