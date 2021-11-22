import Toggle from "..";
const { render } = require("@testing-library/react");
const { unmountComponentAtNode } = require("react-dom");
const { act } = require("react-dom/test-utils");

let container = null;
beforeEach(function () {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(function () {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("toggles value when clicked", function () {
  const onChange = jest.fn();

  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn On");

  act(function () {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn Off");

  act(function () {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn On");
});
