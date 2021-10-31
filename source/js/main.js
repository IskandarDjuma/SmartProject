'use strict';

var accordion = document.querySelectorAll('.accordion');
var accordionButton = document.querySelectorAll('.accordion__button');
var accordionNojs = document.querySelectorAll('.accordion--nojs');

accordionNojs.forEach(function (item) {
  item.classList.remove('accordion--nojs');
});


accordionButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    var parent = item.parentNode;

    var button = evt.target;
    button.classList.toggle('accordion__button--active');

    if (parent.classList.contains('accordion--active')) {
      parent.classList.remove('accordion--active');
    } else {
      accordion.forEach(function (child) {
        child.classList.remove('accordion--active');
      });
      parent.classList.add('accordion--active');
    }
  });
});
