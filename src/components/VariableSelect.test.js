import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import VariableSelect from "./VariableSelect";

it("renders variable select input", () => {
  render(
    <Provider store={store}>
      <VariableSelect id={"claim_number"} />
    </Provider>
  );
  expect(screen.getByText("Claim number"));
});
