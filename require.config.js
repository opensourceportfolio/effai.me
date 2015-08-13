requirejs.config({
    'baseUrl': 'dist',
    'paths': {
      'jquery': 'lib/jquery'
    }
});

requirejs(['app']);
