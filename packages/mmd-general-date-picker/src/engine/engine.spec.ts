import { afterEach, describe, expect, it, vi } from "vitest";
import Component from "./component";
import { html } from "./html";
import { getByText, queryByText } from "@testing-library/dom";

function generateContainer() {
  const container = document.createElement("div");
  container.className = "test-wrapper";
  document.body.appendChild(container);
  return container;
}

describe("Engine", () => {
  afterEach(() => {
    if (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("should render component correctly", () => {
    class TestComponent extends Component {
      template() {
        return html`<div>Hello, World!</div>`;
      }
    }

    const instance = new TestComponent();

    const container = generateContainer();

    container.appendChild(instance.render());

    expect(getByText(container, "Hello, World!")).toBeTruthy();
  });

  it("should attach class to the element", () => {
    class TestComponent extends Component {
      template() {
        return html`<div class="test-component">Hello, World!</div>`;
      }
    }

    const instance = new TestComponent();

    const container = generateContainer();

    container.appendChild(instance.render());

    const element = container.querySelector(".test-component");
    expect(element).toBeTruthy();
    expect(element?.classList.contains("test-component")).toBe(true);
  });

  it("should add event listeners", () => {
    class TestComponent extends Component {
      template() {
        return html`<button @click=${this.handleClick}>Click Me</button>`;
      }

      handleClick() {}
    }

    const container = generateContainer();

    const instance = new TestComponent();

    const spy = vi.spyOn(instance, "handleClick").mockImplementation(() => {});

    container.appendChild(instance.render());

    const button = queryByText(container, "Click Me");

    // Simulate click
    button?.click();

    // Check if the click handler was called
    expect(spy).toHaveBeenCalled();
  });

  it("should render children correctly", () => {
    class TestComponent extends Component {
      template() {
        return html`<div>
          <span>Child 1</span>
          <span>Child 2</span>
        </div>`;
      }
    }

    const instance = new TestComponent();

    const container = generateContainer();

    container.appendChild(instance.render());

    expect(getByText(container, "Child 1")).toBeTruthy();
    expect(getByText(container, "Child 2")).toBeTruthy();
  });
});
