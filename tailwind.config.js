/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#19A7CE  ',  //#DB1A5A   ED7D31
        customGray: '#171F29',
      },
      boxShadow: {
        grayBorder: 'inset 0 0 0 1px #5A5C60',
      },
    },
  },
  plugins: [],
}

