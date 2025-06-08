import { assert } from "@/utils/assert";
import type { html } from "./html";
import { createASTNodes } from "./create-ast-nodes";
import { render } from "./render";
import eventBus from "./event-bus";
import { memory } from "./memory";

type TProps = Record<string, unknown>;

type TState = Record<string, unknown> | (() => Record<string, unknown>);

function generateId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default class Component<Props = TProps, State = TState> {
  [key: string]: unknown; // Allow dynamic properties

  private _hiddenState = {} as State;

  private isMounted = false;

  props: Props;

  id: string;

  get state() {
    return this._hiddenState as State;
  }

  set state(state: State) {
    const newState = new Proxy(state as object, {
      set: (target, prop, value) => {
        if (typeof prop === "string") {
          (target as Record<string, unknown>)[prop] = value;
          this.update();
          return true;
        }

        return false;
      },
    }) as State;

    this._hiddenState = newState;
    this.update();
  }

  constructor(props?: Props, initialState?: State) {
    this.props = props ?? ({} as Props);

    const id = generateId();

    this.id = id;

    const memoryState = memory.memoryStates[this.id] as State;

    this.state =
      memoryState ??
      (typeof initialState === "function"
        ? (initialState as () => State)()
        : initialState || ({} as State));
  }

  setState(newState: Partial<State> | ((prevState: State) => Partial<State>)) {
    const updatedState = typeof newState === "function" ? newState(this.state as State) : newState;
    this.state = { ...(this.state as object), ...updatedState } as State;
  }

  template(): ReturnType<typeof html> {
    // Template logic goes here
    assert(false, "Template method must be implemented in subclass");
  }

  render(): Element | Node {
    const ast = createASTNodes(this.template(), this)[0]; // keeps real function reference

    const result = render(ast);

    memory.parsedComponents[this.id] = {
      id: "id" in ast ? ast.id : undefined,
      parentId: "parentId" in ast ? ast.parentId : undefined,
      element: result,
      component: this,
    };

    if (!this.isMounted) {
      this.isMounted = true;
    }

    return result;
  }

  private update() {
    // Update logic goes here
    memory.memoryStates[this.id] = this.state;

    if (!this.isMounted) {
      return;
    }

    eventBus.emit("component-updated", this);
  }

  destroy() {
    // Cleanup logic goes here
  }
}
