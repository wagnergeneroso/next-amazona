import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    // backgroundColor: '#203040',
    '& a': {
      color: 'yellow',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: 'yellow',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  error: {
    color: 'red',
  },
  fullWidth: {
    width: '100%',
  },
});

export default useStyles;
