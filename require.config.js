requirejs.config({
  baseUrl: 'dist',
  paths: {
    'react': 'lib/react',
    'redux': 'lib/redux',
    'chartist': 'lib/chartist',
    'lib/react/react-redux': 'lib/react-redux',
    'lib/react/dom': 'lib/react-dom',
    'lib/react/router': 'lib/ReactRouter',
    'lib/chartist/axisTitle': 'lib/chartist-plugin-axistitle',
    'lib/chartist/legend': 'lib/chartist-plugin-legend',
    'lib/mdl': 'lib/material',
  },
  map: {
    '*': {
      'react': 'lib/react',
      'redux': 'lib/redux',
      'chartist': 'lib/chartist',
    },
  },
  shim: {
    'lib/mdl': {
      exports: 'componentHandler',
    }
  }
});
