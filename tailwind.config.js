module.exports = {
  mode: 'jit',
  prefix: 's-',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      display: ['Cerebri Sans', 'sans-serif'],
      body: ['Cerebri Sans', 'sans-serif'],
    },
    screens: {
      xs: '480px',
      // => @media (min-width: 480px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      'md-s': '850px',
      // => @media (min-width: 768px) { ... }

      'md-x': '1024px',
      // => @media (min-width: 1024px) { ... }

      lg: '1150px',
      // => @media (min-width: 1024px) { ... }

      xl: '1700px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'primary-blue': '#2E48DA',
        'primary-blue-light': '#EAEDFF',
        primary: '#0F0C3D',
        'primary-light': '#5C5A77',
        'gray-one': '#ABAEBF',
        red: '#EA4335',
        'primary-green': '#3DDC97',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
