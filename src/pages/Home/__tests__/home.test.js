import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "..";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Home />, container);
  });

  expect(container.textContent).toBe("Hello Stranger!");

  act(() => {
    render(<Home name="David" />, container);
  });

  expect(container.textContent).toBe("Hello David");
});
