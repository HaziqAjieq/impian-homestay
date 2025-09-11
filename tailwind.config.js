/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // No need for theme.extend for colors in v4
  // since we handle that inside @theme in CSS
  theme: {},
  plugins: [],
}
