import { assert } from "@/utils/assert";
import type { html } from "./html";
import { createASTNodes } from "./create-ast-nodes";
import { render } from "./render";
import eventBus from "./event-bus";

type TProps = Record<string, unknown>;

type TState = Record<string, unknown> | (() => Record<string, unknown>);

function generateId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const states: Record<string, unknown> = {};

export default class Component<Props = TProps, State = TState> {
  [key: string]: unknown; // Allow dynamic properties

  private _hiddenState: State;

  props: Props;

  private id: string;

  get state() {
    return this._hiddenState;
  }

  set state(state: State) {
    this._hiddenState = state;
    this.update();
  }

  constructor(props?: Props, initialState?: State) {
    this.props = props ?? ({} as Props);

    const id = generateId();

    this.id = id;

    const memoryState = states[this.id];

    this._hiddenState =
      memoryState ??
      new Proxy(
        typeof initialState === "function" ? initialState() : initialState || ({} as State),
        {
          set: (target, prop, value) => {
            target[prop as keyof typeof target] = value;
            this.update();
            return true;
          },
        },
      );
  }

  setState(newState: Partial<State> | ((prevState: State) => Partial<State>)) {
    const updatedState = typeof newState === "function" ? newState(this.state) : newState;
    Object.assign(this.state as object, updatedState);
  }

  template(): ReturnType<typeof html> {
    // Template logic goes here
    assert(false, "Template method must be implemented in subclass");
  }

  render(): Node {
    const ast = createASTNodes(this.template(), this); // keeps real function reference

    const result = render(ast[0]);

    return result;
  }

  private update() {
    // Update logic goes here
    states[this.id] = this.state;
    eventBus.emit("component-updated", this);
  }

  destroy() {
    // Cleanup logic goes here
  }
}
