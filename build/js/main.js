'use strict';

(function () {

  var accordions = document.querySelectorAll('.accordion');
  var accordionButtons = document.querySelectorAll('.accordion__button');
  var accordionsNojs = document.querySelectorAll('.accordion--nojs');

  if (accordionsNojs) {
    accordionsNojs.forEach(function (item) {
      item.classList.remove('accordion--nojs');
    });
  }

  if (accordionButtons) {
    accordionButtons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        var parent = item.parentNode;
        var activeButton = document.querySelector('.accordion__button--active');
        var button = evt.target;

        if (activeButton) {
          activeButton.classList.remove('accordion__button--active');
        }
        button.classList.toggle('accordion__button--active');

        if (parent.classList.contains('accordion--active')) {
          parent.classList.remove('accordion--active');
          button.classList.remove('accordion__button--active');
        } else {
          for (var j = 0; j < accordions.length; j++) {
            accordions[j].classList.remove('accordion--active');
          }
          parent.classList.add('accordion--active');
        }
      });
    });
  }

  var modalLink = document.querySelector('.main-nav__button');
  var feedbackPopup = document.querySelector('.modal-overlay');
  var modalClose = document.querySelector('.modal__close');
  var userName = document.querySelector('input[data-text-input]');
  var modalForm = document.querySelector('.modal__form');
  var userPhone = document.querySelector('input[data-tel-input]');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('login');
  } catch (err) {
    isStorageSupport = false;
  }

  if (modalLink) {
    modalLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      feedbackPopup.classList.add('modal__show');

      if (storage) {
        userName.value = storage;
        userPhone.focus();
      } else {
        userName.focus();
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', function (evt) {
      evt.preventDefault();
      feedbackPopup.classList.remove('modal__show');
      feedbackPopup.classList.remove('modal__error');
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', function (evt) {
      if (!userName.value || !userPhone.value) {
        evt.preventDefault();
        feedbackPopup.classList.remove('modal__error');
        feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
        feedbackPopup.classList.add('modal__error');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('login', userName.value);
        }
      }
    });
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (feedbackPopup.classList.contains('modal__show')) {
        evt.preventDefault();
        feedbackPopup.classList.remove('modal__show');
        feedbackPopup.classList.remove('modal__error');
      }
    }
  });

  var phoneInputs = document.querySelectorAll('input[data-tel-input]');

  if (phoneInputs) {
    var getInputNumbersValue = function (input) {
      return input.value.replace(/\D/g, '');
    };

    var onPhoneInput = function (e) {
      var input = e.target;
      var inputNumbersValue = getInputNumbersValue(input);
      var formattedInputValue = '';

      if (!inputNumbersValue) {
        input.value = '';
        return;
      }

      if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] === '9') {
          inputNumbersValue = '7' + inputNumbersValue;
        }
        var firstSymbols = (inputNumbersValue[0] === '8') ? '8' : '+7';
        formattedInputValue = firstSymbols + ' ';
        if (inputNumbersValue.length > 1) {
          formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
        }
        if (inputNumbersValue.length >= 5) {
          formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
        }
        if (inputNumbersValue.length >= 8) {
          formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
        }
        if (inputNumbersValue.length >= 10) {
          formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
        }
      } else {
        // not russian
        formattedInputValue = '+7' + inputNumbersValue.substring(0, 10);
      }
      input.value = formattedInputValue;
    };

    var onPhoneKeyDown = function (e) {
      var input = e.target;
      if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
        input.value = '';
      }
    };

    for (var i = 0; i < phoneInputs.length; i++) {
      var input = phoneInputs[i];
      input.addEventListener('focus', function (evt) {
        evt.target.value = '+7 (';
      });
      input.addEventListener('input', onPhoneInput);
      input.addEventListener('keydown', onPhoneKeyDown);
    }
  }
})();
