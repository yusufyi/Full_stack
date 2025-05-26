// src/__tests__/TaskList.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TaskList } from "../components/TaskList";

beforeEach(() => {
  // Mock global fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, title: "Learn React", completed: true },
          { id: 2, title: "Write Tests", completed: false },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("displays loading state initially", () => {
  render(<TaskList />);
  expect(screen.getByText(/loadiing/i)).toBeInTheDocument();
});

test("fetches and displays tasks", async () => {
  render(<TaskList />);

  expect(await screen.findByText("Learn React – ✅ Done")).toBeInTheDocument();
  expect(screen.getByText("Write Tests – ❌ Not Done")).toBeInTheDocument();
});