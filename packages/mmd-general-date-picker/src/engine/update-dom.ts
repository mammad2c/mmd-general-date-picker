import type { ComponentInstance } from "./engine";
import { memory } from "./memory";

export function updateDOM(component: ComponentInstance) {
  const parsedComponent = memory.parsedComponents[component.id];

  if (!parsedComponent) return;

  const result = parsedComponent.component.render();

  const { element } = parsedComponent;

  if (element instanceof Element) {
    element.replaceWith(result);
    return;
  }
}
