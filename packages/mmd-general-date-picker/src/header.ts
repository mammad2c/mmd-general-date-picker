import Component from "./engine/component";
import { html } from "./engine/html";

type HeaderProps = {
  title: string;
};

export default class Header extends Component<
  HeaderProps,
  {
    show: boolean;
  }
> {
  constructor(props?: HeaderProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggle() {
    this.state.show = !this.state.show;
  }

  template() {
    return html`
      <header class="mmd-header">
        ${this.props.title}
        <div>
          <button @click="toggle">Toggle</button>
        </div>

        <div #if=${this.state.show}>This is showing to me</div>
      </header>
    `;
  }
}
