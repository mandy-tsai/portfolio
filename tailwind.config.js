/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        bg: '#F2F0ED',
        fg: '#1A1A1A',
        muted: '#6B6B6B',
        border: '#D4D0CB',
        accent: '#FF4D00',
      },
    },
  },
  plugins: [],
}
