import { Node } from "./node";

export class Utils {

    static getContext(): CanvasRenderingContext2D {
        const canvas = document.getElementById("treeCanvas") as HTMLCanvasElement;
        return canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    /**
     * Draws a line between two nodes. Calculates point on circumference of each node to attach to based on trigonometry
     * and the coordinates of node1 and node2.
     * Need to normalize node1 and node2 so node1 is always the leftmost node.
     * This leaves two possibilities: node1 above node2 or node1 below node 2.
     * TODO: account for divide by zero scenarios
     *
     */
    static connect(node1: Node, node2: Node) {
        if (node2.x < node1.x) {
            let temp = node1;
            node1 = node2;
            node2 = temp;
        }

        const [a, b, c, d] = node1.y < node2.y
            ? this.downTo(node1, node2)
            : this.upTo(node1, node2);

        const context = this.getContext();
        context.beginPath();
        context.moveTo(a, b);
        context.lineTo(c, d);
        context.stroke();
    }

    /**
     * Calculates points on circumference of nodes for line between node 1 and node 2 when node 1 is above node 2:
     * A = y1 - y2, B = x2 - x1, C = sqrt(A^2 + B^2)
     * cos(alpha) = A / C
     * sin(alpha) = B / C
     * cos(theta) = B / C
     * sin(theta) = A / C
     *              (a', b') = (x1 + r1 * cos(alpha), y1 - r1 * sin(alpha))
     *              (c', d') = (x2 - r2 * cos(theta), y2 + r2 * sin(theta))
     */
    static downTo(node1: Node, node2: Node) {
        const A = node2.y - node1.y;
        const B = node2.x - node1.x;
        const C = Math.sqrt(A ** 2 + B ** 2);
        const cosineAlpha = A / C;
        const sineAlpha = B / C;
        const cosineTheta = B / C;
        const sineTheta = A / C;
        return [
            node1.x + node1.radius * sineAlpha,
            node1.y + node1.radius * cosineAlpha,
            node2.x - node2.radius * cosineTheta,
            node2.y - node2.radius * sineTheta
        ]
    }

    /**
     * Calculates points on circumference of nodes for line between node 1 and node 2 when node1 is below node 2:
     * A = y2 - y1, B = x2 - x1, C = sqrt(A^2 + B^2)
     */
    static upTo(node1: Node, node2: Node) {
        const A = node1.y - node2.y;
        const B = node2.x - node1.x;
        const C = Math.sqrt(A ** 2 + B ** 2);
        // const cosineAlpha = B / C;
        // const sineAlpha = A / C;
        // const cosineTheta = A / C;
        // const sineTheta = B / C;
        const cosineAlpha = A / C;
        const sineAlpha = B / C;
        const cosineTheta = B / C;
        const sineTheta = A / C;
        return [
            node1.x + node1.radius * cosineTheta,
            node1.y - node1.radius * sineTheta,
            node2.x - node2.radius * sineAlpha,
            node2.y + node2.radius * cosineAlpha
        ]
    }

    /**
     * Adjusts MouseDown click event coordinates based on relative position of canvas on the screen
     * TODO: make this work with zooming in/out
     */
    static canvasCoordinates(mouseX: number, mouseY: number) {
        const canvasRect = document.getElementById("treeCanvas")?.getBoundingClientRect() as DOMRect;
        return [mouseX - canvasRect.left + window.scrollX, mouseY - canvasRect.top + window.scrollY];
    }

}