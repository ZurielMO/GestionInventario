import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// Limpieza automática después de cada test
afterEach(() => {
  cleanup();
});
