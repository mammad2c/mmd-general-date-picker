import { describe, expect, it, vi } from "vitest";
import Component from "./component";
import { html } from "./html";
import { renderComponent } from "@/tests/render-component";

describe("Engine", () => {
  describe("Render", () => {
    it("should render component correctly", () => {
      class TestComponent extends Component {
        template() {
          return html`<div>Hello, World!</div>`;
        }
      }

      const { getByText } = renderComponent(TestComponent);

      expect(getByText("Hello, World!")).toBeTruthy();
    });

    it("should render html children correctly", () => {
      class TestComponent extends Component {
        template() {
          return html`<div>
            <span>Child 1</span>
            <span
              >Child 2
              <span>Child 3</span>
            </span>
          </div>`;
        }
      }

      const { getByText, container } = renderComponent(TestComponent);

      expect(getByText("Child 1")).toBeTruthy();
      expect(getByText("Child 2")).toBeTruthy();
      expect(getByText("Child 3")).toBeTruthy();
      expect(container.querySelectorAll("span").length).toBe(3);
    });

    it("should render children components correctly", () => {
      class ChildComponent extends Component {
        template() {
          return html`<span>Child Component</span>`;
        }
      }

      class TestComponent extends Component {
        get components() {
          return {
            ChildComponent,
          };
        }
        template() {
          return html`<div>
            <ChildComponent></ChildComponent>
          </div>`;
        }
      }

      const { getByText } = renderComponent(TestComponent);

      expect(getByText("Child Component")).toBeTruthy();
    });
  });

  describe("Attributes", () => {
    it("should attach class to the element", () => {
      class TestComponent extends Component {
        template() {
          return html`<div class="test-component">Hello, World!</div>`;
        }
      }

      const { container } = renderComponent(TestComponent);

      expect(container?.querySelector(".test-component")).toBeTruthy();
    });
  });

  describe("Event Listeners", () => {
    it("should add event listeners with template string", async () => {
      const checkClick = vi.fn();

      class TestComponent extends Component {
        template() {
          return html`<button @click=${this.handleClick}>Click Me</button>`;
        }

        handleClick() {
          checkClick();
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      const button = getByText("Click Me");

      // Simulate click
      await user.click(button);

      // Check if the click handler was called
      expect(checkClick).toHaveBeenCalled();
    });

    it("should add event listeners with pure function name", async () => {
      const checkClick = vi.fn();

      class TestComponent extends Component {
        handleClick() {
          checkClick();
        }

        template() {
          return html`<button @click="handleClick">Click Me</button>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      const button = getByText("Click Me");

      // Simulate click
      await user.click(button);

      // Check if the click handler was called
      expect(checkClick).toHaveBeenCalled();
    });

    it("should add event listeners with arrow function", async () => {
      const checkClick = vi.fn();

      class TestComponent extends Component {
        handleClick = () => {
          checkClick();
        };

        template() {
          return html`<button @click=${this.handleClick}>Click Me</button>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      const button = getByText("Click Me");

      // Simulate click
      await user.click(button);

      // Check if the click handler was called
      expect(checkClick).toHaveBeenCalled();
    });

    it("should add event listeners with bind", async () => {
      const checkClick = vi.fn();

      class TestComponent extends Component {
        handleClick() {
          checkClick();
        }

        template() {
          return html`<button @click=${this.handleClick.bind(this)}>Click Me</button>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      const button = getByText("Click Me");

      // Simulate click
      await user.click(button); // Simulate click

      // Check if the click handler was called
      expect(checkClick).toHaveBeenCalled();
    });

    it("should add event listeners with inline function", async () => {
      const checkClick = vi.fn();

      class TestComponent extends Component {
        template() {
          return html`<button @click=${() => checkClick()}>Click Me</button>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      const button = getByText("Click Me");

      // Simulate click
      await user.click(button);

      // Check if the click handler was called
      expect(checkClick).toHaveBeenCalled();
    });
  });

  describe("State and Props", () => {
    it("should update the component by setState", async () => {
      type TestComponentState = {
        count: number;
      };
      class TestComponent extends Component<undefined, TestComponentState> {
        constructor() {
          super();
          this.state = { count: 0 };
        }

        template() {
          return html`<div class="test-component">
            Count: ${this.state.count}
            <button @click=${() => this.setState({ count: this.state.count + 1 })}>
              Increment
            </button>
          </div>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      expect(getByText("Count: 0")).toBeTruthy();

      const incrementBtn = getByText("Increment");

      await user.click(incrementBtn);

      expect(getByText("Count: 1")).toBeTruthy();
    });

    it("should update the component by setState with function", async () => {
      type TestComponentState = {
        count: number;
      };
      class TestComponent extends Component<undefined, TestComponentState> {
        constructor() {
          super();
          this.state = { count: 0 };
        }

        template() {
          return html`<div class="test-component">
            Count: ${this.state.count}
            <button @click=${() => this.setState((prevState) => ({ count: prevState.count + 1 }))}>
              Increment
            </button>
          </div>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      expect(getByText("Count: 0")).toBeTruthy();

      const incrementBtn = getByText("Increment");

      await user.click(incrementBtn);

      expect(getByText("Count: 1")).toBeTruthy();
    });

    it("should update the component by direct mutation of this.state", async () => {
      type TestComponentState = {
        count: number;
      };
      class TestComponent extends Component<undefined, TestComponentState> {
        constructor() {
          super();
          this.state = { count: 0 };
        }

        template() {
          return html`<div class="test-component">
            Count: ${this.state.count}
            <button @click=${() => (this.state.count += 1)}>Increment</button>
          </div>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      expect(getByText("Count: 0")).toBeTruthy();

      const incrementBtn = getByText("Increment");

      await user.click(incrementBtn);

      expect(getByText("Count: 1")).toBeTruthy();
    });

    it("should update component when a props is changed", async () => {
      type ChildComponentProps = {
        count: number;
      };

      class ChildComponent extends Component<ChildComponentProps> {
        template() {
          return html`<span>Count: ${this.props.count}</span>`;
        }
      }

      type TestComponentState = {
        count: number;
      };

      class TestComponent extends Component<undefined, TestComponentState> {
        get components() {
          return {
            ChildComponent,
          };
        }

        constructor() {
          super();
          this.state = { count: 0 };
        }

        template() {
          return html`<div class="test-component">
            <ChildComponent count=${this.state.count}></ChildComponent>
            <button @click=${() => (this.state.count += 1)}>Increment</button>
          </div>`;
        }
      }

      const { getByText, user } = renderComponent(TestComponent);

      expect(getByText("Count: 0")).toBeTruthy();

      const incrementBtn = getByText("Increment");

      await user.click(incrementBtn);

      expect(getByText("Count: 1")).toBeTruthy();
    });
  });
});
