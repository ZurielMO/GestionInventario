import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";

describe("Login Component", () => {
  it("debe renderizar el formulario de login correctamente", () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);

    expect(screen.getByText("Bienvenido")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa tu usuario")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Ingresa tu contraseña")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("debe actualizar los inputs cuando el usuario escribe", () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    expect(usernameInput.value).toBe("admin");
    expect(passwordInput.value).toBe("admin123");
  });

  it("debe llamar a onLogin con credenciales correctas al enviar el formulario", () => {
    const mockOnLogin = vi.fn(() => true);
    render(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledWith("admin", "admin123");
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it("debe mostrar mensaje de error con credenciales incorrectas", () => {
    const mockOnLogin = vi.fn(() => false);
    render(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const submitButton = screen.getByRole("button", {
      name: /iniciar sesión/i,
    });

    fireEvent.change(usernameInput, { target: { value: "wrong" } });
    fireEvent.change(passwordInput, { target: { value: "wrong" } });
    fireEvent.click(submitButton);

    expect(
      screen.getByText("Usuario o contraseña incorrectos")
    ).toBeInTheDocument();
  });

  it("debe requerir campos obligatorios", () => {
    const mockOnLogin = vi.fn();
    render(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByPlaceholderText("Ingresa tu usuario");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });
});
