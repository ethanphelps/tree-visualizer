const DEFAULT_TEXT = '#242424';
const DEFAULT_BG = '#8b8989';
let subarrays = 0;

const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getElement = (index: number) => {
    return document.getElementById(JSON.stringify(index))!;
}

const markElement = async (
    index: number,
    textColor: string,
    backgroundColor: string,
    delayTime: number,
    label?: string
) => {
    if (index < 0) {
        return;
    }
    const element = getElement(index);
    element.style.color = textColor;
    element.style.backgroundColor = backgroundColor;
    if (label) {
        const lbl = document.createElement("div");
        lbl.className = "label";
        lbl.innerText = label;
        lbl.style.color = backgroundColor;
        element.appendChild(lbl);
    }
    await delay(delayTime);
}

const resetElement = (index: number) => {
    const element = getElement(index);
    element.style.color = DEFAULT_TEXT;
    element.style.backgroundColor = DEFAULT_BG;
    const prevText = element.childNodes[0].textContent!;
    console.log(`prev text: ${prevText}`);
    const selector = `#${index} .label`;
    console.log(`label: ${document.querySelector(selector)}`)
    element.innerText = prevText;
}

export const countSubarraysWithFixedBounds = async (nums: number[], minK: number, maxK: number) => {
    subarrays = 0;
    console.log(`nums: ${nums}, minK: ${minK}, maxK: ${maxK}`);
    let ans = 0;
    let left_bound = -1;
    let prev_min_k = -1;
    let prev_max_k = -1;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        await markElement(left_bound, 'white', 'red', 0, "left");
        await markElement(prev_min_k, DEFAULT_TEXT, 'yellow', 0, "minK");
        await markElement(prev_max_k, 'white', 'blue', 0, "maxK");
        await markElement(i, 'white', 'green', 500, "i");
        if (nums[i] < minK || nums[i] > maxK) {
            await markElement(left_bound, DEFAULT_TEXT, DEFAULT_BG, 0);
            left_bound = i;
        }
        if (nums[i] == minK) {
            prev_min_k = i;
        }
        if (nums[i] == maxK) {
            prev_max_k = i;
        }
        const validSubarrays = Math.min(prev_min_k, prev_max_k) - left_bound;
        if (validSubarrays > 0) {
            ans += validSubarrays;
            await showAllValidSubarrays(left_bound, Math.min(prev_min_k, prev_max_k), i, 'white', '#747bff');
        }
        resetElement(i);
    }
    return ans;
}

const incrementValidSubarrays = () => {
    subarrays += 1;
    document.getElementById("valid-subarrays")!.innerHTML = `Valid Subarrays: ${subarrays}`;
}


const highlightSubarray = async (l: number, r: number, textColor: string, backgroundColor: string) => {
    const nodes = document.getElementById("array")!.childNodes as NodeListOf<HTMLElement>;
    for (let i = l; i <= r; i++) {
        nodes[i].style.color = textColor;
        nodes[i].style.backgroundColor = backgroundColor;
    }
    await delay(1000);
    for (let i = l; i <= r; i++) {
        nodes[i].style.color = DEFAULT_TEXT;
        nodes[i].style.backgroundColor = DEFAULT_BG;
    }
}

const showAllValidSubarrays = async (
    leftBound: number,
    initialLeftEdge: number,
    rightEdge: number,
    textColor: string,
    backgroundColor: string
) => {
    const nodes = document.getElementById("array")!.childNodes as NodeListOf<HTMLElement>;
    for (let i = initialLeftEdge + 1; i <= rightEdge; i++) {
        nodes[i].style.color = textColor;
        nodes[i].style.backgroundColor = backgroundColor;
    }
    for (let i = initialLeftEdge; i > leftBound; i--) {
        incrementValidSubarrays();
        nodes[i].style.color = textColor;
        nodes[i].style.backgroundColor = backgroundColor;
        await delay(250);
    }
    await delay(500);
    for (let i = leftBound + 1; i <= rightEdge; i++) {
        nodes[i].style.color = DEFAULT_TEXT;
        nodes[i].style.backgroundColor = DEFAULT_BG;
    }
}

const constructArray = (nums: number[], callback: () => void) => {
    const array = document.createElement("div");
    array.id = "array";
    const app = document.querySelector<HTMLDivElement>("#app");
    app!.innerHTML = "";
    app!.appendChild(array);

    for (let i = 0; i < nums.length; i++) {
        let element = document.createElement("div");
        element.className = "element";
        element.id = JSON.stringify(i);
        let text = document.createElement("span")
        text.innerHTML = JSON.stringify(nums[i]);
        // element.innerText = JSON.stringify(nums[i]);
        element.appendChild(text);
        array!.appendChild(element);
    }

    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.textContent = "Run Example";
    playButton.addEventListener('click', callback);
    app!.appendChild(playButton);

    const validSubarrays = document.createElement("div");
    validSubarrays.id = "valid-subarrays";
    validSubarrays.innerHTML = `Valid Subarrays: 0`;
    app!.appendChild(validSubarrays);
}

type TestCase = [number[], number, number];

export const execute = () => {
    const testCases: TestCase[] = [
        // [[1,3,5,2,7,5], 1, 5],
        // [[1, 1, 1, 1], 1, 1],
        [[4,2,1,3,2,1,6,4,1,2,3,4,5,6,8,9,4,3], 1, 6],
        // [[4, 2, 1, 3, 2, 1, 6, 4, 1, 2, 3, 4, 5, 6, 8, 9, 4, 3], 3, 11],
    ];
    for (let [nums, minK, maxK] of testCases) {
        const callback = () => { countSubarraysWithFixedBounds(nums, minK, maxK); };
        constructArray(nums, callback);
    }
}

execute();