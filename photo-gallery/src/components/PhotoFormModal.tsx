import { Edit2, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { PhotoFormData } from "../types";

interface PhotoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    file?: File | null;
  }) => void;
  loading?: boolean;
  mode: "create" | "edit";
  initialData?: { title: string; description: string };
}

function PhotoFormModal({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  mode,
  initialData,
}: PhotoFormModalProps) {
  const [formData, setFormData] = useState<PhotoFormData>({
    title: "",
    description: "",
    file: null,
  });
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          title: initialData.title,
          description: initialData.description,
          file: null,
        });
      } else {
        setFormData({
          title: "",
          description: "",
          file: null,
        });
      }
    }
  }, [isOpen, mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create" && !formData.file) {
      return;
    }
    if (!formData.title.trim()) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      file: formData.file,
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      file: e.target.files?.[0] || null,
    });
  };

  if (!isOpen) return null;

  const isCreateMode = mode === "create";
  const title = isCreateMode ? "Upload New Photo" : "Edit Photo";
  const submitText = isCreateMode ? "Upload Photo" : "Update Photo";
  const Icon = isCreateMode ? Upload : Edit2;
  return (
    <div
      onClick={onClose}
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
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-gray-300 hover:scale-105 cursor-pointer bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-transparent transition-all"
                placeholder="Enter photo title"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-transparent transition-all"
                rows={4}
                maxLength={500}
                placeholder="Enter photo description (optional)"
                disabled={loading}
              />
            </div>

            {isCreateMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (PNG, JPEG) *
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-black file:text-white file:cursor-pointer hover:file:bg-black/80"
                  disabled={loading}
                />
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-black cursor-pointer text-white rounded-lg transition-colors`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isCreateMode ? "Uploading..." : "Updating..."}</span>
                  </div>
                ) : (
                  submitText
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-200 border border-gray-200 rounded-lg hover:text-gray-300 cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PhotoFormModal;
