requirejs.config({
  'baseUrl': 'dist',
  'paths': {
    'jquery': 'lib/jquery'
  },
  'shim': {
    'lib/mdl': {
      'exports': 'componentHandler'
    }
  }
});

requirejs(['app']);
