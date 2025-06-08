import type { ComponentInstance } from "./engine";
import eventBus from "./event-bus";
import { memory } from "./memory";
import { updateDOM } from "./update-dom";

export function renderDOM(instance: ComponentInstance, element: Element) {
  if (element.firstChild) {
    element.removeChild(element!.firstChild); // Clear previous content if any
  }

  const result = instance.render();

  memory.VDOM = result;

  element.appendChild(result.el);

  eventBus.on("component-updated", updateDOM);
}
