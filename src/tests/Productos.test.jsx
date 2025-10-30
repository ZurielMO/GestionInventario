import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Productos from "../components/Productos";

describe("Productos Component", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("debe renderizar el formulario de productos correctamente", () => {
    render(<Productos />);

    expect(screen.getByText("Gestión de Productos")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Proveedor")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Presentación")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar producto/i })
    ).toBeInTheDocument();
  });

  it("debe mostrar mensaje cuando no hay productos", () => {
    render(<Productos />);
    expect(screen.getByText("No hay productos guardados.")).toBeInTheDocument();
  });

  it("debe agregar un nuevo producto", async () => {
    render(<Productos />);

    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Laptop Dell" } });
    fireEvent.change(proveedorInput, { target: { value: "Dell Inc" } });
    fireEvent.change(presentacionInput, { target: { value: "Unidad" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Laptop Dell")).toBeInTheDocument();
      expect(screen.getByText("Proveedor: Dell Inc")).toBeInTheDocument();
      expect(screen.getByText("Presentación: Unidad")).toBeInTheDocument();
    });
  });

  it("debe limpiar el formulario después de agregar un producto", async () => {
    render(<Productos />);

    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Teclado" } });
    fireEvent.change(proveedorInput, { target: { value: "Logitech" } });
    fireEvent.change(presentacionInput, { target: { value: "Caja" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nombreInput.value).toBe("");
      expect(proveedorInput.value).toBe("");
      expect(presentacionInput.value).toBe("");
    });
  });

  it("debe editar un producto existente", async () => {
    render(<Productos />);

    // Agregar producto
    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Mouse" } });
    fireEvent.change(proveedorInput, { target: { value: "HP" } });
    fireEvent.change(presentacionInput, { target: { value: "Unidad" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Mouse")).toBeInTheDocument();
    });

    // Editar producto
    const editButton = screen.getByRole("button", { name: /editar/i });
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /guardar cambios/i })
      ).toBeInTheDocument();
    });

    fireEvent.change(nombreInput, { target: { value: "Mouse Inalámbrico" } });
    const saveButton = screen.getByRole("button", { name: /guardar cambios/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Mouse Inalámbrico")).toBeInTheDocument();
      expect(screen.queryByText("Mouse")).not.toBeInTheDocument();
    });
  });

  it("debe eliminar un producto", async () => {
    render(<Productos />);

    // Agregar producto
    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Monitor" } });
    fireEvent.change(proveedorInput, { target: { value: "Samsung" } });
    fireEvent.change(presentacionInput, { target: { value: "Unidad" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Monitor")).toBeInTheDocument();
    });

    // Eliminar producto
    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Monitor")).not.toBeInTheDocument();
      expect(
        screen.getByText("No hay productos guardados.")
      ).toBeInTheDocument();
    });
  });

  it("debe cancelar la edición", async () => {
    render(<Productos />);

    // Agregar producto
    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Teclado" } });
    fireEvent.change(proveedorInput, { target: { value: "Logitech" } });
    fireEvent.change(presentacionInput, { target: { value: "Caja" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Teclado")).toBeInTheDocument();
    });

    // Iniciar edición
    const editButton = screen.getByRole("button", { name: /editar/i });
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /cancelar/i })
      ).toBeInTheDocument();
    });

    // Cancelar
    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /agregar producto/i })
      ).toBeInTheDocument();
      expect(nombreInput.value).toBe("");
    });
  });

  it("debe persistir productos en localStorage", async () => {
    const { unmount } = render(<Productos />);

    const nombreInput = screen.getByPlaceholderText("Nombre");
    const proveedorInput = screen.getByPlaceholderText("Proveedor");
    const presentacionInput = screen.getByPlaceholderText("Presentación");
    const submitButton = screen.getByRole("button", {
      name: /agregar producto/i,
    });

    fireEvent.change(nombreInput, { target: { value: "Tablet" } });
    fireEvent.change(proveedorInput, { target: { value: "Apple" } });
    fireEvent.change(presentacionInput, { target: { value: "Unidad" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Tablet")).toBeInTheDocument();
    });

    // Verificar que se guardó en localStorage
    const stored = JSON.parse(localStorage.getItem("productos") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].nombre).toBe("Tablet");

    unmount();

    // Re-renderizar y verificar que los datos persisten
    render(<Productos />);
    await waitFor(() => {
      expect(screen.getByText("Tablet")).toBeInTheDocument();
    });
  });
});
