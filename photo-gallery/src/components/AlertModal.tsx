import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import type { AlertModalProps } from "../types";

function AlertModal({
  isOpen,
  title,
  message,
  type,
  onCancel,
  onConfirm,
  confirmText,
  cancelText,
  showCancel,
}: AlertModalProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  if (!isOpen) return null;
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white/10 min-w-sm backdrop-blur-xs border border-gray-300 rounded-2xl"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2 text-white hover:text-gray-300 bg-white/10 backdrop-blur-sm rounded-lg">
                {icons[type]}
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <button
              onClick={onCancel}
              className="p-2 text-white hover:text-gray-300 hover:scale-105 cursor-pointer bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-200 mb-6">{message}</p>
          <div className="flex gap-3 justify-end">
            {showCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-200 border border-gray-200 rounded-lg hover:text-gray-300 cursor-pointer transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`px-4 py-2 bg-black cursor-pointer text-white rounded-lg transition-colors`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
