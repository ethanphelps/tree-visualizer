import { Node } from "./node";
import { Utils } from "./utils";
import { BinaryTree } from "./binary-tree";
import { HighlightBox } from "./highlight-box";
import { MouseMoveMode, MouseMoveModes } from "./modes";

export class Render {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    // node: Node;
    // otherNode: Node;
    nodes: Node[];
    newNodeMode: boolean;
    mouseMoveMode: MouseMoveMode;
    highlightBox: HighlightBox | null;
    ctrl: boolean;
    tree: BinaryTree;

    constructor() {
        this.canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        // this.nodes = [new Node(100, 100, 1), new Node(150, 100, 2)];
        this.nodes = [];
        this.newNodeMode = false;
        this.mouseMoveMode = MouseMoveModes.NONE;
        this.ctrl = false;

        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        window.onkeydown = this.keyDown.bind(this);
        window.onkeyup = this.keyUp.bind(this);

        this.tree = new BinaryTree([1, 2, 3, 4, 5, 6, 7]);
        // this.tree = new BinaryTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

        this.highlightBox = null;

        this.loop(0);
    }

    loop(now: DOMHighResTimeStamp) {
        //clear the canvas every frame
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // loop over all nodes and update
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
            if (i > 0) {
                Utils.connect(this.nodes[i - 1], this.nodes[i]);
            }
        }

        this.tree.draw();
        if (this.highlightBox) {
            this.highlightBox.draw();
        }

        requestAnimationFrame(this.loop.bind(this));
    }

    mouseDown(event: MouseEvent) {
        event.preventDefault();
        const [canvasX, canvasY] = Utils.canvasCoordinates(event.clientX, event.clientY);
        if (this.backgroundClick(canvasX, canvasY)) {
            if (this.newNodeMode) {
                this.nodes.push(new Node(canvasX, canvasY, this.nodes.length + 1));
                return;
            }
            this.mouseMoveMode = MouseMoveModes.HIGHLIGHT_MODE;
            this.highlightBox = new HighlightBox(canvasX, canvasY, canvasX, canvasY);
        }
        for (const node of this.nodes) {
            if (node.clicked(canvasX, canvasY)) {
                node.isDragging = true;
                this.mouseMoveMode = MouseMoveModes.DRAG_MODE;
            }
        }
        for (const node of this.tree.children) {
            if (node.clicked(canvasX, canvasY)) {
                node.isDragging = true;
                this.mouseMoveMode = MouseMoveModes.DRAG_MODE;
            }
        }
    }

    mouseMove(event: MouseEvent) {
        event.preventDefault();
        if (this.mouseMoveMode == MouseMoveModes.NONE) {
            return;
        }
        const [canvasX, canvasY] = Utils.canvasCoordinates(event.clientX, event.clientY);
        switch(this.mouseMoveMode) {
            case MouseMoveModes.DRAG_MODE: {
                for (const node of this.nodes) {
                    if (node.isDragging) {
                        node.x = canvasX;
                        node.y = canvasY;
                    }
                }
                for (const node of this.tree.children) {
                    if (node.isDragging) {
                        node.x = canvasX;
                        node.y = canvasY;
                    }
                }
                break;
            }
            case MouseMoveModes.HIGHLIGHT_MODE: {
                if (!this.highlightBox) {
                    break;
                }
                this.highlightBox.updateMouseCoordinates(canvasX, canvasY);
                const bounds = this.highlightBox.getBounds();
                for (const node of this.nodes) {
                    if (node.highlighted(bounds)) {
                        node.select();
                    }
                }
                for (const node of this.tree.children) {
                    if (node.highlighted(bounds)) {
                        node.select();
                    }
                }
            }
        }
    }

    mouseUp(event: MouseEvent) {
        event.preventDefault();
        this.mouseMoveMode = MouseMoveModes.NONE;
        this.highlightBox = null;
        for (const node of this.nodes) {
            node.isDragging = false;
            node.deselect();
        }
        for (const node of this.tree.children) {
            node.isDragging = false;
            node.deselect();
        }
    }

    keyDown(event: KeyboardEvent) {
        event.preventDefault();
        console.log(event);
        if (event.key == "Meta") {
            this.newNodeMode = true;
        }
        else if (event.key == "Control") {
            this.ctrl = true;
        }
        else if (event.key == "p" && this.ctrl) {
            this.tree.prettify();
        }
    }

    keyUp(event: KeyboardEvent) {
        event.preventDefault();
        console.log(event);
        if (event.key == "Meta") {
            this.newNodeMode = false;
        }
        else if (event.key == "Control") {
            this.ctrl = false;
        }
    }

    backgroundClick(canvasX: number, canvasY: number): boolean {
        for (const node of this.nodes) {
            if (node.clicked(canvasX, canvasY)) {
                return false;
            }
        }
        for (const node of this.tree.children) {
            if (node.clicked(canvasX, canvasY)) {
                return false
            }
        }
        return true;
    }
}