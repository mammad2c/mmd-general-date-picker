import Component from "./engine/component";
import { html } from "./engine/html";

export interface MmdGeneralDatePickerProps {
  value?: Date | string | null;
}

export default class MmdGeneralDatePicker extends Component<MmdGeneralDatePickerProps> {
  constructor(props?: MmdGeneralDatePickerProps) {
    super(props);
  }

  template() {
    return html`<div class="mmd-general-date-picker"></div>`;
  }
}
