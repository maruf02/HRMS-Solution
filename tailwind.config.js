/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkTheme: {
        colors: {
          primary: '#2D3748', // Adjust the color code according to your preference
          // Add more dark theme colors as needed
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

