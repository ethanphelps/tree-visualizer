import { Node } from "./node";
import { Utils } from "./utils";

export class BinaryTree {
    context: CanvasRenderingContext2D;
    children: Node[];
    root: Node | undefined;

    constructor(nums: number[]) {
        this.context = Utils.getContext();
        this.children = [];
        this.buildFromArray(nums);
    }

    /**
     * Constructs Binary Tree from an array of numbers. Same format as leetcode's array based binary tree test cases.
     * Nums should be a level order traversal w/ null's representing empty spaces on a given level.
     */
    buildFromArray(nums: number[]) {
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
     * offset to left and right based on current level
     */
    prettify() {

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
}