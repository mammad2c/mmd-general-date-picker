import type Component from "./component";

export type Attrs = Record<string, string>;

export type Events = Record<string, (e: Event) => void>;

export interface TemplateResult {
  raw: string; // HTML with markers like __P0__
  values: unknown[]; // real JS objects in order
}

export interface TextNode {
  type: "text";
  value: string;
}

export interface ElementNode {
  type: "element";
  tag: keyof HTMLElementTagNameMap;
  attrs?: Attrs;
  on?: Events;
  children: AstNode[];
  id?: string | null;
  parentId?: string | null;
}

export interface ComponentNode {
  type: "component";
  ctor: typeof Component;
  props: Record<string, unknown>;
}

export type ASTNode = TextNode | ElementNode | ComponentNode;

export type ComponentInstance = InstanceType<typeof Component<unknown, unknown>>;
