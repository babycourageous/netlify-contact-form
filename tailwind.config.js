const twForms = require('@tailwindcss/custom-forms')

function owl({ addUtilities, config, e }) {
  const newUtilities = {}
  const spacing = config('theme.spacing')

  Object.keys(spacing).forEach(key => {
    const className = `.${e(`o-${key}`)} > * + *`
    const marginTop = spacing[key]

    // Horizontal spacing too!
    const classNameHorizontal = `.${e(`oh-${key}`)} > * + *`
    const marginLeft = spacing[key]

    newUtilities[className] = { marginTop }
    newUtilities[classNameHorizontal] = { marginLeft }
  })

  addUtilities(newUtilities, ['responsive'])
}

/* eslint-disable global-require */
module.exports = {
  theme: {
    fontFamily: {
      sans: 'Source Sans Pro, sans-serif',
      serif: 'PT Serif, serif',
      mono: 'Fira Mono, monospace',
    },
    extend: {
      fontSize: {
        xxs: '.6875rem',
      },
      flex: {
        holy: '1 0 auto',
      },
    },
  },
  variants: {},
  plugins: [twForms, owl],
}
