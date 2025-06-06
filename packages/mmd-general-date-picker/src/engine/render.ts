import type { AstNode } from "./engine";

export function render(node: AstNode, parentId?: string | null): Element | Node {
  /* text */
  if (node.type === "text") return document.createTextNode(node.value);

  /* component */
  if (node.type === "component") {
    const inst = new node.ctor(node.props);
    inst.parentId = parentId;
    return inst.render();
  }

  /* element */
  const el = document.createElement(node.tag);
  if (node.attrs) for (const [k, v] of Object.entries(node.attrs)) el.setAttribute(k, v);
  if (node.on) for (const [e, fn] of Object.entries(node.on)) el.addEventListener(e, fn);
  node.children.forEach((c) => el.appendChild(render(c, node.id)));
  return el;
}
