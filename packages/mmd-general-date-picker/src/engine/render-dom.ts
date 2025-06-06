import type { ComponentInstance } from "./engine";
import eventBus from "./event-bus";
import { updateDOM } from "./update-dom";

export function renderDOM(instance: ComponentInstance, element: Element) {
  if (element.firstChild) {
    element.removeChild(element!.firstChild); // Clear previous content if any
  }

  element.appendChild(instance.render());

  eventBus.on("component-updated", updateDOM);
}
