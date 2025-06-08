import type { ASTNode, ComponentInstance, TemplateResult } from "./engine";
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
export function createASTNodes(tpl: TemplateResult, ctx: ComponentInstance): ASTNode[] {
  /** let the browser parse the raw HTML with markers */
  const host = document.createElement("template");
  host.innerHTML = tpl.raw.trim();

  /** recursive walk */
  return Array.from(host.content.childNodes).reduce<ASTNode[]>((acc, child) => {
    const visitedNode = visitNode(child, {
      template: tpl,
      ctx,
    });

    if (visitedNode) {
      acc.push(visitedNode);
    }

    return acc;
  }, []);
}
