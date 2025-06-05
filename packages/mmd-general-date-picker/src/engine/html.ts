import type { TemplateResult } from "./engine";

/**
 * Returns a TemplateResult from a template literal.
 *
 * @remarks
 *
 * This is a tagged template literal function that takes a string array and any
 * number of value arguments. It returns an object with a {@link TemplateResult.raw}
 * property that contains the original string array with values interpolated at
 * their original positions. The values are stored in the {@link TemplateResult.values}
 * property.
 *
 * @example
 *
 * const result = html`<div>Hello, ${name}!</div>`;
 * result.raw // '<div>Hello, __P0__!</div>'
 * result.values // ['John']
 *
 * */
export function html(strings: TemplateStringsArray, ...values: unknown[]): TemplateResult {
  const valuesLength = values.length;

  const raw = strings.reduce(
    (out, part, i) => out + part + (i < valuesLength ? `__P${i}__` : ""),
    "",
  );

  return { raw, values };
}
