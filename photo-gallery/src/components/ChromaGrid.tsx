import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Edit2, Heart, Trash2 } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";
import type { AlertModalProps, Photo } from "../types";
import { useAuth } from "../context/AuthContext";
import AlertModal from "./AlertModal";
import { useNavigate } from "react-router-dom";
import PhotoFormModal from "./PhotoFormModal";
import { updatePhoto } from "../services/api";

export interface ChromaGridProps {
  items?: Photo[];
  onLike: (photoId: string) => void;
  onDelete?: (photoId: string) => void;
  onEdit?: () => void;
  showActions?: boolean;
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  onLike,
  onDelete,
  onEdit,
  showActions = false,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPhotoId, setEditPhotoId] = useState<string | null>(null);
  const [alertModal, setAlertModal] = useState<AlertModalProps>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const { isAuthenticated: isAuth, user } = useAuth();
  const navigate = useNavigate();

  const data = items?.length ? items : [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (photo: Photo) => {
    setSelectedPhotoId(photo._id);
    setShowPreview(true);
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const checkIsLiked = (photo: Photo) => {
    if (!isAuth || !user) return false;
    return photo.likes.includes(user.id);
  };

  const selectedPhoto = selectedPhotoId
    ? data.find((photo) => photo._id === selectedPhotoId)
    : null;

  const editingPhoto = editPhotoId
    ? data.find((photo) => photo._id === editPhotoId)
    : null;

  const selectedPhotoIsLiked = selectedPhoto
    ? checkIsLiked(selectedPhoto)
    : false;

  const handleLike = async (e: React.MouseEvent, photoId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      setAlertModal({
        isOpen: true,
        title: "Authentication Required",
        message: "Please login to like photos",
        type: "warning",
        onConfirm: () => navigate("/login"),
      });
      return;
    }

    if (onLike) {
      await onLike(photoId);
    }
  };

  const handleModalLike = (photoId: string) => {
    if (onLike) {
      onLike(photoId);
    }
  };

  const handleEditSubmit = async (
    photoId: string,
    data: {
      title: string;
      description: string;
    }
  ) => {
    if (!data.title.trim()) {
      setAlertModal({
        isOpen: true,
        title: "Validation Error",
        message: "Title is required",
        type: "error",
      });
      return;
    }

    setUpdating(true);
    try {
      await updatePhoto(photoId, {
        title: data.title.trim(),
        description: data.description.trim(),
      });

      setShowEditModal(false);
      setEditPhotoId(null);
      if (onEdit) {
        onEdit();
      }

      setAlertModal({
        isOpen: true,
        title: "Success",
        message: "Photo updated successfully",
        type: "success",
        onConfirm: () => setAlertModal((prev) => ({ ...prev, isOpen: false })),
      });
    } catch (error: any) {
      setAlertModal({
        isOpen: true,
        title: "Update Failed",
        message: error.response?.data?.message || "Failed to update photo",
        type: "error",
        onConfirm: () => setAlertModal((prev) => ({ ...prev, isOpen: false })),
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation();
    setEditPhotoId(photo._id);
    setShowEditModal(true);
  };

  return (
    <>
      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
        style={
          {
            "--r": `${radius}px`,
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {data.map((c, i) => {
          const isPhotoLiked = checkIsLiked(c);
          return (
            <article
              key={`chroma-card-${c._id}-${i}`}
              onMouseMove={handleCardMove}
              onClick={() => handleCardClick(c)}
              className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
              style={
                {
                  "--card-border": c.borderColor || "transparent",
                  background: c.gradient,
                  "--spotlight-color": "rgba(255,255,255,0.3)",
                } as React.CSSProperties
              }
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                }}
              />
              <div className="relative z-10 flex-1 p-2.5 box-border">
                <img
                  src={c.filename}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
                <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
                {c.userId?.name && (
                  <span className="text-[0.95rem] opacity-80 text-right">
                    {c.userId?.name}
                  </span>
                )}
                <p className="m-0 text-[0.85rem] opacity-85 max-w-[220px] wrap-break-word line-clamp-2">
                  {c.description}
                </p>
              </footer>
              <div className="flex items-center justify-between px-8 py-4">
                <button
                  onClick={(e) => handleLike(e, c._id)}
                  type="button"
                  className={`flex items-center space-x-2 transition-colors hover:text-red-500 hover:scale-105 cursor-pointer ${
                    isPhotoLiked
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isPhotoLiked ? "scale-110" : ""
                    }`}
                    fill={isPhotoLiked ? "currentColor" : "none"}
                  />
                  <span className="text-sm font-medium">
                    {c.likes?.length || 0}
                  </span>
                </button>

                {showActions && (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => handleEditClick(e, c)}
                      type="button"
                      className="text-blue-500 hover:text-blue-600 transition-colors p-1 cursor-pointer hover:scale-105"
                      title="Edit photo"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(c._id);
                      }}
                      type="button"
                      className="text-red-500 hover:text-red-600 transition-colors p-1 cursor-pointer hover:scale-105"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          }}
        />
        <div
          ref={fadeRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-250 z-40"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
            opacity: 1,
          }}
        />
      </div>

      {selectedPhoto && (
        <ImagePreviewModal
          onClose={() => {
            setShowPreview(false);
            setSelectedPhotoId(null);
          }}
          onLike={handleModalLike}
          isLiked={selectedPhotoIsLiked}
          isOpen={showPreview}
          photo={selectedPhoto}
        />
      )}
      {editingPhoto && (
        <PhotoFormModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditPhotoId(null);
          }}
          onSubmit={(data) => {
            handleEditSubmit(editingPhoto._id, data);
          }}
          loading={updating}
          mode="edit"
          initialData={{
            title: editingPhoto?.title!,
            description: editingPhoto?.description || "",
          }}
        />
      )}
      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onConfirm={alertModal.onConfirm}
        onCancel={() => {
          setShowEditModal(false);
          setAlertModal((prev) => ({ ...prev, isOpen: false }));
        }}
        confirmText={
          alertModal.message.includes("login")
            ? "Login?"
            : alertModal.title.includes("Update")
            ? "Retry"
            : "OK"
        }
        cancelText="Cancel"
        showCancel={alertModal.type === "warning"}
      />
    </>
  );
};

export default ChromaGrid;
