import type { AstNode, ComponentCtor, TemplateResult } from "./engine";
import { visitNode } from "./visit-node";

/**
 * Parse a TemplateResult into an array of AST nodes.
 *
 * @param tpl The TemplateResult to parse.
 * @param ctx The context object that contains any components referenced in the
 *            template literal.
 * @param components Optional explicit mapping of component names to
 *                   constructors. If not given, the `components` property of
 *                   `ctx` is used.
 *
 * @returns An array of AST nodes.
 *
 * @example
 * const result = html`<div>Hello, ${name}!</div>`;
 * parse(result); // [{ type: "text", value: "Hello, " }, { type: "text", value: name }, { type: "text", value: "!" }]
 */
export function createASTNodes<CTX extends Record<string, unknown>>(
  tpl: TemplateResult,
  ctx: CTX,
): AstNode[] {
  /** 1. component map: explicit arg wins */
  const compsInput: Record<string, ComponentCtor> =
    (ctx?.components as Record<string, ComponentCtor>) ?? {};

  const comps: Record<string, ComponentCtor> = {};

  for (const k in compsInput) comps[k.toLowerCase()] = compsInput[k];

  /** 2. let the browser parse the raw HTML with markers */
  const host = document.createElement("template");
  host.innerHTML = tpl.raw.trim();

  /** 3. recursive walk */
  return Array.from(host.content.childNodes).reduce((acc, child) => {
    const visitedNode = visitNode(child, {
      template: tpl,
      ctx,
      comps,
    });

    if (visitedNode) {
      acc.push(visitedNode);
    }

    return acc;
  }, [] as AstNode[]);
}
