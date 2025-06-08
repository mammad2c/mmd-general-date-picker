import type Component from "./component";
import type { ASTNode, TemplateResult } from "./engine";
import { visitNode } from "./visit-node";

/**
 * Convert a TemplateResult into an array of AST nodes.
 *
 * @param tpl The TemplateResult to parse.
 * @param ctx The context object that contains any components referenced in the
 *            template literal.
 *
 * @returns An array of AST nodes.
 *
 * @example
 * const result = html`<div>Hello, ${name}!</div>`;
 * createASTNodes(result); // [{ type: "text", value: "Hello, " }, { type: "text", value: name }, { type: "text", value: "!" }]
 */
export function createASTNodes<CTX extends Record<string, unknown>>(
  tpl: TemplateResult,
  ctx: CTX,
): ASTNode[] {
  /** 1. component map: explicit arg wins */
  const compsInput: Record<string, typeof Component> =
    (ctx?.components as Record<string, typeof Component>) ?? {};

  const comps: Record<string, typeof Component> = {};

  for (const k in compsInput) comps[k.toLowerCase()] = compsInput[k];

  /** 2. let the browser parse the raw HTML with markers */
  const host = document.createElement("template");
  host.innerHTML = tpl.raw.trim();

  /** 3. recursive walk */
  return Array.from(host.content.childNodes).reduce<ASTNode[]>((acc, child) => {
    const visitedNode = visitNode(child, {
      template: tpl,
      ctx,
      comps,
    });

    if (visitedNode) {
      acc.push(visitedNode);
    }

    return acc;
  }, []);
}
