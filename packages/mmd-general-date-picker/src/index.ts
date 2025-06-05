import Component from "./engine/component";
import eventBus from "./engine/event-bus";
import { html } from "./engine/html";
import HeaderComponent from "./header";
import { assert } from "@/utils/assert";

export interface MmdGeneralDatePickerProps {
  value?: Date | string | null;
}

class MmdGeneralDatePicker extends Component<MmdGeneralDatePickerProps> {
  constructor(props?: MmdGeneralDatePickerProps) {
    super(props);
  }

  get components() {
    return {
      HeaderComponent,
    };
  }

  click() {
    console.log("Date Picker clicked!");
  }

  template() {
    return html`<div class="mammad"><HeaderComponent title="Date Picker" /></div>`;
  }
}

function renderDOM(instance: MmdGeneralDatePicker, element: Element) {
  if (element.firstChild) {
    element.removeChild(element!.firstChild); // Clear previous content if any
  }

  element.appendChild(instance.render());

  return instance;
}

export function createMmdGeneralDatePicker(
  el: string | HTMLElement,
  props?: MmdGeneralDatePickerProps,
): MmdGeneralDatePicker {
  const element = typeof el === "string" ? document.querySelector(el) : el;

  assert(Boolean(element), "Element not found: " + el);

  const instance = new MmdGeneralDatePicker(props);

  renderDOM(instance, element!);

  eventBus.on("component-updated", () => {
    // console.log("component-updated", component);
    // renderDOM(instance, element);
  });

  return instance;
}
