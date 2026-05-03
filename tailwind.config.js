/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        loiret: {
          blue: '#005baa',
          'blue-dark': '#00408a',
          'blue-light': '#e8f1fa',
          'blue-mid': '#1976d2',
          orange: '#f7a600',
          'orange-dark': '#d98f00',
          'orange-light': '#fff8e1',
        },
        apnj: {
          navy: '#1a237e',
          teal: '#00acc1',
          orange: '#ff8c00',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'top': '0 -2px 10px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
