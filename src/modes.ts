import { ObjectValues } from "./type-utils";

export const MouseMoveModes = {
    DRAG_MODE: "DRAG_MODE",
    HIGHLIGHT_MODE: "HIGHLIGHT_MODE",
    NONE: "NONE"
} as const;

export type MouseMoveMode = ObjectValues<typeof MouseMoveModes>;