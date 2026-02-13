import { Download, Heart, X } from "lucide-react";
import type { Photo } from "../types";

// const c = {
//   image: "https://i.pravatar.cc/300?img=2",
//   title: "Mike Chen",
//   subtitle: "Backend Engineer",
//   handle: "@mikechen",
//   borderColor: "#10B981",
//   gradient: "linear-gradient(180deg, #10B981, #000)",
// };

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLike: (photoId: string) => void;
  isLiked: boolean;
  photo: Photo;
}

function ImagePreviewModal({
  isOpen,
  isLiked,
  onClose,
  onLike,
  photo: c,
}: ImagePreviewModalProps) {
  const handleDownload = () => {
    // const link = document.createElement("a");
    // link.href = imageUrl;
    // link.download = c.title;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    console.log("Download clicked");
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(c._id);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-50 p-4"
    >
      <article
        className="group relative flex flex-col w-xl rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300"
        style={
          {
            "--card-border": c.borderColor || "transparent",
            background: c.gradient,
            "--spotlight-color": "rgba(255,255,255,0.3)",
          } as React.CSSProperties
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
          }}
        />
        <div className="flex items-center justify-between w-[93%] space-x-3 absolute top-5 right-4 z-30">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLike}
              className={`p-2 hover:scale-105 cursor-pointer transition-colors bg-white/10 rounded-lg flex items-center space-x-2 ${
                isLiked
                  ? "text-red-500 hover:text-red-400"
                  : "text-white hover:text-red-400"
              }`}
            >
              <Heart
                className="w-5 h-5"
                fill={isLiked ? "currentColor" : "none"}
              />
              <span className="text-sm text-white font-medium">
                {c.likes?.length || 0}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 text-white hover:text-gray-300 hover:scale-105 cursor-pointer bg-white/10 rounded-lg"
              title="Download Image"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white hover:text-gray-300 hover:scale-105 cursor-pointer bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative max-h-[60vh] aspect-auto z-10 flex-1 p-2.5 box-border">
          <img
            src={c.filename}
            alt={c.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-[10px]"
          />
        </div>
        <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] bg-black/20 backdrop-blur-md gap-x-3 gap-y-1">
          <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
          {c.userId?.name && (
            <span className="text-[0.95rem] opacity-80 text-right">
              {c.userId?.name}
            </span>
          )}
          <p className="m-0 text-[0.85rem] opacity-85 max-w-[500px] wrap-break-word">
            {c.description}
          </p>
        </footer>
      </article>
    </div>
  );
}

export default ImagePreviewModal;
