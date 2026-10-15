"use client";

import Button from "../ui/Button";

interface RunButtonProps {
  isRunning: boolean;
  onClick: () => void;
}

export default function RunButton({ isRunning, onClick }: RunButtonProps) {
  return (
    <Button variant="primary" onClick={onClick} disabled={isRunning}>
      {isRunning ? "Running..." : "▶ Run"}
    </Button>
  );
}
