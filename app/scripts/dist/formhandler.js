'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  var FormHandler = function () {
    function FormHandler(selector) {
      _classCallCheck(this, FormHandler);

      if (!selector) {
        throw new Error('No selector provided');
      }
      this.$formElement = $(selector);
      if (this.$formElement.length === 0) {
        throw new Error('Could not find element with selector: ' + selector);
      }
    }

    _createClass(FormHandler, [{
      key: 'addSubmitHandler',
      set: function set(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
          event.preventDefault();

          var data = {};
          $(this).serializeArray().forEach(function (item) {
            data[item.name] = item.value;
            console.log(item.name + ' is ' + item.value);
          });
          console.log(data);
          fn(data).then(function () {
            this.reset();
            this.elements[0].focus();
          }.bind(this));
        });
      }
    }, {
      key: 'addInputHandler',
      set: function set(fn) {
        consoledev.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
          var emailAddress = event.target.value;
          var message = '';
          if (fn(emailAddress)) {
            event.target.setCustomValidity('');
          } else {
            message = emailAddress + ' is not an authorized email address!';
            event.target.setCustomValidity(message);
          }
        });
      }
    }]);

    return FormHandler;
  }();
  //export default FormHandler;


  App.FormHandler = new FormHandler();
  window.App = App;
})(window);
