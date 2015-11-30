requirejs.config({
  'baseUrl': 'dist',
  'paths': {
    'jquery': 'lib/jquery',
  },
  'map': {
    '*':{
      'react': 'lib/react',
      'redux': 'lib/redux',
      'lib/jquery': 'jquery',
    },
  },
  'shim': {
    'lib/mdl': {
      'exports': 'componentHandler'
    }
  }
});

requirejs(['root']);
