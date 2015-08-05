requirejs.config({
    'baseUrl': 'dist',
    'paths': {
      'jquery': 'lib/jquery'
      // 'lib/react': '//cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react',
      // 'lib/jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
      // 'lib/chartist': '//cdnjs.cloudflare.com/ajax/libs/chartist/0.9.1/chartist.min',
    },
});

requirejs(['app']);
