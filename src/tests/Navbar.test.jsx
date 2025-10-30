import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar Component", () => {
  const mockOnPageChange = vi.fn();
  const mockOnLogout = vi.fn();

  const defaultProps = {
    currentPage: "Principal",
    onPageChange: mockOnPageChange,
    onLogout: mockOnLogout,
  };

  it("debe renderizar todos los elementos del menú", () => {
    render(<Navbar {...defaultProps} />);

    expect(
      screen.getByText("Sistema Gestion de Inventario")
    ).toBeInTheDocument();
    expect(screen.getByText("Principal")).toBeInTheDocument();
    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("Inventario")).toBeInTheDocument();
    expect(screen.getByText("Compras")).toBeInTheDocument();
    expect(screen.getByText("Proveedores")).toBeInTheDocument();
  });

  it("debe resaltar la página actual", () => {
    render(<Navbar {...defaultProps} currentPage="Productos" />);

    const productosButton = screen.getAllByText("Productos")[0];
    expect(productosButton).toHaveClass("bg-blue-100", "text-blue-700");
  });

  it("debe llamar a onPageChange al hacer clic en un menú", () => {
    render(<Navbar {...defaultProps} />);

    const inventarioButton = screen.getAllByText("Inventario")[0];
    fireEvent.click(inventarioButton);

    expect(mockOnPageChange).toHaveBeenCalledWith("Inventario");
  });

  it("debe llamar a onLogout al hacer clic en cerrar sesión", () => {
    render(<Navbar {...defaultProps} />);

    const logoutButton = screen.getByText("Cerrar Sesión");
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it("debe mostrar/ocultar el menú móvil al hacer clic en el botón hamburguesa", () => {
    render(<Navbar {...defaultProps} />);

    // Buscar el botón de menú hamburguesa por el SVG que contiene
    const buttons = screen.getAllByRole("button");
    const hamburgerButton = buttons.find((button) =>
      button.querySelector("svg")
    );

    expect(hamburgerButton).toBeDefined();

    if (hamburgerButton) {
      // Verificar que inicialmente no hay menú móvil expandido
      const initialButtons = screen.getAllByText("Principal");
      const initialCount = initialButtons.length;

      // Hacer clic para abrir el menú móvil
      fireEvent.click(hamburgerButton);

      // Verificar que ahora hay más instancias (menú móvil visible)
      const expandedButtons = screen.getAllByText("Principal");
      expect(expandedButtons.length).toBeGreaterThan(initialCount);
    }
  });
});
