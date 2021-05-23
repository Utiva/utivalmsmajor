module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      inherit: 'inherit',
    }),
    extend: {
      colors: {
        theme: '#0f078e',
        'light-theme': '#0f078e',
        secondary: '#fbaf1b',
        off: '#1976d2',
        approved: '#09ac23',
        approved_lg: '#f3fbf4',
        light: '#f8fafd',
        light_shade: '#a29eeb',
        fade: '#aaa4a4',
        txt: '#565656',
        txt_fade: '#6f6f6f',
        light_fade: '#f7f7f7',
        v_light: '#f0f5ff',
        v_light_sec: '#FFF2DA',
        'sec-shade': 'rgba(160, 121, 0, 0.15)',
      },
      animation: {
        'spin-fast': 'spin 0.3s linear infinite',
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '33.33333%',
        '3/10': '30%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '7/10': '70%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        vs: '12.5rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        unset: 'unset',
      },
      minHeight: {
        vs: '12.5rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        unset: 'unset',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
