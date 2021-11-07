'use strict';

(function () {

  var accordion = document.querySelectorAll('.accordion');
  var accordionButton = document.querySelectorAll('.accordion__button');
  var accordionNojs = document.querySelectorAll('.accordion--nojs');

  if (accordionNojs) {
    accordionNojs.forEach(function (item) {
      item.classList.remove('accordion--nojs');
    });
  }

  if (accordionButton) {
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
  }

  var phoneInputs = document.querySelectorAll('input[data-tel-input]');

  var setMask = function (input) {
    input.addEventListener('focus', function (evt) {
      if (!input.value && evt.key !== 'Backspace') {
        input.value = '+7(';
      } else {
        return;
      }
    });

    input.addEventListener('keydown', function (evt) {
      var numberLength = input.value.length;

      if (numberLength === 6 && evt.key !== 'Backspace') {
        input.value = input.value + ')';
      }
    });
  };

  if (phoneInputs) {
    for (var i = 0; i < phoneInputs.length; i++) {
      setMask(phoneInputs[i]);
    }
  }

  var modalLink = document.querySelector('.main-nav__button');
  var feedbackPopup = document.querySelector('.modal__overlay');
  var modalClose = document.querySelector('.modal-close');
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

  modalClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove('modal__show');
    feedbackPopup.classList.remove('modal__error');
  });

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

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (feedbackPopup.classList.contains('modal__show')) {
        evt.preventDefault();
        feedbackPopup.classList.remove('modal__show');
        feedbackPopup.classList.remove('modal__error');
      }
    }
  });

})();


// var phoneInputs = document.querySelectorAll('input[data-tel-input]');

// var getInputNumbersValue = function (input) {
//   return input.value.replace(/\D/g, '');
// };

// var onPhoneInput = function (e) {
//   var input = e.target;
//   var inputNumbersValue = getInputNumbersValue(input);
//   var formattedInputValue = '';

//   if (!inputNumbersValue) {
//     input.value = '';
//     return;
//   }

//   if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
//     // russian phone number
//     if (inputNumbersValue[0] === '9') inputNumbersValue = '7' + inputNumbersValue;
//     var firstSymbols = (inputNumbersValue[0] === '8') ? '8' : '+7';
//     formattedInputValue = firstSymbols + ' ';
//     if (inputNumbersValue.length > 1) {
//       formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
//     }
//     if (inputNumbersValue.length >= 5) {
//       formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
//     }
//     if (inputNumbersValue.length >= 8) {
//       formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
//     }
//     if (inputNumbersValue.length >= 10) {
//       formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
//     }
//   } else {
//     // not russian
//     formattedInputValue = '+7' + inputNumbersValue.substring(0, 10);
//   }
//   input.value = formattedInputValue;
// };

// var onPhoneKeyDown = function (e) {
//   var input = e.target;
//   if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
//     input.value = '';
//   }
// };

// for (var i = 0; i < phoneInputs.length; i++) {
//   var input = phoneInputs[i];
//   input.addEventListener('input', onPhoneInput);
//   input.addEventListener('keydown', onPhoneKeyDown);
// }
