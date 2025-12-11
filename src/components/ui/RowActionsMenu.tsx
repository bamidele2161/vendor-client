import { useEffect } from "react";
import { Separator } from "./separator";

type AnchorRect = { top: number; left: number; width: number; height: number };

interface RowActionsMenuProps {
  anchorRect: AnchorRect | null;
  onView: () => void;
  onEdit: () => void;
  onClose: () => void;
}

export default function RowActionsMenu({
  anchorRect,
  onView,
  onEdit,
  onClose,
}: RowActionsMenuProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!anchorRect) return null;

  const menuWidth = 220;
  const padding = 8;
  const viewportWidth = window.innerWidth;
  const left = Math.min(
    Math.max(anchorRect.left, padding),
    viewportWidth - menuWidth - padding
  );
  const top = anchorRect.top + padding;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="fixed bg-white rounded-md shadow-lg border w-[220px] p-2"
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <button
            className="px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-greyColr text-left"
            onClick={onView}
          >
            View
          </button>
          <Separator className="my-1" />
          <button
            className="px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium text-greyColr text-left"
            onClick={onEdit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
