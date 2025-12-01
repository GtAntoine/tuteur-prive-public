import React, { useState } from 'react';
import { Search, Filter, Trophy } from 'lucide-react';
import { BackButton } from '../common/BackButton';
import { CommunityFilters } from './CommunityFilters';
import { CommunityList } from './CommunityList';
import { RankingSection } from './RankingSection';
import { useCommunityContent } from '../../hooks/useCommunityContent';
import { useAuth } from '../../hooks/useAuth';

export function CommunityPage() {
  const { currentProfile } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: undefined,
    type: undefined,
    grade: currentProfile?.grade,
    period: 'weekly'
  });

  const { 
    content, 
    rankings,
    isLoading, 
    error,
    handleLike,
    handleSaveToHistory
  } = useCommunityContent(filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton to="/app" />

        <div className="flex items-center justify-between my-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center ">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Communauté</h1>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
        </div>

        <div className="">
          <div className="lg:col-span-2 space-y-6">
            {showFilters && (
              <CommunityFilters
                filters={filters}
                onFilterChange={setFilters}
              />
            )}

          {/*  <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Rechercher dans la communauté..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div> */}

            <CommunityList
              content={content}
              isLoading={isLoading}
              error={error}
              onLike={handleLike}
              onSave={handleSaveToHistory}
            />
          </div>

         {/* <div className="space-y-6">
            <RankingSection
              rankings={rankings}
              period={filters.period}
              onPeriodChange={(period) => setFilters(prev => ({ ...prev, period }))}
            />
          </div>*/}
        </div>
      </div>
    </div>
  );
}