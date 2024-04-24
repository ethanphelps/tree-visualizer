import { ObjectValues } from "./type-utils";

export const MouseMoveModes = {
    DRAG_MODE: "DRAG_MODE",
    HIGHLIGHT_MODE: "HIGHLIGHT_MODE",
    NONE: "NONE"
} as const;
export type MouseMoveMode = ObjectValues<typeof MouseMoveModes>;

export const EditModes = {
    CURSOR: "CURSOR",
    RECTANGLE: "RECTANGLE",
    CIRCLE: "CIRCLE",
    LINE: "LINE"
} as const;
export type EditMode = ObjectValues<typeof EditModes>;