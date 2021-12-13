module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1240px',
      },
    },
    extend: {
      maxHeight: {
        128: '52rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
