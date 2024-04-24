import { Drawable } from "./model/Drawable";
import { Movable } from "./model/movable";
import { Selectable } from "./model/selectable";

type Highlightable = Drawable & Movable & Selectable;

export class HighlightGroup {
    objects: Set<Highlightable>;

    constructor() {
        this.objects = new Set();
    }

    clear() {
        for (let obj of this.objects) {
            this.remove(obj);
        }
    }
    
    add(object: Highlightable) {
        object.select();
        this.objects.add(object);
    }

    remove(object: Highlightable) {
        object.deselect();
        this.objects.delete(object);
    }

    contains(object: Highlightable) {
        return this.objects.has(object);
    }

    /**
     * TODO: need to move based on delta x/y... otherwise all objects will move onto the one being dragged
     */
    move(deltaX: number, deltaY: number) {
        for (let obj of this.objects) {
            obj.move(deltaX, deltaY);
        }
    }
}