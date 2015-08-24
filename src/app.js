import React from 'lib/react';
import { FICalculator } from 'component/ficalculator';


(function touchFix() {
  if ('ontouchstart' in window) {
    $(document).on('focus', 'input', function() {
      $('.navbar-fixed nav').css('position', 'absolute');
    }).on('blur', 'input', function() {
      $('.navbar-fixed nav').css('position', 'fixed');
    });
  }
})();

(function requestFullscreen() {
  var body = document.documentElement;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  }
})();

React.render(
  <FICalculator />,
  document.getElementsByTagName('body')[0]
);
