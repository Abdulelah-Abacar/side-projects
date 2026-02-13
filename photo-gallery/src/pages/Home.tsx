import { useEffect, useState } from "react";
import ChromaGrid from "../components/ChromaGrid";
import type { Photo } from "../types";
import { getPhotos, likePhoto } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const res = await getPhotos();
      const data = await res;
      setPhotos(data.photos);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    document.title = "Photo Gallery";
    loadPhotos();
  }, []);

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
    <div className="max-w-7xl mx-auto">
      <ChromaGrid
        items={photos}
        onLike={handleLike}
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
}

export default Home;
