/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#091320",
        "radical-red": {
          500: "#FB2C67",
          800: "#9F2450",
        },
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "10rem",
          "2xl": "20rem",
        },
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(at 50% 50% , hsla(214, 56%, 8%, 0.2) 0%, hsla(214, 56%, 8%, 1) 55%)",
      },
      boxShadow: {
        thumbnail: "0px 20px 32px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
