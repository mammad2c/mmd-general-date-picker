🧩 DOM Engine

vanilla-JS component system that powers mmd-general-date-picker yet stays 100 % framework-agnostic.

Feature Syntax

- HTML-first templates ts `html`\``<div>Hello</div>`\`
- JS expressions & variables `html`\``<h1>${title}</h1>`\`
- Event binding `<button @click=${this.save}>Save</button>`
- Prop binding `<MyComp :value=${count}></MyComp>` or `<MyComp value=${count}></MyComp>`
- Nested templates `html`\``<div>${html`\``<h1>${title}</h1>` `</div>`\`
- Child components `<HeaderComponent :title="Hello"></HeaderComponent>`
- Tiny reactivity

No dependencies • No build step

⸻

🚀 Quick start

```TypeScript
import { Component, html, renderDOM } from "@/engine";
import HeaderComponent from "./HeaderComponent";

type ExampleProps = { title: string };

type ExampleState = { count: number };

class Example extends Component<ExampleProps, ExampleState> {
    // get is important because the components should be injected before the constructor
    get components = { HeaderComponent };

    constructor() {
        // It is important too, always call super() in the constructor
        super();

        this.state = { count: 0 };
    }

    inc(){
        // all of these three are equivalent

        this.state.count++;

        // or
        this.setState({
            count: this.state.count + 1
        })

        // or
        this.setState((prevState)=> ({
            count: prevState.count + 1
        }))
    }

    template() {
        return html`
            <div class="demo">
                <button @click=${this.inc}>Increment</button>
                <p>${this.state.count}</p>
                <p>${this.props.title}</p>
                <HeaderComponent :title=${`Clicked ${this.count}×`}></HeaderComponent>
            </div>`;
    }
}

renderDOM(new Example(), document.body);
```

---

Every components should have a `template()` method that returns a TemplateResult by calling the `html` function (It is a tagged function).

Learn more about tagged templates: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates

⸻

📦 File layout

File Responsibility
tiny-dom.ts html tag, parse(), render()
component.ts Base class (state, update swapping, etc.)

⸻

🏗️ Template syntax

```TypeScript
<div class="box" @click=${this.save}>
  Hello ${userName}
  <p :style=${inlineStyle}>Paragraph</p>
  <HeaderComponent :title="Dashboard"></HeaderComponent>
</div>
```

Construct Meaning

- `${…}` Inject any JS value. Primitives → text/attr, Nodes → spliced, TemplateResults → flattened.
- `@event=${handler}` addEventListener("event", handler.bind(this))
- `@event="methodName"` Looks up this.methodName and binds it.
- `:prop=${value}` Prop when tag is component; attribute when native.
  Un-prefixed attribute Normal HTML attribute. PascalCase tag Custom component (constructor resolved via components).
- Self-closing custom tags are not valid HTML. Always close them:
  <HeaderComponent …></HeaderComponent>

⸻

🧑‍💻 Authoring components

```TypeScript
import { Component, html } from "@/engine";

export default class HeaderComponent extends Component<{ title: string }> {
    template() {
        return html`<h1>${this.props.title}</h1>`;
    }
}
```

Lifecycle hooks

Hook When

- constructor() Set initial state, bind methods
- template() Return a TemplateResult
- render() Inherited: calls template → parse → render
- update() Swap DOM in place after state change
- onUnmounted() Remove DOM + drop refs

⸻

🔄 Reactivity model

- this.state.count++;

- this.setState({ count: this.state.count + 1 });

- this.setState((prevState) => ({ count: prevState.count + 1 }));

⸻

🗺 Roadmap:

- add onMounted // done
- add onUpdated // done
- add onUnmounted // done

Contributions welcome—feel free to open issues or PRs!

⸻

📝 License

MIT © Mohammad Toosi
