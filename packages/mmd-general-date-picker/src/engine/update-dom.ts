import type { ComponentInstance } from "./engine";
import { memory } from "./memory";

function destroyChildren(result: ReturnType<ComponentInstance["render"]> | undefined) {
  // recursive destroy
  result?.children?.forEach((child) => {
    destroyChildren(child);
  });

  if (result?.component) {
    result.component.onUnmount?.();
    delete memory.parsedComponents[result.component.id];
  }
}

function findInVDOM(id: string) {
  const found =
    memory.VDOM.id === id
      ? memory.VDOM
      : Array.isArray(memory.VDOM.children)
        ? memory.VDOM.children.find((c) => c.id === id)
        : undefined;

  if (found) {
    return found;
  }

  return null;
}

export function updateDOM(component: ComponentInstance) {
  const parsedComponent = memory.parsedComponents[component.id];

  if (!parsedComponent) return;

  const founded = findInVDOM(component.id);

  destroyChildren(founded);

  const result = parsedComponent.component.render();

  if (founded && founded.children) {
    founded.children = result.children;
  }

  const { element } = parsedComponent;

  if (element instanceof Element) {
    element.replaceWith(result.el);
  }
}
