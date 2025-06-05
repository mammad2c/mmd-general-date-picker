import { assert } from "@/utils/assert";
import type { AstNode, Attrs, ComponentCtor, Events, TemplateResult } from "./engine";

function valueOf(values: unknown[], value: string) {
  const markerRE = /^__P(\d+)__$/;
  const m = markerRE.exec(value);
  return m ? values[+m[1]] : value;
}

/**
 * Recursive walk of a DOM Node, yielding an ASTNode for elements and
 * components, and null for text nodes and other non-element nodes.
 *
 * @param node The DOM Node to walk.
 * @param {ctx, comps} The context object and explicit component map.
 *
 * @returns An ASTNode (or null) representing the given node.
 *
 * @example
 * const ast = visitNode(myDiv, {
 *   ctx: { counter: 0 },
 *   comps: { Counter: class Counter extends Component { ... } },
 * });
 *
 * ast; // { type: "element", tag: "counter", ... }
 */
export function visitNode(
  node: Node,
  {
    template,
    ctx,
    comps,
  }: {
    template: TemplateResult;
    ctx: Record<string, unknown>;
    comps: Record<string, ComponentCtor>;
  },
): AstNode | null {
  const { values } = template;

  /* ── text node ─────────────────────────────────────────────────────── */
  if (node.nodeType === Node.TEXT_NODE) {
    let txt = node.textContent ?? "";

    /* Replace every __P<n>__ with its real value */
    txt = txt.replace(/__P(\d+)__/g, (_, i: string) => {
      const real = values[+i];
      return real == null ? "" : String(real);
    });

    return txt.trim() ? { type: "text", value: txt } : null;
  }

  /* ── element or component ─────────────────────────────────────────── */
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();
    const attrs: Attrs = {};
    const on: Events = {};
    const arrayAttrs = Array.from(el.attributes);

    /* 3-a. Registered component? */
    const Ctor = comps[tagName];
    if (Ctor) {
      const props: Record<string, unknown> = {};
      for (const { name, value } of arrayAttrs) {
        if (name.startsWith(":")) props[name.slice(1)] = valueOf(values, value);
        else if (!name.startsWith("@")) props[name] = valueOf(values, value);
      }
      return { type: "component", ctor: Ctor, props };
    }

    /* 3-b. Unknown tag?  ask the browser, NOT heuristics */
    const probe = document.createElement(tagName);

    assert(
      !(probe instanceof HTMLUnknownElement),
      `Unknown component <${el.tagName}>. ` + `Add it to this.components or pass it in parse().`,
    );

    for (const { name, value } of arrayAttrs) {
      const real = valueOf(values, value);

      if (name.startsWith("@")) {
        const ev = name.slice(1).toLowerCase();

        let fn: EventListener | undefined;

        if (typeof real === "function") {
          /* @click=${this.handle}  → already a function */
          fn = real.bind(ctx);
        } else if (typeof real === "string") {
          /* @click="handle"        → look up method on ctx */
          const maybe = ctx[real];
          if (typeof maybe === "function") {
            fn = maybe.bind(ctx);
          }
        }

        assert(typeof fn === "function", `Invalid handler for @${ev}: ${String(real)}`);

        on[ev] = fn;
        continue;
      }

      attrs[name] = String(real);
    }

    return {
      type: "element",
      tag: tagName as keyof HTMLElementTagNameMap,
      attrs: Object.keys(attrs).length ? attrs : undefined,
      on: Object.keys(on).length ? on : undefined,
      children: Array.from(el.childNodes).reduce((acc, child) => {
        const visitedNode = visitNode(child, { template, ctx, comps });

        if (visitedNode) {
          acc.push(visitedNode);
        }

        return acc;
      }, [] as AstNode[]),
    };
  }

  return null;
}
