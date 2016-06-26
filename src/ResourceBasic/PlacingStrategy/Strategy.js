'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('lodash');

var State = require('../Primitive/State/State.js');

var transform = (first, second) => {
  var transcript = {};
  if (!second) {
    var _first$match = first.match(/(\S*)=>(\S*)/);

    var _first$match2 = _slicedToArray(_first$match, 3);

    transcript.oldone = _first$match2[1];
    transcript.newbee = _first$match2[2];

    transcript.code = first;

    return transcript;
  };

  var first_str = first instanceof State ? first.mark : first;
  var second_str = second instanceof State ? second.mark : second;

  transcript.newbee = first_str;
  transcript.oldone = second_str;
  transcript.code = `${ first_str }=>${ second_str }`;

  return transcript;
};

const ALL = transform('*', '*');

class Strategy {
  constructor(based_on) {
    this.actions = !based_on ? {} : _.clone(based_on.actions, true);
  }
  all(fn) {
    this.actions[ALL.code] = fn;

    return this;
  }
  except() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var fn = args.splice(-1)[0];
    var transcript = transform(...args);

    this.actions[transcript.code] = fn;

    return this;
  }
  getStrategy() {
    var transcript = transform(...arguments);

    if (this.actions.hasOwnProperty(transcript.code)) {
      return this.actions[transcript.code];
    }

    var anyInClass = transform(transcript.newbee, '*');

    if (this.actions.hasOwnProperty(anyInClass.code)) {
      return this.actions[anyInClass.code];
    }

    var anyWithOldone = transform('*', transcript.oldone);

    if (this.actions.hasOwnProperty(anyWithOldone.code)) {
      return this.actions[anyWithOldone.code];
    }

    if (this.actions.hasOwnProperty(ALL.code)) {
      return this.actions[ALL.code];
    }

    return false;
  }
}

module.exports = Strategy;