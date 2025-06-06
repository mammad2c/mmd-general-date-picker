import Component from "./engine/component";
import { html } from "./engine/html";

type HeaderProps = {
  title: string;
};

export default class Header extends Component<HeaderProps> {
  template() {
    return html` <header class="mmd-header">${this.props.title}</header> `;
  }
}
