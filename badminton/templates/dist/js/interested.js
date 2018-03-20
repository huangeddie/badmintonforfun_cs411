/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var react_google_login_1 = __webpack_require__(30);
var GoogleAuthButton = /** @class */ (function (_super) {
    __extends(GoogleAuthButton, _super);
    function GoogleAuthButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleAuthButton.prototype.render = function () {
        return React.createElement(react_google_login_1.GoogleLogin, { clientId: "613791656516-s7k2pbsbosa0c83o8omr0m1p1gp9q8vh.apps.googleusercontent.com", buttonText: "Login", onSuccess: this.props.onSuccess, onFailure: this.props.onFailure, disabled: false, className: "login-button" });
    };
    return GoogleAuthButton;
}(React.Component));
exports.GoogleAuthButton = GoogleAuthButton;


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(1)):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.GoogleLogin=t(require("react")):e.GoogleLogin=t(e.react)}(this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(1),u=n.n(a),s=n(2),c=(n.n(s),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),l=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.signIn=n.signIn.bind(n),n.enableButton=n.enableButton.bind(n),n.state={disabled:!0},n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.clientId,o=t.cookiePolicy,r=t.loginHint,i=t.hostedDomain,a=t.autoLoad,u=t.isSignedIn,s=t.fetchBasicProfile,c=t.redirectUri,l=t.discoveryDocs,f=t.onFailure,p=t.uxMode,d=t.scope,g=t.responseType;!function(e,t,n,o){var r=e.getElementsByTagName(t)[0],i=r,a=r;a=e.createElement(t),a.id="google-login",a.src="//apis.google.com/js/client:platform.js",i.parentNode.insertBefore(a,i),a.onload=o}(document,"script",0,function(){var t={client_id:n,cookie_policy:o,login_hint:r,hosted_domain:i,fetch_basic_profile:s,discoveryDocs:l,ux_mode:p,redirect_uri:c,scope:d};"code"===g&&(t.access_type="offline"),window.gapi.load("auth2",function(){e.enableButton(),window.gapi.auth2.getAuthInstance()||window.gapi.auth2.init(t).then(function(t){u&&t.isSignedIn.get()&&e._handleSigninSuccess(t.currentUser.get())},function(e){return f(e)}),a&&e.signIn()})})}},{key:"componentWillUnmount",value:function(){this.enableButton=function(){}}},{key:"enableButton",value:function(){this.setState({disabled:!1})}},{key:"signIn",value:function(e){var t=this;if(e&&e.preventDefault(),!this.state.disabled){var n=window.gapi.auth2.getAuthInstance(),o=this.props,r=o.onSuccess,i=o.onRequest,a=o.onFailure,u=o.prompt,s=o.responseType,c={prompt:u};i(),"code"===s?n.grantOfflineAccess(c).then(function(e){return r(e)},function(e){return a(e)}):n.signIn(c).then(function(e){return t._handleSigninSuccess(e)},function(e){return a(e)})}}},{key:"_handleSigninSuccess",value:function(e){var t=e.getBasicProfile(),n=e.getAuthResponse();e.googleId=t.getId(),e.tokenObj=n,e.tokenId=n.id_token,e.accessToken=n.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},this.props.onSuccess(e)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.type,o=e.style,r=e.className,i=e.disabledStyle,a=e.buttonText,s=e.children,c=this.state.disabled||this.props.disabled,l={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},f=function(){return o||(r&&!o?{}:l)}(),p=function(){return c?Object.assign({},f,i):f}();return u.a.createElement(t,{onClick:this.signIn,style:p,type:n,disabled:c,className:r},s||a)}}]),t}(a.Component);l.defaultProps={type:"button",tag:"button",buttonText:"Login with Google",scope:"profile email",prompt:"",cookiePolicy:"single_host_origin",fetchBasicProfile:!0,isSignedIn:!1,uxMode:"popup",disabledStyle:{opacity:.6},onRequest:function(){}},t.a=l},function(t,n){t.exports=e},function(e,t,n){"function"==typeof Symbol&&Symbol.iterator,e.exports=n(5)()},function(e,t,n){e.exports=n(4)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0);n.d(t,"default",function(){return o.a}),n.d(t,"GoogleLogin",function(){return o.a});var r=n(9);n.d(t,"GoogleLogout",function(){return r.a})},function(e,t,n){"use strict";var o=n(6),r=n(7),i=n(8);e.exports=function(){function e(e,t,n,o,a,u){u!==i&&r(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t,n){"use strict";function o(e){return function(){return e}}var r=function(){};r.thatReturns=o,r.thatReturnsFalse=o(!1),r.thatReturnsTrue=o(!0),r.thatReturnsNull=o(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";function o(e,t,n,o,i,a,u,s){if(r(t),!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,o,i,a,u,s],f=0;c=new Error(t.replace(/%s/g,function(){return l[f++]})),c.name="Invariant Violation"}throw c.framesToPop=1,c}}var r=function(e){};e.exports=o},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=n(1),u=n.n(a),s=n(2),c=(n.n(s),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),l=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={disabled:!0},n.signOut=n.signOut.bind(n),n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this;!function(e,t,n,o){var r=e.getElementsByTagName(t)[0],i=r,a=r;a=e.createElement(t),a.id="google-login",a.src="//apis.google.com/js/client:platform.js",i.parentNode.insertBefore(a,i),a.onload=o}(document,"script",0,function(){window.gapi.load("auth2",function(){e.setState({disabled:!1})})})}},{key:"signOut",value:function(){var e=window.gapi.auth2.getAuthInstance();null!=e&&e.signOut().then(this.props.onLogoutSuccess)}},{key:"render",value:function(){var e=this.props,t=e.tag,n=e.style,o=e.className,r=e.disabledStyle,i=e.buttonText,a=e.children,s=this.state.disabled||this.props.disabled,c={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},l=function(){return n||(o&&!n?{}:c)}(),f=function(){return s?Object.assign({},l,r):l}();return u.a.createElement(t,{onClick:this.signOut,style:f,disabled:s,className:o},a||i)}}]),t}(a.Component);l.defaultProps={tag:"button",buttonText:"Logout",responseType:"permission",disabledStyle:{opacity:.6},onRequest:function(){}},t.a=l}])});

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(3);
var InterestedForm_1 = __webpack_require__(35);
ReactDOM.render(React.createElement(InterestedForm_1.InterestedForm, null), document.querySelector("interest-form"));


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var GoogleAuthButton_1 = __webpack_require__(29);
var email_name = "email";
var api_url = "/mock/interested.json";
var InterestedForm = /** @class */ (function (_super) {
    __extends(InterestedForm, _super);
    function InterestedForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.resetState = _this.resetState.bind(_this);
        return _this;
    }
    InterestedForm.prototype.handleSubmit = function (response) {
        console.log(response);
        return; /*
        axios.get(api_url, {
            params: {
              email: event.target[email_name].value
            }
        })
        .then((response: any) => {
            this.setState({
                popup: <Popup title={response.data.title} message={response.data.message}
                    callback={this.resetState}/>,
            });
        })
        .catch((error: any) => {
            this.setState({
                popup: <Popup title="Sorry!" message="There was an error on our end, please check back soon"
                    callback={this.resetState}/>,
            });
        });*/
    };
    InterestedForm.prototype.resetState = function () {
        this.setState({
            popup: null
        });
    };
    InterestedForm.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "grid row row-offset-2" },
                React.createElement("div", { className: "col-offset-4 col-6" },
                    React.createElement(GoogleAuthButton_1.GoogleAuthButton, { onSuccess: this.handleSubmit, onFailure: this.handleSubmit }))),
            this.state.popup !== null && this.state.popup));
        /*(<>
        <form onSubmit={this.handleSubmit}>
        <div className="grid row-offset-2">
        <div className="row">
        <div className="col-offset-4 col-2">
            <label className="interested-label row-2">Email</label>
        </div>
        <div className="col-6">
            <input type="text" id="email" name={email_name} placeholder="netid@illinois.edu" className="interested-short-field row-2"/>
        </div>
        </div>

        <div className="row">
        <div className="col-offset-4 col-6">
            <input type="submit" value="Submit!" className="interested-submit row-offset-1 row-3" />
        </div>
        </div>
        </div>
        </form>
        { this.state.popup !== null && this.state.popup }
        </>);*/
    };
    return InterestedForm;
}(React.Component));
exports.InterestedForm = InterestedForm;


/***/ })

/******/ });
//# sourceMappingURL=interested.js.map