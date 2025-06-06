import type Component from "@/engine/component";
import { getQueriesForElement, prettyDOM, type PrettyDOMOptions } from "@testing-library/dom";
import { afterEach, beforeAll } from "vitest";
import userEvent from "@testing-library/user-event";
import { renderDOM } from "@/engine/render-dom";
import { memory } from "@/engine/memory";

function cleanup() {
  document.body.innerHTML = "";
  memory.parsedComponents = {};
  memory.memoryStates = {};
}

beforeAll(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

export function renderComponent<
  TProps = unknown,
  TState = unknown,
  TComponent extends Component<TProps, TState> = Component<TProps, TState>,
>(
  Ctor: new (props?: TProps, initialState?: TState) => TComponent,
  {
    container: customContainer,
    baseElement: customBaseElement,
  }: {
    container?: HTMLElement;
    baseElement?: HTMLElement;
  } = {},
) {
  const div = document.createElement("div");

  const baseElement = customBaseElement || customContainer || document.body;

  baseElement.classList.add("$base-element");

  const container = customContainer || baseElement.appendChild(div);

  container.classList.add("$container");

  baseElement.appendChild(container);

  // Render the component
  const instance = new Ctor();

  renderDOM(instance, container);

  const user = userEvent.setup();

  return {
    container,
    baseElement,
    user,
    debug: (el = baseElement, maxLength?: number, options?: PrettyDOMOptions) =>
      Array.isArray(el)
        ? el.forEach((e) => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    ...getQueriesForElement(baseElement),
  };
}
