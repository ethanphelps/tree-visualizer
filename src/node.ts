import { Config } from "./config";
import { HighlightBounds } from "./highlight-box";
import { context } from "./main";
import { Drawable } from "./model/Drawable";

const RADIUS = 10;

// TODO: add hover feature to create new outgoing line on circumference
export class Node implements Drawable {
    x: number;
    y: number;
    radius: number;
    val: number;
    left: Node | undefined;
    right: Node | undefined;
    parent: Node | undefined
    color: string;
    isDragging: boolean;
    isSelected: boolean;

    constructor(
        x: number,
        y: number,
        val: number,
        left?: Node | undefined,
        right?: Node | undefined,
        parent?: Node | undefined,
        color: string = "#FFFFFF",
        radius: number = RADIUS
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.val = val;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.color = color;
        this.isDragging = false;
        this.isSelected = false;

        this.draw();
    }

    /**
     * Draws circle representing node and writes value on top of the node
     */
    draw() {
        context.beginPath();
        context.fillStyle = this.isSelected ? Config.NODE_HIGHLIGHT_COLOR : this.color;
        context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, 360);
        context.fill();

        context.beginPath();
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#1b4c20";
        context.fillText(JSON.stringify(this.val), this.x, this.y);
    }

    /**
     * Checks if node area was clicked using the x^2/a^2 + y^2/b^2 = 1 ellipse equation
     */
    clicked(mouseX: number, mouseY: number): boolean {
        const relativeX = mouseX - this.x;
        const relativeY = mouseY - this.y;
        const ellipseValue = ((relativeX ** 2) / (this.radius ** 2)) + ((relativeY ** 2) / (this.radius ** 2));
        // console.log(`Relative X: ${relativeX}, Relative Y: ${relativeY}`);
        // console.log(`click ellipse value: ${ellipseValue}`);
        return ellipseValue <= 1;
    }

    /**
     * Checks if current node resides within the highlight box's bounds
     * Need to consider all four quadrant orientations of the rectangle... convert based on the width and height
     * TODO: add more sophisticated highlight checking algorithm that highlights if any pixel of the rectangle covers the node's surface area
     */
    highlighted(bounds: HighlightBounds): boolean {
        const [upperX, upperY, lowerX, lowerY] = bounds;
        return upperX <= this.x && this.x <= lowerX && upperY <= this.y && this.y <= lowerY;
    }

    select() {
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }

    /**
     * Moves node relative to some change in x and y
     */
    move(deltaX: number, deltaY: number) {
        this.x += deltaX;
        this.y += deltaY;
    }
    
    /**
     * Moves node to an absolute x,y coordinate
     */
    moveAbsolute(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}