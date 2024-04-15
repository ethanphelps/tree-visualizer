import { Node } from "./node";
import { Utils } from "./utils";
import { BinaryTree } from "./binary-tree";

export class Render {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    // node: Node;
    // otherNode: Node;
    nodes: Node[];
    isDragging: boolean;
    newNodeMode: boolean;
    tree: BinaryTree;

    constructor() {
        this.canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        // this.context.beginPath();
        // this.context.fillStyle = "#FFFFFF";
        // // this.context.fillRect(100, 100, 50, 50);
        // this.context.ellipse(100, 100, 50, 50, 0, 0, 360);
        // this.context.fill();

        this.nodes = [new Node(100, 100, 1), new Node(150, 100, 2)];
        this.isDragging = false;
        this.newNodeMode = false;

        this.canvas.onmousedown = this.mouseDown.bind(this);
        this.canvas.onmousemove = this.mouseMove.bind(this);
        this.canvas.onmouseup = this.mouseUp.bind(this);
        window.onkeydown = this.keyDown.bind(this);
        window.onkeyup = this.keyUp.bind(this);

        this.tree = new BinaryTree([1, 2, 3, 4, 5, 6, 7]);

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

        requestAnimationFrame(this.loop.bind(this));
    }

    mouseDown(event: MouseEvent) {
        event.preventDefault();
        const [canvasX, canvasY] = Utils.canvasCoordinates(event.clientX, event.clientY);
        for (const node of this.nodes) {
            if (node.clicked(canvasX, canvasY)) {
                node.isDragging = true;
                this.isDragging = true;
            }
        }
        for (const node of this.tree.children) {
            if (node.clicked(canvasX, canvasY)) {
                node.isDragging = true;
                this.isDragging = true;
            }
        }
        if (this.newNodeMode) {
            this.nodes.push(new Node(canvasX, canvasY, this.nodes.length + 1));
        }
    }

    mouseMove(event: MouseEvent) {
        event.preventDefault();
        if (!this.isDragging) {
            return;
        }
        const [canvasX, canvasY] = Utils.canvasCoordinates(event.clientX, event.clientY);
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
    }

    mouseUp(event: MouseEvent) {
        event.preventDefault();
        for (const node of this.nodes) {
            node.isDragging = false;
            this.isDragging = false;
        }
        for (const node of this.tree.children) {
            node.isDragging = false;
            this.isDragging = false;
        }
    }

    keyDown(event: KeyboardEvent) {
        event.preventDefault();
        console.log(event);
        if (event.key == "Meta") {
            this.newNodeMode = true;
        }
    }

    keyUp(event: KeyboardEvent) {
        event.preventDefault();
        console.log(event);
        if (event.key == "Meta") {
            this.newNodeMode = false;
        }
    }
}