import Component from "./engine/component";
import { html } from "./engine/html";
import Header from "./header";

export interface MmdGeneralDatePickerProps {
  value?: Date | string | null;
}

export default class MmdGeneralDatePicker extends Component<MmdGeneralDatePickerProps> {
  get components() {
    return {
      HeaderComponent: Header,
    };
  }
  constructor(props?: MmdGeneralDatePickerProps) {
    super(props);
  }

  template() {
    return html`<div class="mmd-general-date-picker">
      <HeaderComponent title="Date Picker is showing"></HeaderComponent>
    </div>`;
  }
}
