import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function GetStartedButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleClick = () => {
    navigate('/auth/register');
  };

  return (
    <button 
      onClick={handleClick}
      className="w-fit group px-4 md:px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full 
        font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 
        hover:scale-105 active:scale-95 relative overflow-hidden cursor-pointer overflow-hidden whitespace-nowrap 
        transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(62,61,117,0.7)] flex justify-center" 
      style={{
        "--spread": "90deg",
        "--shimmer-color": "#ffffff",
        "--radius": "100px", 
        "--speed": "1.5s",
        "--cut": "0.1em",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-[-100%] rotate-gradient">
          <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))]"></div>
        </div>
      </div>
      <div className="absolute bg-gradient-to-r from-blue-500 to-purple-600 rounded-full [inset:var(--cut)]"></div>
      <span className="z-10 whitespace-pre bg-gradient-to-b from-black from-30% to-gray-300/80 bg-clip-text text-center font-semibold leading-none tracking-tight text-white">
        {t('landing.hero.cta')}
      </span>
    </button>
  );
}