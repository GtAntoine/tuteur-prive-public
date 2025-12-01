import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, CheckSquare, HelpCircle, Plus } from 'lucide-react';
import { generateSlug } from '../../lib/utils/url';
import { LazyImage } from '../common/LazyImage';
import { supabase } from '../../lib/supabase/client';

interface CommunityListProps {
  content: any[];
  isLoading: boolean;
  error: string | null;
  onLike: (id: string) => void;
  onSave: (id: string) => Promise<void>;
}

export function CommunityList({ content, isLoading, error, onLike, onSave }: CommunityListProps) {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [animatingHearts, setAnimatingHearts] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
const [savingItems, setSavingItems] = useState<Record<string, boolean>>({});


  
  // Initialiser les compteurs de likes au chargement
  useEffect(() => {
    const initialCounts = content.reduce((acc: Record<string, number>, item) => {
      acc[item.id] = item.likes?.[0]?.count || 0;
      return acc;
    }, {});
    setLikeCounts(initialCounts);
  }, [content]);

  // Vérifier les likes au chargement et quand le contenu change
  useEffect(() => {
    checkLikedPosts();
  }, [content]);

  const checkLikedPosts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: likes } = await supabase
      .from('user_likes')
      .select('history_id')
      .eq('user_id', user.id);

    if (likes) {
      const likedMap = likes.reduce((acc: Record<string, boolean>, like) => {
        acc[like.history_id] = true;
        return acc;
      }, {});
      setLikedPosts(likedMap);
    }
  };

const handleLike = async (id: string) => {
    const isCurrentlyLiked = likedPosts[id];

    // Mise à jour optimiste du statut de like
    setLikedPosts(prev => ({
      ...prev,
      [id]: !isCurrentlyLiked
    }));

    // Mise à jour optimiste du compteur
    setLikeCounts(prev => ({
      ...prev,
      [id]: prev[id] + (isCurrentlyLiked ? -1 : 1)
    }));

    // Animation du cœur
    setAnimatingHearts(prev => ({
      ...prev,
      [id]: true
    }));

    setTimeout(() => {
      setAnimatingHearts(prev => ({
        ...prev,
        [id]: false
      }));
    }, 1000);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (isCurrentlyLiked) {
        // Supprimer le like
        const { error } = await supabase
          .from('user_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('history_id', id);

        if (error) throw error;
      } else {
        // Ajouter le like
        const { error } = await supabase
          .from('user_likes')
          .insert({ user_id: user.id, history_id: id });

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Restaurer l'état précédent en cas d'erreur
      setLikedPosts(prev => ({
        ...prev,
        [id]: isCurrentlyLiked
      }));
      // Restaurer le compteur en cas d'erreur
      setLikeCounts(prev => ({
        ...prev,
        [id]: prev[id] + (isCurrentlyLiked ? 1 : -1)
      }));
    }
  };

  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!content.length) {
    return (
      <div className="bg-white/10 text-white p-6 rounded-lg text-center">
        <p>Aucun contenu partagé pour le moment.</p>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-5 h-5" />;
      case 'correction':
        return <CheckSquare className="w-5 h-5" />;
      case 'guided':
        return <HelpCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleCardClick = (item: any) => {
    const title = item.data.lesson_analysis?.title || 
                 item.data.exercise_analysis?.title || 
                 'Sans titre';
    const slug = generateSlug(title);
    navigate(`/shared/${item.id}/${slug}`, {
      state: { from: 'community' }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
      {content.map((item) => {
        const title = item.data.lesson_analysis?.title || 
                     item.data.exercise_analysis?.title || 
                     'Sans titre';
        const isLiked = likedPosts[item.id];
        const isAnimating = animatingHearts[item.id];
        const likeCount = likeCounts[item.id] || 0;
      
        return (
          <div 
            key={item.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Image thumbnail */}
            <div 
              className="aspect-video cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              {item.images?.[0] ? (
                <LazyImage
                  src={item.images[0]}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  {getTypeIcon(item.type)}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div 
                className="mb-2 cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <h3 className="font-semibold text-gray-900 line-clamp-1">{title}</h3>
                <p className="text-sm text-gray-500">
                  Par {item.profiles?.name} • {item.profiles?.grade}
                </p>
              </div>

            {/* Actions */}
              <div className="flex items-center justify-between mt-4">
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(item.id);
                }}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 ${
                    isAnimating ? 'animate-pop-spin' : ''
                  } ${
                    isLiked ? 'fill-current' : ''
                  }`} 
                />
                <span>{likeCount}</span>
              </button>

               <button
  onClick={async (e) => {
    e.stopPropagation();
    if (savedItems[item.id] || savingItems[item.id]) return;
    
    setSavingItems(prev => ({ ...prev, [item.id]: true }));
    try {
      await onSave(item.id);
      setSavedItems(prev => ({ ...prev, [item.id]: true }));
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setSavingItems(prev => ({ ...prev, [item.id]: false }));
    }
  }}
  disabled={savedItems[item.id] || savingItems[item.id]}
  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
    savedItems[item.id]
      ? 'bg-green-50 text-green-600'
      : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
  }`}
>
  {savingItems[item.id] ? (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  ) : savedItems[item.id] ? (
    <CheckSquare className="w-4 h-4" />
  ) : (
    <Plus className="w-4 h-4" />
  )}
  <span>{savedItems[item.id] ? 'Ajouté' : 'Ajouter'}</span>
</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}