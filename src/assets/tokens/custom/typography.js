const typography = {
  '.text-h1': {
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '4rem',
    lineHeight: '4.25rem',
    letterSpacing: '-.063rem',
  },
  '.text-h2': {
    fontFamily: "'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '3rem',
    lineHeight: '3.5rem',
    letterSpacing: '-.063rem',
  },
  '.text-h3': {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: '2.5rem',
    letterSpacing: '-.063rem',
  },
  '.text-h4': {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: '2rem',
  },
  '.text-h5': {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  '.text-h6': {
    fontFamily: "'Inter', sans-serif",
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: '.875rem',
    lineHeight: '1.25rem',
  },
  '.text-body-lg': {
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 400,
  },
  '.text-body-md': {
    fontFamily: "'Inter', sans-serif",
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    fontWeight: 400,
  },
  '.text-body-sm': {
    fontFamily: "'Inter', sans-serif",
    fontSize: '.75rem',
    lineHeight: '1.125rem',
    fontWeight: 400,
  },
};

module.exports = {
  ...typography,

  // heavy variants

  '.text-heavy': {
    fontWeight: 600
  },
  '.text-body-sm-heavy': {
    ...typography['.text-body-sm'],
    fontWeight: 600,
  },
  '.text-body-md-heavy': {
    ...typography['.text-body-md'],
    fontWeight: 600,
  },
  '.text-body-lg-heavy': {
    ...typography['.text-body-lg'],
    fontWeight: 600,
  },
};
