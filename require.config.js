requirejs.config({
  'baseUrl': 'dist',
  'paths': {
    'jquery': 'lib/jquery',
  },
  'map': {
    '*':{
      'react': 'lib/react',
      'lib/jquery': 'jquery',
    },
  },
  'shim': {
    'lib/mdl': {
      'exports': 'componentHandler'
    }
  }
});

requirejs(['app']);
