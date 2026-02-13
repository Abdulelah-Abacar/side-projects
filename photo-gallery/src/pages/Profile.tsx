import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  deletePhoto,
  getUserPhotos,
  likePhoto,
  uploadPhoto,
} from "../services/api";
import ChromaGrid from "../components/ChromaGrid";
import type { AlertModalProps, Photo } from "../types";
import AlertModal from "../components/AlertModal";
import { Plus } from "lucide-react";
import PhotoFormModal from "../components/PhotoFormModal";

function Profile() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<AlertModalProps>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const { user } = useAuth();

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const res = await getUserPhotos(user!.id);
      const data = await res;

      setPhotos(data.photos);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    try {
      await deletePhoto(photoId);
      loadPhotos();
      setAlertModal({
        isOpen: true,
        title: "Success",
        message: "Photo deleted seccesfully",
        type: "success",
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        title: "Delete failed",
        message: err?.response?.data?.message || "Delete failed",
        type: "error",
      });
    }
  };

  const handleUpload = async (data: {
    title: string;
    description: string;
    file?: File | null;
  }) => {
    if (!data.title || !data.file) {
      setAlertModal({
        isOpen: true,
        title: "Missing Info",
        message: "Title and image are required",
        type: "error",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("photo", data.file);

    try {
      await uploadPhoto(formData);
      setShowUploadModal(false);
      loadPhotos();
      setAlertModal({
        isOpen: true,
        title: "Success",
        message: "Photo uploaded successfully",
        type: "success",
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        title: "Upload Failed",
        message: err.response?.data?.message || "Upload failed",
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleLike = async (photoId: string) => {
    if (!user) return;
    // Store original state for rollback
    const originalPhotos = [...photos];
    try {
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) => {
          if (photo._id === photoId) {
            const isLiked = photo.likes.includes(user.id);
            const updatedLikes = isLiked
              ? photo.likes.filter((id) => id !== user.id)
              : [...photo.likes, user.id];
            return { ...photo, likes: updatedLikes };
          }
          return photo;
        })
      );

      await likePhoto(photoId);
    } catch (error) {
      console.error("Error liking photo:", error);
      // Rollback on error
      setPhotos(originalPhotos);
    }
  };

  const handlePhotoUpdate = () => {
    loadPhotos();
  };

  useEffect(() => {
    document.title = `${user?.name} Profiel - Photo Gallery`;
  }, []);

  useEffect(() => {
    if (user) {
      loadPhotos();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row lg:items-center md:justify-between mb-8 max-w-7xl mx-auto">
          <div>
            <h2 className="text-4xl font-bold">My Photos</h2>
            <p className="text-gray-300 mt-2 text-lg">
              Welcome back, {user?.name}!
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 cursor-pointer lg:mt-0 bg-white text-black px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>
      <ChromaGrid
        items={photos}
        onLike={handleLike}
        onEdit={handlePhotoUpdate}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
        showActions
        onDelete={handleDelete}
      />
      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onConfirm={() => setAlertModal((prev) => ({ ...prev, isOpen: false }))}
        confirmText={"OK"}
      />
      {showUploadModal && (
        <PhotoFormModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleUpload}
          loading={uploading}
          mode="create"
        />
      )}
    </>
  );
}

export default Profile;
