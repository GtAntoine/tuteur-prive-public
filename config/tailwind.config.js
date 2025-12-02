// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-border': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    // Couleurs d'avatar existantes
    {
      pattern: /bg-(teal|gray|red|orange|yellow|green|blue|indigo|purple|pink)-(50|100|200|300|500|600)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /text-(teal|gray|red|orange|yellow|green|blue|indigo|purple|pink)-(50|100|200|300|500|600)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
    {
      pattern: /ring-(teal|gray|red|orange|yellow|green|blue|indigo|purple|pink)-(50|100|200|300|500|600)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    },
    // Nouvelles classes pour le bouton avec bordure dégradée
    'before:absolute',
    'before:inset-0',
    'before:rounded-full',
    'before:p-0.5',
    'before:-z-10',
    'before:bg-gradient-to-r',
    'before:from-indigo-500',
    'before:via-purple-500',
    'before:to-pink-500',
  ]
};
