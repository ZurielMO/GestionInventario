import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App Component - Integration Tests", () => {
  it("debe mostrar la pantalla de login inicialmente", () => {
    render(<App />);
    expect(screen.getByText("Bienvenido")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa tu usuario")
    ).toBeInTheDocument();
  });

  it("debe permitir login con credenciales correctas", async () => {
    render(<App />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Panel Principal")).toBeInTheDocument();
      expect(
        screen.getByText("Sistema Gestion de Inventario")
      ).toBeInTheDocument();
    });
  });

  it("debe mostrar error con credenciales incorrectas", async () => {
    render(<App />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "wrong" } });
    fireEvent.change(passwordInput, { target: { value: "wrong" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Usuario o contraseña incorrectos")
      ).toBeInTheDocument();
    });
  });

  it("debe permitir navegación entre páginas después del login", async () => {
    render(<App />);

    // Login
    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Panel Principal")).toBeInTheDocument();
    });

    // Navegar a Productos
    const productosButton = screen.getAllByText("Productos")[0];
    fireEvent.click(productosButton);

    await waitFor(() => {
      expect(screen.getByText("Gestión de Productos")).toBeInTheDocument();
    });

    // Navegar a Inventario
    const inventarioButton = screen.getAllByText("Inventario")[0];
    fireEvent.click(inventarioButton);

    await waitFor(() => {
      // Verificar que existe el h1 de Inventario (no el botón)
      const inventarioHeading = screen
        .getAllByText("Inventario")
        .find((element) => element.tagName === "H1");
      expect(inventarioHeading).toBeInTheDocument();
    });
  });

  it("debe cerrar sesión y volver al login", async () => {
    render(<App />);

    // Login
    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "usuario1" } });
    fireEvent.change(passwordInput, { target: { value: "password1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Panel Principal")).toBeInTheDocument();
    });

    // Cerrar sesión
    const logoutButton = screen.getByText("Cerrar Sesión");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByText("Bienvenido")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Ingresa tu usuario")
      ).toBeInTheDocument();
    });
  });

  it("debe validar múltiples usuarios", async () => {
    const usuarios = [
      { username: "admin", password: "admin123" },
      { username: "usuario1", password: "password1" },
      { username: "usuario2", password: "password2" },
    ];

    for (const user of usuarios) {
      const { unmount } = render(<App />);

      const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
      const passwordInput = screen.getByPlaceholderText(
        "Ingresa tu contraseña"
      );
      const submitButton = screen.getByRole("button", {
        name: /iniciar sesión/i,
      });

      fireEvent.change(usernameInput, { target: { value: user.username } });
      fireEvent.change(passwordInput, { target: { value: user.password } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Panel Principal")).toBeInTheDocument();
      });

      unmount();
    }
  });
});
