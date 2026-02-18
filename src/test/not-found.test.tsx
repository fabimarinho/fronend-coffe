import { render, screen } from "@testing-library/react";
import NotFound from "../app/not-found";

describe("NotFound page", () => {
  it("renders the not found message", () => {
    render(<NotFound />);
    expect(screen.getByText("Pagina nao encontrada")).toBeInTheDocument();
  });
});