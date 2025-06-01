import { assert } from "./utils/assert";

export interface MmdGeneralDatePickerOptions {
  element: HTMLElement | string;
}

class MmdGeneralDatePicker {
  constructor({ element }: MmdGeneralDatePickerOptions) {
    assert(
      typeof element === "string" || element instanceof HTMLElement,
      "Element must be a string or an instance of HTMLElement"
    );
  }
}

export default MmdGeneralDatePicker;
