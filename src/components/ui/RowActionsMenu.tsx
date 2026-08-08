import { useEffect } from "react";

type AnchorRect = { top: number; left: number; width: number; height: number };

interface RowActionsMenuProps {
  anchorRect: AnchorRect | null;
  onView: () => void;
  onEdit: () => void;
  onClose: () => void;
  onDelist?: () => void;
  product?: boolean;
}

export default function RowActionsMenu({
  anchorRect,
  onView,
  onEdit,
  onClose,
  onDelist,
  product,
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
        className="fixed w-[180px] rounded-xl border border-[#151A22]/10 bg-white p-1.5 shadow-[0_20px_55px_rgba(21,26,34,.16)]"
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <button
            className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#242B35] hover:bg-[#EEF1F3]"
            onClick={onView}
          >
            View
          </button>

          <button
            className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#242B35] hover:bg-[#EEF1F3]"
            onClick={onEdit}
          >
            Update
          </button>
          {product && (
            <button
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              onClick={onDelist}
            >
              Delist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
