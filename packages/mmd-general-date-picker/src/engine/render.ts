import type { ASTNode, ComponentInstance } from "./engine";

type RenderResult = {
  el: Node | Element;
  id?: string | null;
  component?: ComponentInstance;
  children?: RenderResult[];
};

export function render(node: ASTNode, parentId?: string | null): RenderResult {
  /* text */
  if (node.type === "text") {
    const content = node.value;

    return {
      el: document.createTextNode(content),
    };
  }

  /* component */
  if (node.type === "component") {
    const inst = new node.ctor(node.props);
    inst.parentId = parentId;

    const { el, children } = inst.render();

    return {
      el,
      id: inst.id,
      component: inst,
      children,
    };
  }

  /* element */
  const frag = document.createDocumentFragment();
  const el = document.createElement(node.tag);
  if (node.attrs) for (const [k, v] of Object.entries(node.attrs)) el.setAttribute(k, v);
  if (node.on) for (const [e, fn] of Object.entries(node.on)) el.addEventListener(e, fn);
  const children = node.children.map((c) => {
    const renderedChild = render(c, node.id);
    frag.appendChild(renderedChild.el);
    return renderedChild;
  });
  el.appendChild(frag);
  // return el;
  return {
    el,
    id: node.id,
    children,
  };
}
