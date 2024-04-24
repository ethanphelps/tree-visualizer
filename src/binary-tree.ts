import { Node } from "./node";
import { Utils } from "./utils";
import { Config } from "./config";
import { Drawable } from "./model/Drawable";
import { Movable } from "./model/movable";

export class BinaryTree implements Drawable, Movable {
    children: Node[];
    root: Node | undefined;

    constructor(
        nums: number[], 
        initialX: number = Config.CANVAS_SIZE / 2, 
        initialY: number = Config.CANVAS_SIZE / 2
    ) {
        this.children = [];
        this.buildFromArray(nums, initialX, initialY);
        this.prettify();
    }

    /**
     * Constructs Binary Tree from an array of numbers. Same format as leetcode's array based binary tree test cases.
     * Nums should be a level order traversal w/ null's representing empty spaces on a given level.
     */
    buildFromArray(nums: number[], initialX: number, initialY: number) {
        if (nums.length == 0) {
            return;
        }
        let nodes = nums.map((num: number | null, i: number) => {
            return num == 0 || num ? new Node(i * 30 + 10, 0, nums[i]) : undefined;
        });
        this.root = nodes[0];
        let i = 0;
        let level = 0;
        while (i < nums.length) {
            if (!nodes[i]) {
                i += 1;
                continue;
            }
            let left = 2*i + 1;
            let right = 2*i + 2;
            if (left < nums.length) {
                nodes[i]!.left = nodes[left];
            }
            if (right < nums.length) {
                nodes[i]!.right = nodes[right];
            }
            level = Math.floor(Math.log2(i + 1));
            nodes[i]!.y = level * 30 + 10;
            this.children?.push(nodes[i]!);
            console.log(`i: ${i}, level: ${level}`);
            i += 1;
        }
    }

    /**
     * Prettifies binary tree based on preset degree ratios.
     * Do a level order traversal and orient on x axis based on distance from center. Or assign each node's children a certain
     * offset to left and right based on current level. Use the position of the root to determine the starting point for the
     * orientation.
     * Divide the available space into sections of size
     * Press Ctrl + p to invoke this function...
     * TODO: figure out how to get the spacing mutation to actually work...
     * TODO: use a real queue for the level order traversal instead of makeshift queue
     */
    prettify() {
        if (!this.root) {
            console.warn(`Trying to prettify an empty binary tree!`);
            return;
        }
        let i = 0;
        let level = 0;
        const queue: (Node | undefined)[] = [];
        queue.push(this.root);
        while (queue.length > 0) {
            const levelSize = queue.length;
            const rowSpacing = Config.BINARY_TREE_WIDTH / (levelSize + 1);
            for (let j = 0; j < levelSize; j++) {
                let node = queue.shift();
                if (!node) {
                    continue;
                }
                console.log(`level: ${level}\tnode: ${node!.val}\trow spacing: ${rowSpacing}`);
                node.y = level * Config.BINARY_TREE_ROW_HEIGHT + this.root.y;
                node.x = ((j + 1) * rowSpacing);
                queue.push(node.left);
                queue.push(node.right);
                i++;
            }
            level++;
            console.log(`queue.length: ${queue.length}`);
            console.log(`i: ${i}`);
        }
        console.log("while loop complete!");
    }

    /**
     * Updates links between nodes if nodes of the tree have been altered. Draw all nodes!
     */
    draw() {
        for (let node of this.children) {
            node.draw();
            if (node.left) {
                Utils.connect(node, node.left);
            }
            if (node.right) {
                Utils.connect(node, node.right);
            }
        }
    }

    /**
     * TODO: implement to move all nodes + lines
     */
    move(x: number, y: number) {

    }
}