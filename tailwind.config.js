/**
 * Tailwind CSS configuration.
 *
 * This file sets up the custom color palette and radius values used
 * throughout the landing pages and dashboard. Colours and radii are
 * derived directly from the project specification to ensure brand
 * consistency and accessibility.
 */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0B0F14',
        panel: '#121821',
        'text-primary': '#E8ECEF',
        'text-secondary': '#B7C2CC',
        accent: '#764AEF',
        'accent-hover': '#6A3DE3',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        border: '#1E2630'
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};