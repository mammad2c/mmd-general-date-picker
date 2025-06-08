import type { ComponentInstance } from "./engine";

type ParsedComponents = Record<
  string,
  | {
      id?: string | null;
      parentId?: string | null;
      element: Node;
      component: ComponentInstance;
      state: ComponentInstance["state"];
    }
  | undefined
>;

type VDOM = Record<string, unknown>;

type Memory = {
  parsedComponents: ParsedComponents;
  VDOM: VDOM;
};

export const memory: Memory = {
  parsedComponents: {},
  VDOM: {},
};
