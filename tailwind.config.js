/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: {
          50: '#000000',
          100: '#1a1a1a',
          200: '#333333',
          300: '#4d4d4d',
          400: '#666666',
          500: '#808080',
          600: '#999999',
          700: '#b3b3b3',
          800: '#cccccc',
          900: '#e6e6e6',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faefcf',
          200: '#f5dd9f',
          300: '#f0cb6f',
          400: '#eaba3f',
          500: '#d4af37', // base gold
          600: '#b3942e',
          700: '#927225',
          800: '#71551c',
          900: '#503914',
        },
      },
    },
  },
  plugins: [],
}