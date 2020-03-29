export default () => ({
  overline: {
    display: 'block',
    textAlign: 'center',
    color: '#9e9e9e',
    letterSpacing: '2px',
    fontSize: 14,
  },
  heading: {
    marginTop: -1,
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 2,
    fontWeight: 300,
    fontFamily:
    // eslint-disable-next-line max-len
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    '&:after': {
      content: '""',
      width: 24,
      height: 2,
      backgroundColor: '#ddd',
      display: 'block',
      margin: '8px auto 12px',
      borderRadius: 2,
    },
  },
  body: {
    textAlign: 'center',
    fontSize: 14,
    color: '#222',
    lineHeight: 1.75,
    margin: '0 auto',
    minHeight: "100px"
  },
});
