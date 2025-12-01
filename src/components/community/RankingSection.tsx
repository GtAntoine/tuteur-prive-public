import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface RankingSectionProps {
  rankings: any[];
  period: string;
  onPeriodChange: (period: 'weekly' | 'monthly' | 'all_time') => void;
}

export function RankingSection({ rankings, period, onPeriodChange }: RankingSectionProps) {
  const periods = [
    { id: 'weekly', label: 'Semaine' },
    { id: 'monthly', label: 'Mois' },
    { id: 'all_time', label: 'Tout' }
  ];

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1: return <Medal className="w-6 h-6 text-gray-400" />;
      case 2: return <Award className="w-6 h-6 text-orange-400" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Classement</h2>

      <div className="flex gap-2 mb-6">
        {periods.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onPeriodChange(id as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              period === id
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {rankings.map((ranking, index) => (
          <div 
            key={ranking.id}
            className={`flex items-center gap-4 p-3 rounded-lg ${
              index < 3 ? 'bg-purple-50' : ''
            }`}
          >
            <div className="w-8 flex justify-center">
              {getMedalIcon(index) || (
                <span className="text-gray-500 font-medium">{index + 1}</span>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {ranking.profiles?.name}
              </p>
              <p className="text-sm text-gray-500">
                {ranking.profiles?.grade}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-purple-600">
                {ranking.score} pts
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}