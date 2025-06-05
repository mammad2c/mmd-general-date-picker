export type Attrs = Record<string, string>;

export type Events = Record<string, (e: Event) => void>;

export interface ComponentCtor {
  new (props?: Record<string, unknown>): { render(): Node };
}

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
  ctor: ComponentCtor;
  props: Record<string, unknown>;
}

export type AstNode = TextNode | ElementNode | ComponentNode;
