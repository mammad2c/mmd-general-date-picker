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
}

export interface ComponentNode {
  type: "component";
  ctor: typeof Component;
  props: Record<string, unknown>;
}

export type AstNode = TextNode | ElementNode | ComponentNode;
