/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        x: 'repeat(64, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        y: 'repeat(36, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('daisyui')],
}
