import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("CA1.1: mantém Buscar desabilitado enquanto o campo está vazio", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={vi.fn()} />);

    const searchButton = screen.getByRole("button", { name: "Buscar" });
    expect(searchButton).toBeDisabled();

    await user.type(
      screen.getByRole("searchbox", { name: "Nome da cidade" }),
      "São Paulo",
    );

    expect(searchButton).toBeEnabled();
  });
});
