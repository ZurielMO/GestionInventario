import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Principal from "../components/Principal";

describe("Principal Component", () => {
  it("debe renderizar el título y descripción", () => {
    render(<Principal />);

    expect(screen.getByText("Panel Principal")).toBeInTheDocument();
    expect(
      screen.getByText("Bienvenido al sistema de gestión integral")
    ).toBeInTheDocument();
  });

  it("debe mostrar las 4 tarjetas de estadísticas", () => {
    render(<Principal />);

    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("1,248")).toBeInTheDocument();

    expect(screen.getByText("Inventario")).toBeInTheDocument();
    expect(screen.getByText("856")).toBeInTheDocument();

    expect(screen.getByText("Compras")).toBeInTheDocument();
    expect(screen.getByText("324")).toBeInTheDocument();

    expect(screen.getByText("Proveedores")).toBeInTheDocument();
    expect(screen.getByText("48")).toBeInTheDocument();
  });

  it("debe mostrar los porcentajes de incremento", () => {
    render(<Principal />);

    expect(screen.getByText("+12% este mes")).toBeInTheDocument();
    expect(screen.getByText("+5% este mes")).toBeInTheDocument();
    expect(screen.getByText("+8% este mes")).toBeInTheDocument();
    expect(screen.getByText("+2% este mes")).toBeInTheDocument();
  });

  it("debe mostrar la sección de acciones rápidas", () => {
    render(<Principal />);

    expect(screen.getByText("Acciones Rápidas")).toBeInTheDocument();
    expect(screen.getByText("Agregar Producto")).toBeInTheDocument();
    expect(screen.getByText("Ver Reportes")).toBeInTheDocument();
    expect(screen.getByText("Gestionar Proveedores")).toBeInTheDocument();
  });

  it("debe tener los emojis correctos en las acciones rápidas", () => {
    render(<Principal />);

    const container = screen.getByText("Acciones Rápidas").parentElement;

    expect(container?.textContent).toContain("📦");
    expect(container?.textContent).toContain("📊");
    expect(container?.textContent).toContain("👥");
  });

  it("debe aplicar las clases de estilo correctas", () => {
    const { container } = render(<Principal />);

    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("max-w-6xl", "mx-auto");
  });
});
