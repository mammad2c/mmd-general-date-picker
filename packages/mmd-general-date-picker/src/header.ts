import Component from "./engine/component";
import { html } from "./engine/html";

type HeaderProps = {
  title: string;
};

type HeaderState = {
  mammad: string;
};

export default class Header extends Component<HeaderProps, HeaderState> {
  click() {
    // this.setState({
    //   mammad: "new mammad",
    // });
    this.state.mammad = "new mammad";
  }

  template() {
    return html`
      <header class="mmd-header">
        ${this.props.title} ${this.state.mammad}
        <button @click=${this.click}>Click Me</button>
      </header>
    `;
  }
}
