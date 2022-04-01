import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

it("renders App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText("MHPAEA Analysis Tool")).toBeInTheDocument();
});
