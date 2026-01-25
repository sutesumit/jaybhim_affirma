"use client";

import React from "react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";

interface AnonymousToggleProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const AnonymousToggle: React.FC<AnonymousToggleProps> = ({ id, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-[1px] group/anon hover:opacity-100 transition-opacity">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(!!val)}
        className="border-2 border-[--primary-blue] rounded-[2px] data-[state=checked]:shadow-[inset_0_0_0_2px_rgba(255,255,255,0.6)] data-[state=checked]:bg-[--primary-blue] data-[state=checked]:border-[--primary-blue] h-3 w-3 transition-all duration-300"
      />
      <Label
        htmlFor={id}
        className={`text-[9px] px-1 rounded-[2px] font-semibold tracking-wide uppercase text-[--primary-blue] cursor-pointer select-none ${
          checked ? "bg-[--primary-blue] text-[--primary-white]" : ""
        } transition-all duration-300`}
      >
        Anonymous
      </Label>
    </div>
  );
};
