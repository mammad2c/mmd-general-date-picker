import { assert } from "@/utils/assert";
import type { MmdGeneralDatePickerProps } from "./mmd-general-date-picker";
import MmdGeneralDatePicker from "./mmd-general-date-picker";
import { renderDOM } from "./engine/render-dom";

export function createMmdGeneralDatePicker(
  el: string | HTMLElement,
  props?: MmdGeneralDatePickerProps,
): MmdGeneralDatePicker {
  const element = typeof el === "string" ? document.querySelector(el) : el;

  assert(Boolean(element), "Element not found: " + el);

  const instance = new MmdGeneralDatePicker(props);

  renderDOM(instance, element!);

  return instance;
}
