module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {},


     
  },
  variants: {
    animate: ['hover'],
  },
  plugins: [require("@tailwindcss/forms")],
}
