var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * -------------------------------------------------------
 * Word by Word Unmasking Animation
 * -------------------------------------------------------
 *
 * Text animation effect to slide up and unmask each word.
 * Type in the input to see new copy and animation.
 *
 */

function spanifyWithDelay(string) {
    // so this just adds a bunch of spans with a
    // delay necessary for the animation effect.

    var delay = 0.04;

    return string.trim().split(' ').map(function (word, idx) {
        return '<span>\n                <span style="transition-delay: ' + idx * delay + 's">\n                    ' + word + '\n                </span>\n            </span>';
    }).reduce(function (acc, val) {
        return acc + val;
    }, '');
}

var Title = function (_React$Component) {
    _inherits(Title, _React$Component);

    function Title() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Title);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Title.__proto__ || Object.getPrototypeOf(Title)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            animate: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Title, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // this just add the class to trigger the animation
            // ideally this would be in a transition group
            // or use some other way to trigger the class.

            setTimeout(function () {
                _this2.setState(function () {
                    return {
                        animate: true
                    };
                });
            }, 500);
        }
    }, {
        key: 'render',
        value: function render() {
            var title = this.props.title;
            var animate = this.state.animate;

            // NOTE: Class "animate" triggers the animation
            // when the "animate" state it true.

            return React.createElement('h1', {
                className: classNames('title', { animate: animate }),
                dangerouslySetInnerHTML: { __html: spanifyWithDelay(title) }
            });
        }
    }]);

    return Title;
}(React.Component);

var Input = function (_React$Component2) {
    _inherits(Input, _React$Component2);

    function Input() {
        _classCallCheck(this, Input);

        return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    _createClass(Input, [{
        key: 'render',
        value: function render() {
            return React.createElement('input', {
                className: 'input',
                type: 'text',
                onChange: this.props.onChange,
                placeholder: 'Type Here'
            });
        }
    }]);

    return Input;
}(React.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
        var _ref2;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, App);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref2 = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref2, [this].concat(args))), _this4), _this4.state = {
            value: 'Effect For Word By Word Unmasking Animation'
        }, _this4.handleChange = function (_ref3) {
            var currentTarget = _ref3.currentTarget;

            _this4.setState({
                value: currentTarget.value
            });
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'main',
                null,
                React.createElement(Input, { onChange: this.handleChange }),
                React.createElement(Title, { key: this.state.value, title: this.state.value })
            );
        }
    }]);

    return App;
}(React.Component);

var run = function run() {
    var root = document.getElementById('root');

    ReactDOM.render(React.createElement(App, null), root);
};

run();

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (!arg) continue;

        var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwnProperty.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}