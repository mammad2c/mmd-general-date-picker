import type { TemplateResult } from "./engine";

/**
 * Returns a TemplateResult from a template literal.
 *
 * @remarks
 *
 * This is a tagged template literal function that takes a string array and any
 * number of value arguments. It returns an object with a {@link typeof TemplateResult.raw}
 * property that contains the original string array with values interpolated at
 * their original positions. The values are stored in the {@link typeof TemplateResult.values}
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
  let rawOut = "";
  const valuesOut: unknown[] = [];

  strings.forEach((chunk, i) => {
    rawOut += chunk;

    if (i >= values.length) return; // last literal – done
    const v = values[i];

    /* ── 1. nested template?  splice it in ────────────────────────────── */
    if (v && typeof v === "object" && "raw" in v && "values" in v) {
      const nested = v as TemplateResult;

      // Re-index the nested markers so they continue after current ones
      const offset = valuesOut.length;
      const nestedRaw = nested.raw.replace(/__P(\d+)__/g, (_, n) => `__P${+n + offset}__`);

      rawOut += nestedRaw;
      valuesOut.push(...nested.values);
    } else {
      /* ── 2. ordinary placeholder ─────────────────────────────────────── */
      rawOut += `__P${valuesOut.length}__`;
      valuesOut.push(v);
    }
  });

  const templateResult = { raw: rawOut, values: valuesOut };

  return templateResult;
}
