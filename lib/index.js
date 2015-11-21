'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _got = require('got');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _process$env = process.env;
var HIPCHAT_ROOM = _process$env.HIPCHAT_ROOM;
var HIPCHAT_TOKEN = _process$env.HIPCHAT_TOKEN;
var _process$env$HIPCHAT_ = _process$env.HIPCHAT_SERVER;
var HIPCHAT_SERVER = _process$env$HIPCHAT_ === undefined ? 'api.hipchat.com' : _process$env$HIPCHAT_;

function toMessageObject(message) {
  return typeof message === 'string' ? { message: message } : message;
}

var HipChatNotify = (function () {
  function HipChatNotify(_ref) {
    _classCallCheck(this, HipChatNotify);

    var _ref$room = _ref.room;
    var room = _ref$room === undefined ? HIPCHAT_ROOM : _ref$room;
    var _ref$token = _ref.token;
    var token = _ref$token === undefined ? HIPCHAT_TOKEN : _ref$token;
    var _ref$server = _ref.server;
    var server = _ref$server === undefined ? HIPCHAT_SERVER : _ref$server;

    if (!room) {
      throw new Error('A HipChat room must be defined!');
    }
    if (!token) {
      throw new Error('A HipChat room token must be defined!');
    }

    this.room = room;
    this.token = token;
    this.server = server;

    this.notify = this.notify.bind(this);
    this.info = this.info.bind(this);
    this.warning = this.warning.bind(this);
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  _createClass(HipChatNotify, [{
    key: 'info',
    value: function info(message, callback) {
      this.notify(_extends({ color: 'gray' }, toMessageObject(message)), callback);
    }
  }, {
    key: 'warning',
    value: function warning(message, callback) {
      this.notify(_extends({ color: 'yellow' }, toMessageObject(message)), callback);
    }
  }, {
    key: 'success',
    value: function success(message, callback) {
      this.notify(_extends({ color: 'green' }, toMessageObject(message)), callback);
    }
  }, {
    key: 'error',
    value: function error(message, callback) {
      this.notify(_extends({ color: 'red' }, toMessageObject(message)), callback);
    }
  }, {
    key: 'notify',
    value: function notify(message) {
      var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

      var body = toMessageObject(message);
      var defaults = { color: 'yellow', notify: true, message_format: /<[a-z][\s\S]*>/i.test(body.message) ? 'html' : 'text' };

      var headers = {
        'authorization': 'Bearer ' + this.token,
        'content-type': 'application/json'
      };

      (0, _got.post)('https://' + this.server + '/v2/room/' + this.room + '/notification', { body: JSON.stringify(_extends({}, defaults, body)), headers: headers }, function (err, res, _ref2) {
        var statusCode = _ref2.statusCode;

        callback(err, statusCode === 204 ? { status: 'ok' } : res);
      });
    }
  }]);

  return HipChatNotify;
})();

exports.default = HipChatNotify;
