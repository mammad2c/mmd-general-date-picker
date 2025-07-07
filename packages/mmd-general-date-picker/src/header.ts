import Component from "./engine/component";
import { html } from "./engine/html";

type HeaderProps = {
  title: string;
};

class TitleComponent extends Component<{ title: string }> {
  template() {
    return html`<h1>${this.props.title}</h1>`;
  }

  onUnmount() {
    console.log("TitleComponent is unmounted");
  }
}

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

  onUnmount() {
    console.log("HeaderComponent is unmounted");
  }

  get components() {
    return {
      TitleComponent,
    };
  }

  toggle() {
    this.state.show = !this.state.show;
  }

  template() {
    return html`
      <header class="mmd-header">
        <TitleComponent #if=${this.state.show} title=${this.props.title}></TitleComponent>
        <div>
          <button @click="toggle">Toggle</button>
        </div>

        <div #if=${this.state.show}>This is showing to me</div>
      </header>
    `;
  }
}
