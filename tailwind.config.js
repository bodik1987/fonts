/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        eUkraine: ["eUkraine", "sans-serif"],
        eUkraineHead: ["eukraineHead", "sans-serif"],
        aptos: ["aptos", "sans-serif"],
        aptosNarrow: ["aptosNarrow", "sans-serif"],
        googleSans: ["googleSans", "sans-serif"],
        rozetka: ["rozetka", "sans-serif"],
        mailSans: ["mailSans", "sans-serif"],
        mazzardH: ["mazzardH", "sans-serif"],
        mont: ["mont", "sans-serif"],
        tTFirstNeue: ["tTFirstNeue", "sans-serif"],
        jetBrainsMono: ["jetBrainsMono", "sans-serif"],
        caveat: ["caveat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
