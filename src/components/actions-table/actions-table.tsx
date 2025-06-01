import React from "react";
import { AppButton } from "../ui";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  edit: () => void;
  remove: () => void;
}
export default function ActionsTable({ edit, remove }: Props) {
  return (
    <div className="flex items-center gap-2">
      <AppButton
        onClick={edit}
        className="text-primary hover:text-primary-600 transition-colors">
        <Pencil className="w-4 h-4" />
      </AppButton>
      <AppButton
        onClick={remove}
        className="text-destructive hover:text-destructive-foreground transition-colors bg-red-700 hover:!bg-red-800 duration-300">
        <Trash2 className="w-4 h-4" />
      </AppButton>
    </div>
  );
}

