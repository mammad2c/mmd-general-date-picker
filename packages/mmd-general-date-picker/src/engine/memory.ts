import type { ComponentInstance } from "./engine";

type ParsedComponents = Record<
  string,
  {
    id?: string | null;
    parentId?: string | null;
    element: Node;
    component: ComponentInstance;
  }
>;

type State = Record<string, unknown>;

type Memory = {
  parsedComponents: ParsedComponents;
  memoryStates: State;
};

export const memory: Memory = {
  parsedComponents: {},
  memoryStates: {} as State,
};
