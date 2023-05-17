"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var TextXform = require('./text-xform');
var RichTextXform = require('./rich-text-xform');
var BaseXform = require('../base-xform');

// <rPh sb="0" eb="1">
//   <t>(its pronounciation in KATAKANA)</t>
// </rPh>
var PhoneticTextXform = /*#__PURE__*/function (_BaseXform) {
  _inherits(PhoneticTextXform, _BaseXform);
  var _super = _createSuper(PhoneticTextXform);
  function PhoneticTextXform() {
    var _this;
    _classCallCheck(this, PhoneticTextXform);
    _this = _super.call(this);
    _this.map = {
      r: new RichTextXform(),
      t: new TextXform()
    };
    return _this;
  }
  _createClass(PhoneticTextXform, [{
    key: "tag",
    get: function get() {
      return 'rPh';
    }
  }, {
    key: "render",
    value: function render(xmlStream, model) {
      xmlStream.openNode(this.tag, {
        sb: model.sb || 0,
        eb: model.eb || 0
      });
      if (model && model.hasOwnProperty('richText') && model.richText) {
        var r = this.map.r;
        model.richText.forEach(function (text) {
          r.render(xmlStream, text);
        });
      } else if (model) {
        this.map.t.render(xmlStream, model.text);
      }
      xmlStream.closeNode();
    }
  }, {
    key: "parseOpen",
    value: function parseOpen(node) {
      var name = node.name;
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      if (name === this.tag) {
        this.model = {
          sb: parseInt(node.attributes.sb, 10),
          eb: parseInt(node.attributes.eb, 10)
        };
        return true;
      }
      this.parser = this.map[name];
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      return false;
    }
  }, {
    key: "parseText",
    value: function parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    }
  }, {
    key: "parseClose",
    value: function parseClose(name) {
      if (this.parser) {
        if (!this.parser.parseClose(name)) {
          switch (name) {
            case 'r':
              {
                var rt = this.model.richText;
                if (!rt) {
                  rt = this.model.richText = [];
                }
                rt.push(this.parser.model);
                break;
              }
            case 't':
              this.model.text = this.parser.model;
              break;
            default:
              break;
          }
          this.parser = undefined;
        }
        return true;
      }
      switch (name) {
        case this.tag:
          return false;
        default:
          return true;
      }
    }
  }]);
  return PhoneticTextXform;
}(BaseXform);
module.exports = PhoneticTextXform;
//# sourceMappingURL=phonetic-text-xform.js.map
