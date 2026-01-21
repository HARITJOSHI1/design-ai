export enum TOOL_MODE_ENUM {
  SELECT = "SELECT",
  HAND = "HAND",
}

export type ToolMode = keyof typeof TOOL_MODE_ENUM;