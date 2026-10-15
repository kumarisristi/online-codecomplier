"use client";

import { ReactNode } from "react";
import Button from "../ui/Button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-line rounded-xl shadow-cardHover w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-ink font-display font-semibold">{title}</h2>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
