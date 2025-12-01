import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckSquare, HelpCircle, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ModeSelector() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => navigate('/lesson')}
          className={`group flex md:max-w-sm bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-1 py-1 text-gray-900 rounded-2xl transition-all duration-300 hover:scale-[1.02] `}>
          <div className="relative bg-white/90 rounded-xl p-3 md:p-6  w-full h-full flex justify-center items-center ">
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 rounded-xl text-gray-900">
              <div className="animate-float-slow-5 flex h-16 md:h-20 w-16 md:w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <Brain className="animate-bounce-slow-4 h-8 md:h-10 w-8 md:w-10 text-white" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">{t('modes.lesson.title')}</span>
                <p className="md:mt-2 text-sm md:text-base">{t('modes.lesson.description')}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer" />
          </div>
        </button>

        <button
          onClick={() => navigate('/guided')}
          className={`group flex md:max-w-sm bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-1 py-1 text-gray-900 rounded-2xl transition-all duration-300 hover:scale-[1.02] `}>
          <div className="relative bg-white/90 rounded-xl p-3 md:p-6  w-full h-full flex justify-center items-center ">
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 rounded-xl text-gray-900">
              <div className="animate-bounce-slow-4 flex h-16 md:h-20 w-16 md:w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <HelpCircle className="animate-float-slow-5  h-8 md:h-10 w-8 md:w-10 text-white" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">{t('modes.guided.title')}</span>
                <p className="md:mt-2 text-sm md:text-base">{t('modes.guided.description')}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer" />
          </div>
        </button>

        <button
          onClick={() => navigate('/correction')}
          className={`group flex md:max-w-sm bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-1 py-1 text-gray-900 rounded-2xl transition-all duration-300 hover:scale-[1.02] `}>
          <div className="relative bg-white/90 rounded-xl p-3 md:p-6  w-full h-full flex justify-center items-center ">
            <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 rounded-xl text-gray-900">
              <div className="animate-float-slow-6 t flex h-16 md:h-20 w-16 md:w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600  backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="animate-bounce-slow-5  h-8 md:h-9 w-8 md:w-9 text-white" />
              </div>
              <div className="text-center">
                <span className="block text-xl font-bold">{t('modes.correction.title')}</span>
                <p className="md:mt-2 text-sm md:text-base">{t('modes.correction.description')}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer" />
          </div>
        </button>
      </div>

      {/* Community Button */}
      <button
        onClick={() => navigate('/community')}
        className="w-full group flex bg-gradient-to-tr from-indigo-500 to-pink-500 items-center gap-0.5 px-1 py-1 text-gray-900 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="relative bg-white/90 rounded-xl p-3 md:p-6 w-full h-full flex justify-center items-center">
          <div className="relative z-10 flex items-center gap-4 rounded-xl text-gray-900">
            <div className="animate-float-slow-4 flex h-12 md:h-16 w-12 md:w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
              <Users className="animate-bounce-slow-5 h-6 md:h-8 w-6 md:w-8 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold">{t('modes.community.title')}</span>
              <p className="text-sm md:text-base">{t('modes.community.description')}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:animate-shimmer" />
        </div>
      </button>
    </div>
  );
}