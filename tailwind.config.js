module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: require("daisyui/colors"), // this does nothing and apparently isn't needed with tailwindcss
    },
  },
  plugins: [require("daisyui")],
};
