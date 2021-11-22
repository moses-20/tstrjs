import Card from "..";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(function () {
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(function () {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it("should select null after timing out", function () {
  const onSelect = jest.fn();

  act(function () {
    render(<Card onSelect={onSelect} />, container);
  });

  act(function () {
    jest.advanceTimersByTime(100);
  });

  expect(onSelect).not.toHaveBeenCalled();

  act(function () {
    jest.advanceTimersByTime(5000);
  });

  expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed", function () {
  const onSelect = jest.fn();

  act(function () {
    render(<Card onSelect={onSelect} />, container);
  });

  act(function () {
    render(<Card onSelect={onSelect} />, container);
  });

  act(function () {
    jest.advanceTimersByTime(100);
  });

  expect(onSelect).not.toHaveBeenCalled();

  act(function () {
    render(null, container);
  });

  act(function () {
    jest.advanceTimersByTime(5000);
  });

  expect(onSelect).not.toHaveBeenCalled();
});

it("should accept selections", function () {
  const onSelect = jest.fn();

  act(function () {
    render(<Card onSelect={onSelect} />, container);
  });

  act(function () {
    container
      .querySelector("[data-testid='2']")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
