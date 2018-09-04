(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-user/add-user.component.css":
/*!*************************************************!*\
  !*** ./src/app/add-user/add-user.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-padding-t-b {\r\n\tpadding: 15px !important;\r\n}\r\n\r\n.app-border {\r\n\tborder: 1px #ccc solid;\r\n\tborder-radius: 5px;\r\n}\r\n\r\n.app-margin-l-r {\r\n\tmargin-left: 15px;\r\n\tmargin-right: 15px;\r\n}\r\n\r\n.ng-dirty.ng-touched.ng-invalid, .ng-pristine.ng-invalid.ng-touched {\r\n\tborder-color: #dc3545!important;\r\n}"

/***/ }),

/***/ "./src/app/add-user/add-user.component.html":
/*!**************************************************!*\
  !*** ./src/app/add-user/add-user.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row justify-content-md-center align-items-center app-h-wo-footer\">\n\t\t<div class=\"col-xs-12 col-md-4 app-padding-t-b app-border app-margin-l-r\">\n\t\t\t<form #addUserForm=\"ngForm\">\n\t\t\t\t<h2 class=\"text-center text-primary display-4\">Notes</h2>\n\t\t\t\t<p class=\"lead\"><b>Registration</b></p>\n\t\t\t  <div class=\"form-group\">\n\t\t\t    <label for=\"username\">Username</label>\n\t\t\t    <input type=\"text\" class=\"form-control\" id=\"username\" aria-describedby=\"usernameHelp\" placeholder=\"\" [(ngModel)]=\"username\" required maxlength=\"72\" name=\"username\" #usernameState=\"ngModel\"\n\t\t\t    [ngClass]=\"errorClasses\">\n\t\t\t  </div>\n\t\t\t  <div class=\"form-group\">\n\t\t\t    <label for=\"password\">Password</label>\n\t\t\t    <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"\" [(ngModel)]=\"password\" required maxlength=\"72\" name=\"password\" #passwordState=\"ngModel\"\n\t\t\t    [ngClass]=\"errorClasses\">\n\t\t\t  </div>\n\t\t\t\t\n\t\t\t\t<!-- Error messages -->\n\t\t\t\t<small>\n\t\t\t\t  <p class=\"text-danger\">{{addUserError}}</p>\n\t\t\t\t  <p class=\"text-danger\" *ngIf=\"userInputError\n\t\t\t\t  \t&& (usernameState.untouched && passwordState.untouched)\">\n\t\t\t\t  \t{{userInputError}}\n\t\t\t\t  </p>\n\t\t\t\t  <p class=\"text-danger\" *ngIf=\"(usernameState.invalid\n\t\t\t\t  \t&& (usernameState.touched || passwordState.touched))\n\t\t\t\t  \t|| (passwordState.invalid &&\n\t\t\t\t  \t(usernameState.touched || passwordState.touched))\">\n\t\t\t\t  \tPlease, type your username and password\n\t\t\t\t  </p>\n\t\t\t\t</small>\n\n\t\t\t  <button type=\"submit\" [disabled]=\"(usernameState.invalid\n\t\t\t  \t&& (usernameState.touched || passwordState.touched))\n\t\t\t  \t|| (passwordState.invalid && (usernameState.touched\n\t\t\t  \t|| passwordState.touched))\"\n\t\t\t  \tclass=\"btn btn-outline-primary\" (click)=\"addUser();\">Sign up\n\t\t\t  </button>&nbsp;&nbsp;\n\t\t\t  <a routerLink=\"/login\" routerLinkActive=\"active\" class=\"btn btn-outline-danger\">Cancel</a>\n\n\t\t\t</form>\n\t\t</div>\n\t</div>\n\t<app-footer></app-footer>\n</div>\n\n"

/***/ }),

/***/ "./src/app/add-user/add-user.component.ts":
/*!************************************************!*\
  !*** ./src/app/add-user/add-user.component.ts ***!
  \************************************************/
/*! exports provided: AddUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserComponent", function() { return AddUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _error_classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error-classes */ "./src/app/error-classes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddUserComponent = /** @class */ (function () {
    function AddUserComponent(userService, conf, router) {
        this.userService = userService;
        this.conf = conf;
        this.router = router;
        this.errorClasses = new _error_classes__WEBPACK_IMPORTED_MODULE_4__["ErrorClasses"]();
    }
    AddUserComponent.prototype.ngOnInit = function () {
    };
    AddUserComponent.prototype.addUser = function () {
        var _this = this;
        // Submit button behavior like in Log in form:
        // it's not disabled, if user don't interact with form yet.
        // So, here the same check, as in login.component.ts
        if (!this.username || !this.password) {
            this.userInputError = 'Please, type your username and password';
            for (var k in this.errorClasses)
                this.errorClasses[k] = true;
            return;
        }
        this.userService.addUser(this.username, this.password)
            .subscribe(function (res) {
            _this.router.navigateByUrl('notes');
        }, function (error) {
            switch (error) {
                case 500:
                    _this.addUserError = 'Sorry, server error. Try again later';
                    break;
                case 400:
                    _this.addUserError = 'Incorrect credentials. Try other username/password';
                    break;
                case 403:
                    _this.addUserError = 'This username already exsists, please choose other one';
                    break;
                default:
                    _this.addUserError = error;
                    break;
            }
        });
        ;
    };
    AddUserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-user',
            template: __webpack_require__(/*! ./add-user.component.html */ "./src/app/add-user/add-user.component.html"),
            styles: [__webpack_require__(/*! ./add-user.component.css */ "./src/app/add-user/add-user.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AddUserComponent);
    return AddUserComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _notes_notes_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notes/notes.component */ "./src/app/notes/notes.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-user/add-user.component */ "./src/app/add-user/add-user.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var appRoutes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'notes', component: _notes_notes_component__WEBPACK_IMPORTED_MODULE_2__["NotesComponent"] },
    { path: 'adduser', component: _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_4__["AddUserComponent"] },
    { path: '', redirectTo: '/notes', pathMatch: 'full' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoutes, { useHash: true })
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid h-100\">\n\t<!-- <div class=\"row justify-content-md-center\">\n\t\t<h1 class=\"col-md-auto app-margin\">Notes app</h1>\n\t</div> -->\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.footerClass = 'footer-bottom';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/ngx-device-detector.umd.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _notes_notes_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notes/notes.component */ "./src/app/notes/notes.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./config.service */ "./src/app/config.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./add-user/add-user.component */ "./src/app/add-user/add-user.component.ts");
/* harmony import */ var _note_note_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./note/note.component */ "./src/app/note/note.component.ts");
/* harmony import */ var _contenteditable_model_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./contenteditable-model.directive */ "./src/app/contenteditable-model.directive.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _delete_account_modal_delete_account_modal_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./delete-account-modal/delete-account-modal.component */ "./src/app/delete-account-modal/delete-account-modal.component.ts");
/* harmony import */ var _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./delete-acc-confirm.service */ "./src/app/delete-acc-confirm.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















// DeleteAccConfirmService are used for coomunication
// between NotesComponent and DeleteAccountModalComponent only,
// so in that cases I have to declare DeleteAccConfirmService
// in parent's (NotesComponent) providers property of @Component
// decorator, but this does not working in my case, I think because 
// of DeleteAccountModalComponent - is a dynamic component.
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
                _notes_notes_component__WEBPACK_IMPORTED_MODULE_8__["NotesComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"],
                _add_user_add_user_component__WEBPACK_IMPORTED_MODULE_13__["AddUserComponent"],
                _note_note_component__WEBPACK_IMPORTED_MODULE_14__["NoteComponent"],
                _contenteditable_model_directive__WEBPACK_IMPORTED_MODULE_15__["ContenteditableModelDirective"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_16__["FooterComponent"],
                _delete_account_modal_delete_account_modal_component__WEBPACK_IMPORTED_MODULE_17__["DeleteAccountModalComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_10__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"].forRoot(),
                ngx_device_detector__WEBPACK_IMPORTED_MODULE_6__["DeviceDetectorModule"].forRoot()
            ],
            providers: [
                _config_service__WEBPACK_IMPORTED_MODULE_11__["ConfigService"],
                _user_service__WEBPACK_IMPORTED_MODULE_12__["UserService"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["SlicePipe"],
                _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_18__["DeleteAccConfirmService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]],
            entryComponents: [_delete_account_modal_delete_account_modal_component__WEBPACK_IMPORTED_MODULE_17__["DeleteAccountModalComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/config.service.ts":
/*!***********************************!*\
  !*** ./src/app/config.service.ts ***!
  \***********************************/
/*! exports provided: ConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConfigService = /** @class */ (function () {
    function ConfigService() {
        // serverUrl: string = 'http://localhost:3000/';
        this.serverUrl = 'https://notes12.herokuapp.com/';
        this.descMaxLength = 140;
    }
    ConfigService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ConfigService);
    return ConfigService;
}());



/***/ }),

/***/ "./src/app/contenteditable-model.directive.ts":
/*!****************************************************!*\
  !*** ./src/app/contenteditable-model.directive.ts ***!
  \****************************************************/
/*! exports provided: ContenteditableModelDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContenteditableModelDirective", function() { return ContenteditableModelDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// I found this at https://stackoverflow.com/questions/35378087/how-to-use-ngmodel-on-divs-contenteditable-in-angular2
// in tobek answer

var ContenteditableModelDirective = /** @class */ (function () {
    function ContenteditableModelDirective(elRef) {
        this.elRef = elRef;
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ContenteditableModelDirective.prototype.ngOnChanges = function (changes) {
        if (changes['model'] && changes['model'].currentValue !== this.lastViewModel) {
            this.lastViewModel = this.model;
            this.refreshView();
        }
    };
    /** This should probably be debounced. */
    ContenteditableModelDirective.prototype.onKeyUp = function () {
        var value = this.elRef.nativeElement.textContent;
        this.lastViewModel = value;
        this.update.emit(value);
    };
    ContenteditableModelDirective.prototype.refreshView = function () {
        this.elRef.nativeElement.textContent = this.model;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('appContenteditableModel'),
        __metadata("design:type", String)
    ], ContenteditableModelDirective.prototype, "model", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('appContenteditableModelChange'),
        __metadata("design:type", Object)
    ], ContenteditableModelDirective.prototype, "update", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ContenteditableModelDirective.prototype, "onKeyUp", null);
    ContenteditableModelDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appContenteditableModel]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ContenteditableModelDirective);
    return ContenteditableModelDirective;
}());



/***/ }),

/***/ "./src/app/delete-acc-confirm.service.ts":
/*!***********************************************!*\
  !*** ./src/app/delete-acc-confirm.service.ts ***!
  \***********************************************/
/*! exports provided: DeleteAccConfirmService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteAccConfirmService", function() { return DeleteAccConfirmService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DeleteAccConfirmService = /** @class */ (function () {
    function DeleteAccConfirmService() {
        this.deleteAccountConfirmed = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.deleteConfirmed$ = this.deleteAccountConfirmed.asObservable();
    }
    DeleteAccConfirmService.prototype.confirmDeleting = function () {
        this.deleteAccountConfirmed.next();
    };
    DeleteAccConfirmService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root',
        })
    ], DeleteAccConfirmService);
    return DeleteAccConfirmService;
}());



/***/ }),

/***/ "./src/app/delete-account-modal/delete-account-modal.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/delete-account-modal/delete-account-modal.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/delete-account-modal/delete-account-modal.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/delete-account-modal/delete-account-modal.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h5 class=\"modal-title\">Are you sure you want to delete account?</h5>\n</div>\n<div class=\"modal-body\">\n  <button class=\"btn btn-outline-danger\"\n\t(click)=\"delAccount(); activeModal.close()\">\n\t\tDelete account\n\t</button>&nbsp;\n\t<button class=\"btn btn-outline-primary\"\n\t(click)=\"activeModal.close()\">\n\t\tCancel\n\t</button>\n</div>\n<!-- <div class=\"modal-footer\">\n  \n</div> -->"

/***/ }),

/***/ "./src/app/delete-account-modal/delete-account-modal.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/delete-account-modal/delete-account-modal.component.ts ***!
  \************************************************************************/
/*! exports provided: DeleteAccountModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteAccountModalComponent", function() { return DeleteAccountModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../delete-acc-confirm.service */ "./src/app/delete-acc-confirm.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeleteAccountModalComponent = /** @class */ (function () {
    function DeleteAccountModalComponent(activeModal, deleteAccConfirmService) {
        this.activeModal = activeModal;
        this.deleteAccConfirmService = deleteAccConfirmService;
    }
    DeleteAccountModalComponent.prototype.delAccount = function () {
        this.deleteAccConfirmService.confirmDeleting();
    };
    DeleteAccountModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-delete-account-modal',
            template: __webpack_require__(/*! ./delete-account-modal.component.html */ "./src/app/delete-account-modal/delete-account-modal.component.html"),
            styles: [__webpack_require__(/*! ./delete-account-modal.component.css */ "./src/app/delete-account-modal/delete-account-modal.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbActiveModal"],
            _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_2__["DeleteAccConfirmService"]])
    ], DeleteAccountModalComponent);
    return DeleteAccountModalComponent;
}());



/***/ }),

/***/ "./src/app/error-classes.ts":
/*!**********************************!*\
  !*** ./src/app/error-classes.ts ***!
  \**********************************/
/*! exports provided: ErrorClasses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorClasses", function() { return ErrorClasses; });
var ErrorClasses = /** @class */ (function () {
    function ErrorClasses() {
        this['ng-dirty'] = this['ng-touched'] = this['ng-invalid'] = false;
    }
    ;
    return ErrorClasses;
}());

// Shortened syntax:
// constructor(public 'ng-dirty': boolean = false, ...) {}
// does not working, may by since literals used as property names


/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\r\n\twidth: 100%;\r\n  height: 52px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid #17a2b8;\r\n  overflow: hidden;\r\n}\r\n\r\np img {\r\n\twidth: 20px;\r\n\theight: 20px;\r\n}\r\n\r\n@media (max-width: 575px) {\r\n\r\n\tp {\r\n\t\tfont-size: .9em;\r\n\t}\r\n\r\n\tp img {\r\n\t\twidth: 18px;\r\n\t\theight: 18px;\r\n\t}\r\n}"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- TODO:\nI know, it's bad practice to place the same piece of HTML\n(every if it in form of component)\nin every template to be visible in whole applicatiaion,\nbut there are bugs with it (because of Bootstrap Carousel,\nin other cases it works great if placed in index.html\nright after <app-root>). I haven't solution to this\nproblem so far, so this awfull code will be there, till\nI solve this. -->\n<footer class=\"footer\">\n\t<div class=\"container-fluid\">\n\t\t<p class=\"text-center text-info\">\n\t\t\t<i>Alexandr Abaev&nbsp;|\tlowrydertrue@gmail.com |</i>&nbsp;\n\t\t\t<a href=\"https://github.com/abaev/notes\" target=\"_blank\">\n\t\t\t\t<img src=\"../../assets/images/GitHub-Mark-32px.png\" alt=\"\">\n\t\t\t</a>\n  \t</p>\n\t</div>\n</footer>"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-padding-t-b {\r\n\tpadding: 15px !important;\r\n}\r\n\r\n.app-border {\r\n\tborder: 1px #ccc solid;\r\n\tborder-radius: 5px;\r\n}\r\n\r\n.app-margin-l-r {\r\n\tmargin-left: 15px;\r\n\tmargin-right: 15px;\r\n}\r\n\r\n.ng-dirty.ng-touched.ng-invalid, .ng-pristine.ng-invalid.ng-touched {\r\n\tborder-color: #dc3545!important;\r\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row justify-content-md-center align-items-center app-h-wo-footer\">\n\t\t<div class=\"col-xs-12 col-md-4 app-padding-t-b app-border app-margin-l-r\">\n\t\t\t<form #loginForm=\"ngForm\">\n\t\t\t\t<h2 class=\"text-center text-primary display-4\">Notes</h2>\n\t\t\t\t<p class=\"lead\"><b>Log in</b></p>\n\t\t\t  <div class=\"form-group\">\n\t\t\t    <label for=\"username\">Username</label>\n\t\t\t    <input type=\"text\" class=\"form-control\" id=\"username\" aria-describedby=\"usernameHelp\" placeholder=\"\" [(ngModel)]=\"username\" required name=\"username\" #usernameState=\"ngModel\"\n\t\t\t    [ngClass]=\"errorClasses\">\n\t\t\t  </div>\n\t\t\t  <div class=\"form-group\">\n\t\t\t    <label for=\"password\">Password</label>\n\t\t\t    <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"\" [(ngModel)]=\"password\" required name=\"password\" #passwordState=\"ngModel\"\n\t\t\t    [ngClass]=\"errorClasses\">\n\t\t\t  </div>\n\t\t\t\t\n\t\t\t\t<!-- Error messages -->\n\t\t\t  <small>\n\t\t\t  \t<p class=\"text-danger\">{{loginError}}</p>\n  \t\t\t  <p class=\"text-danger\" *ngIf=\"userInputError\n  \t\t\t  \t&& (usernameState.untouched && passwordState.untouched)\">\n  \t\t\t  \t{{userInputError}}\n  \t\t\t  </p>\n  \t\t\t  <p class=\"text-danger\" *ngIf=\"(usernameState.invalid\n  \t\t\t  \t&& (usernameState.touched || passwordState.touched))\n  \t\t\t  \t|| (passwordState.invalid &&\n  \t\t\t  \t(usernameState.touched || passwordState.touched))\">\n  \t\t\t  \tPlease, type your username and password\n  \t\t\t  </p>\n  \t\t\t</small>\n\n\t\t\t  <button type=\"submit\" [disabled]=\"(usernameState.invalid\n\t\t\t  \t&& (usernameState.touched || passwordState.touched))\n\t\t\t  \t|| (passwordState.invalid && (usernameState.touched\n\t\t\t  \t|| passwordState.touched))\"\n\t\t\t  \tclass=\"btn btn-outline-primary\" (click)=\"login();\">\n\t\t\t  \tLog in\n\t\t\t  </button>&nbsp;&nbsp;\n\t\t\t  <a routerLink=\"/adduser\" routerLinkActive=\"active\" class=\"text-secondary\">Sign up</a>&nbsp;&nbsp;\n\t\t\t  <button type=\"submit\" class=\"btn btn-outline-primary\">\n\t\t\t  \t<img src=\"../../assets/images/12px-Google_G_Logo.png\" alt=\"\">\n\t\t\t  \tSign in with Google\n\t\t\t  </button>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n\t<app-footer></app-footer>\n</div>\n\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _error_classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error-classes */ "./src/app/error-classes.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, conf, router) {
        this.userService = userService;
        this.conf = conf;
        this.router = router;
        this.errorClasses = new _error_classes__WEBPACK_IMPORTED_MODULE_4__["ErrorClasses"]();
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // In login form Submit button is disabled if user don't filled
        // all fields, but this works only if user interacts with form.
        // (Since I guess that to show disabled Submit button to user at page
        // loaded it's bad idea). So, we should check, that user don't click
        // Subbmit at first time, before makes any actions with form.
        if (!this.username || !this.password) {
            this.userInputError = 'Please, type your username and password';
            for (var k in this.errorClasses)
                this.errorClasses[k] = true;
            return;
        }
        this.userService.login(this.username, this.password)
            .subscribe(function (res) {
            _this.router.navigateByUrl('notes');
        }, function (error) {
            switch (error) {
                case 500:
                    _this.loginError = 'Sorry, server error. Try again later';
                    break;
                case 403:
                    _this.loginError = 'Incorrect username/password';
                    break;
                case 0:
                    _this.loginError = 'Something bad happened, please try again later';
                    break;
                default:
                    _this.loginError = error;
                    break;
            }
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/note.ts":
/*!*************************!*\
  !*** ./src/app/note.ts ***!
  \*************************/
/*! exports provided: Note */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Note", function() { return Note; });
var Note = /** @class */ (function () {
    function Note() {
    }
    return Note;
}());



/***/ }),

/***/ "./src/app/note/note.component.css":
/*!*****************************************!*\
  !*** ./src/app/note/note.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-vi-note {\r\n\tbackground-color: orange;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-vi-note-empty {\r\n\tmin-height: 124px;\r\n\tbackground-color: #ffe4b3;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-ai-note {\r\n\tbackground-color: teal;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-ai-note-empty {\r\n\tmin-height: 124px;\r\n\tbackground-color: #b3d9d9;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-wal-note {\r\n\tbackground-color: #0a0;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-wal-note-empty {\r\n\tmin-height: 124px;\r\n\tbackground-color: #b3e6b3;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-l-note {\r\n\tbackground-color: silver;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-l-note-empty {\r\n\tmin-height: 124px;\r\n\tbackground-color: #ececec;\r\n\tpadding: 10px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.app-delete-icon {\r\n\tdisplay: none;\r\n\tdisplay: inline;\r\n\tposition: absolute;\r\n\tbottom: 0px;\r\n\tright: 16px;\r\n\tfont-size: 2em;\r\n\topacity: .3;\r\n}\r\n\r\ndiv:hover .app-delete-icon:hover {\r\n\topacity: 1;\r\n\tcursor: pointer;\r\n}\r\n\r\n.app-shadow {\r\n\tbox-shadow: 2px 2px 3px #ccc;\r\n\tposition: relative;\r\n}\r\n\r\n/*OMG, OMG, I DID IT WITH PURE CSS ONLY!!\r\nShowing 'Click here to add' on empty notes,\r\nand then immediately hide this message if user start to typing.\r\nBut I don't know, wy\r\ndiv.[class*=\"empty\"] p[contenteditable]::after\r\ndon't working */\r\n\r\ndiv.app-vi-note-empty p[contenteditable]::after,\r\ndiv.app-ai-note-empty p[contenteditable]::after,\r\ndiv.app-wal-note-empty p[contenteditable]::after,\r\ndiv.app-l-note-empty p[contenteditable]::after {\r\n\tcontent: 'Click here to add';\r\n\tcursor: pointer;\r\n\topacity: .3;\r\n}\r\n\r\ndiv.app-vi-note-empty p[contenteditable]:focus::after,\r\ndiv.app-ai-note-empty p[contenteditable]:focus::after,\r\ndiv.app-wal-note-empty p[contenteditable]:focus::after,\r\ndiv.app-l-note-empty p[contenteditable]:focus::after {\r\n\tcontent: '';\r\n}\r\n\r\ndiv.app-vi-note-empty button,\r\ndiv.app-ai-note-empty button,\r\ndiv.app-wal-note-empty button,\r\ndiv.app-l-note-empty button {\r\n\topacity: .3;\r\n}\r\n\r\nbutton span.material-icons {\r\n\tfont-size: 1em;\r\n}\r\n"

/***/ }),

/***/ "./src/app/note/note.component.html":
/*!******************************************!*\
  !*** ./src/app/note/note.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"h-100 app-shadow\" [ngClass]=\"(note.description || note.notificationDate) ? noteClass.noteExist : noteClass.noteEmpty\">\n\t<p contenteditable [(appContenteditableModel)]=\"note.description\"\n\t(blur)=\"updNote()\"\n\t(keydown)=\"note.description = $event.target.textContent; updNote($event)\"\n\t(paste)=\"updNote($event); note.description = $event.target.textContent\"\n\t[ngbPopover]=\"descMaxLength + ' characters maximum'\" triggers=\"manual\" #p=\"ngbPopover\"\n\t(click)=\"p.open()\"\n\tpopoverTitle=\"\"\n\tcontainer=\"body\"></p>\n\t\n\t<ng-template #popDate>\n\t\t<ngb-datepicker\n\t\t\t(select)=\"onDateSelect($event)\"\n\t\t\tautoClose=\"true\">\n\t\t</ngb-datepicker>\n\t</ng-template>\n\n\t<ng-template #popTime>\n\t\t<ngb-timepicker [spinners]=\"true\" [(ngModel)]=\"time\"></ngb-timepicker>\n\t</ng-template>\n\t\n\t<div class=\"btn-group btn-group-sm\" role=\"group\" aria-label=\"Date select\">\n\t\t\n\t\t<!-- Date and datepicker -->\n\t\t<button class=\"btn btn-outline-dark btn-sm\"\n\t\t\t[ngbPopover]=\"popDate\" container=\"body\"\n\t\t\tplacement=\"right\"\n\t\t\t(click)=\"selectDateTime()\"\n\t\t\t[disabled]=\"isDisabled()\">\n\t\t\t<span class=\"material-icons\">event</span>\n\t\t\t{{note?.notificationDate | date}}\n\t\t</button>\n\t\t\n\t\t<!-- Time and timepicker -->\n\t\t<button *ngIf=\"note.notificationDate\"\n\t\t\tclass=\"btn btn-outline-dark btn-sm\"\n\t\t\t[ngbPopover]=\"popTime\" container=\"body\"\n\t\t\tplacement=\"right\"\n\t\t\t(click)=\"selectDateTime()\"\n\t\t\t[disabled]=\"isDisabled()\">\n\t\t\t<span class=\"material-icons\">query_builder</span>\n\t\t\t{{note?.notificationDate | date: 'HH:mm'}}\n\t\t</button>\n\t\t\n\t\t<!-- Delete notification -->\n\t\t<button *ngIf=\"note.notificationDate\"\n\t\t\tclass=\"btn btn-dark btn-sm\"\n\t\t\t(click)=\"clearNotification()\"\n\t\t\t[disabled]=\"isDisabled()\">\n\t\t\t<span class=\"material-icons\">clear</span>\n\t\t</button>\n\t</div>\n\t\n\t<!-- Delete note -->\n\t<p *ngIf=\"(note.description || note.notificationDate) && !isDisabled()\" class=\"material-icons app-delete-icon\" (click)=\"delNote()\">delete</p>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/note/note.component.ts":
/*!****************************************!*\
  !*** ./src/app/note/note.component.ts ***!
  \****************************************/
/*! exports provided: NoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoteComponent", function() { return NoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../note */ "./src/app/note.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NoteComponent = /** @class */ (function () {
    function NoteComponent(configService) {
        this.configService = configService;
        this.deleteNote = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.updateNote = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectingDateTime = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.descMaxLength = this.configService.descMaxLength;
        // Needed for prevent calling updNote() twice on one event
        this.firedByUser = true;
    }
    NoteComponent.prototype.ngOnInit = function () {
        if (!this.note)
            this.note = {};
    };
    NoteComponent.prototype.delNote = function () {
        this.deleteNote.emit();
    };
    NoteComponent.prototype.updNote = function ($event) {
        // Check length of note.discription
        // and save the note if necessary (in case of blur or
        // press ENTER events)
        var _this = this;
        var keyCode;
        if ($event && $event.clipboardData) {
            // Making description not longer than this.descMaxLength
            // in case of paste from clipboard, after that just exit
            $event.preventDefault();
            $event.target.textContent = $event.clipboardData.getData('text/plain')
                .slice(0, this.descMaxLength);
            return;
        }
        // Making description not longer than this.descMaxLength
        if (this.note.description
            && this.note.description.length >= this.descMaxLength) {
            this.note.description =
                this.note.description.slice(0, this.descMaxLength);
        }
        // $event.which - for FireFox
        if ($event)
            keyCode = $event.which || $event.keyCode;
        // Emit on blur or press Enter events
        if ((!$event || keyCode == 13) && this.firedByUser) {
            // Prevent calling updNote() twice, when blur fired by
            // browser after keydown, or vice versa (keydown after blur)
            this.firedByUser = false;
            setTimeout(function () { _this.firedByUser = true; }, 500);
            this.updateNote.emit(this.note);
        }
    };
    NoteComponent.prototype.onDateSelect = function ($event) {
        // Note: this should change in the near future with
        // using native Date for all public APIs
        // Datepicker uses NgbDateStruct as a model and not the
        // native Date object. It's a simple data structure
        // with 3 fields. Also note that months start with 1
        this.note.notificationDate = new Date($event.year, $event.month - 1, $event.day);
        // Selecting was done, so set disabled = false
        // at all buttons with Date and Time Pickers
        this.selectingDateTime.emit();
        this.updNote();
    };
    NoteComponent.prototype.onTimeSelect = function () {
        console.log(this.time);
    };
    NoteComponent.prototype.clearNotification = function () {
        delete this.note.notificationDate;
        this.updNote();
    };
    NoteComponent.prototype.selectDateTime = function () {
        // Updating note.notificationDate and toggle disabled property
        // Timepicker have not select event,
        // so updating note.notificationDate here
        if (this.time) {
            var date = this.note.notificationDate;
            this.note.notificationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), this.time.hour, this.time.minute, 0, 0);
            this.updNote();
        }
        // Toggle disabled property
        if (!this.activeNote.type) {
            this.selectingDateTime.emit(this.noteSpec);
        }
        else {
            // If user don't  pick a date,
            // but press Date or Time buttons,
            // set disabled = false to all buttons
            this.selectingDateTime.emit();
        }
    };
    NoteComponent.prototype.isDisabled = function () {
        return (this.activeNote.type && (this.activeNote.type !== this.noteSpec.type))
            || (this.activeNote.index !== undefined &&
                (this.activeNote.index !== this.noteSpec.index));
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _note__WEBPACK_IMPORTED_MODULE_1__["Note"])
    ], NoteComponent.prototype, "note", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NoteComponent.prototype, "noteClass", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NoteComponent.prototype, "noteSpec", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NoteComponent.prototype, "activeNote", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NoteComponent.prototype, "deleteNote", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NoteComponent.prototype, "updateNote", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NoteComponent.prototype, "selectingDateTime", void 0);
    NoteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-note',
            template: __webpack_require__(/*! ./note.component.html */ "./src/app/note/note.component.html"),
            styles: [__webpack_require__(/*! ./note.component.css */ "./src/app/note/note.component.css")]
        }),
        __metadata("design:paramtypes", [_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"]])
    ], NoteComponent);
    return NoteComponent;
}());



/***/ }),

/***/ "./src/app/notes/notes.component.css":
/*!*******************************************!*\
  !*** ./src/app/notes/notes.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-vi-header {\r\n\tcolor: orange;\r\n}\r\n\r\n.app-ai-header {\r\n\tcolor: teal;\r\n}\r\n\r\n.app-wal-header {\r\n\tcolor: #0a0;\r\n}\r\n\r\n.app-l-header {\r\n\tcolor: silver;\r\n}\r\n\r\n.app-carousel-control {\r\n\ttop: 5%;\r\n\theight: 10%;\r\n\topacity: 1 !important;\r\n}\r\n\r\n/*Redefine Bootstrap's previous and next controls*/\r\n\r\n.app-carousel-control-prev-0 {\r\n\tbackground-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='orange' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");  \r\n}\r\n\r\n.app-carousel-control-prev-1 {\r\n\tbackground-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='teal' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");  \r\n}\r\n\r\n.app-carousel-control-prev-2 {\r\n\tbackground-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230a0' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");  \r\n}\r\n\r\n.app-carousel-control-prev-3 {\r\n\tbackground-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='silver' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");  \r\n}\r\n\r\n.app-carousel-control-next-0 {\r\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='orange' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\r\n}\r\n\r\n.app-carousel-control-next-1 {\r\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='teal' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\r\n}\r\n\r\n.app-carousel-control-next-2 {\r\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230a0' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\r\n}\r\n\r\n.app-carousel-control-next-3 {\r\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='silver' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\r\n}\r\n\r\n@media (min-width: 768px) {\r\n\r\n\tapp-note {\r\n\t\tpadding-left: 0px !important;\r\n\t}\r\n\r\n\tapp-note:first-child {\r\n\t\tpadding-left: 30px !important;\r\n\t}\r\n\r\n\tapp-note:last-child {\r\n\t\tpadding-right: 30px !important;\r\n\t}\r\n\r\n\t.app-exit-del-button {\r\n\t\tpadding-left: 15px !important;\r\n\t}\r\n\r\n\t.app-exit-del-button {\r\n\t\tpadding-right: 15px !important;\r\n\t}\r\n}\r\n\r\n@media (max-width: 767px) {\r\n\r\n\tapp-note:not(:first-child) {\r\n\t\tmargin-top: 15px;\r\n\t}\r\n}\r\n\r\n@media (max-width: 576px) {\r\n\t.app-button-delete {\r\n\t\tmargin-top: 15px !important;\r\n\t}\r\n}\r\n\r\n/*Fix align bugs inside buttons caused by Google Icon*/\r\n\r\nbutton {\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n\talign-content: center;\r\n\toverflow: hidden;\r\n}\r\n\r\nbutton p {\r\n\tdisplay: flex;\r\n\talign-content: center;\r\n\tmargin-bottom: 0px !important;\r\n\tmargin: auto auto;\r\n}\r\n\r\n/*- - - - - - -*/\r\n\r\n.app-allow-v-scroll {\r\n\t/*Allow vertical scroll and swipe left-right except iOS\r\n\t(iOS supported only touch-action: auto; or\r\n\ttouch-action: manipulation;)*/\r\n\ttouch-action: pan-y !important;\r\n}\r\n\r\n.app-allow-v-scroll-ios {\r\n\t/*Allow vertical scroll on iOS devices, but bloks swipe*/\r\n\ttouch-action: auto !important;\r\n}\r\n"

/***/ }),

/***/ "./src/app/notes/notes.component.html":
/*!********************************************!*\
  !*** ./src/app/notes/notes.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t\n\t<div *ngIf=\"notesError\" class=\"\">\n\t  <div class=\"app-h-wo-footer\">\n\t\t  <ngb-alert [dismissible]=\"false\">\n\t\t  \t<strong>{{notesError}}</strong>\n\t\t  </ngb-alert>\n\t\t  <p>\n\t\t  \tYou have to <a routerLink=\"/login\" routerLinkActive=\"active\" class=\"text-primary\">Log In</a>\n\t  \t  or you may to\n\t  \t  <a routerLink=\"/adduser\" routerLinkActive=\"active\" class=\"text-primary\">Sign up</a>\n\t\t  </p>\n\t\t</div>\n\t  <app-footer></app-footer>\n\t</div>\n\n\t<!-- Visible only larger than sm -->\n\t<div class=\"d-none d-md-block h-100\" *ngIf=\"!notesError\">\n\t\t<h2 class=\"text-center display-4 app-vi-header\">Very important</h2>\n\t\t<div class=\"row\">\n\t\t\t<app-note *ngFor=\"let note of user.notes.veryImportant;\n\t\t\tindex as i\"\n\t\t\t[note]=\"note\" \n\t\t\t[noteClass]=\"{ noteExist: 'app-vi-note',\n\t\t\t\tnoteEmpty: 'app-vi-note-empty' }\"\n\t\t\t[noteSpec]=\"{ type: 'veryImportant', index: i }\"\n\t\t\t[activeNote]=\"activeNote\"\n\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t(deleteNote)=\"onDeleteNote('veryImportant', i)\"\n\t\t\t(updateNote)=\"onUpdateNote('veryImportant', i, $event)\"\n\t\t\tclass=\"col-sm-4\"></app-note>\n\t\t</div>\n\t\t\t\n\t\t<h2 class=\"text-center display-4 app-ai-header\">Also important</h2>\n\t\t<div class=\"row\">\n\t\t\t<app-note *ngFor=\"let note of user.notes.alsoImportant;\n\t\t\tindex as i\"\n\t\t\t[note]=\"note\"\n\t\t\t[noteClass]=\"{ noteExist: 'app-ai-note',\n\t\t\t\tnoteEmpty: 'app-ai-note-empty' }\"\n\t\t\t[noteSpec]=\"{ type: 'alsoImportant', index: i }\"\n\t\t\t[activeNote]=\"activeNote\"\n\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t(deleteNote)=\"onDeleteNote('alsoImportant', i)\"\n\t\t\t(updateNote)=\"onUpdateNote('alsoImportant', i, $event)\"\n\t\t\tclass=\"col-sm-4\"></app-note>\n\t\t</div>\n\n\t\t<h2 class=\"text-center display-4 app-wal-header\">Wait a little</h2>\n\t\t<div class=\"row\">\n\t\t\t<app-note *ngFor=\"let note of user.notes.waitALittle;\n\t\t\tindex as i\"\n\t\t\t[note]=\"note\"\n\t\t\t[noteClass]=\"{ noteExist: 'app-wal-note',\n\t\t\t\tnoteEmpty: 'app-wal-note-empty' }\"\n\t\t\t[noteSpec]=\"{ type: 'waitALittle', index: i }\"\n\t\t\t[activeNote]=\"activeNote\"\n\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t(deleteNote)=\"onDeleteNote('waitALittle', i)\"\n\t\t\t(updateNote)=\"onUpdateNote('waitALittle', i, $event)\"\n\t\t\tclass=\"col-sm-4\"></app-note>\n\t\t</div>\n\n\t\t<h2 class=\"text-center display-4 app-l-header\">Later</h2>\n\t\t<div class=\"row\">\n\t\t\t<app-note *ngFor=\"let note of user.notes.later;\n\t\t\tindex as i\"\n\t\t\t[note]=\"note\"\n\t\t\t[noteClass]=\"{ noteExist: 'app-l-note',\n\t\t\t\tnoteEmpty: 'app-l-note-empty' }\"\n\t\t\t[noteSpec]=\"{ type: 'later', index: i }\"\n\t\t\t[activeNote]=\"activeNote\"\n\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t(deleteNote)=\"onDeleteNote('later', i)\"\n\t\t\t(updateNote)=\"onUpdateNote('later', i, $event)\"\n\t\t\tclass=\"col-sm-4\"></app-note>\n\t\t</div>\n\t\t\n\t\t<br> <!-- Delete account and exit buttons -->\n\t\t<div class=\"row app-exit-del-button\">\n\t\t\t<div class=\"col-xs-12 col-sm-6 col-lg-2 offset-lg-8\">\n\t\t\t\t<button class=\"btn btn-outline-primary w-100\"\n\t\t\t\t(click)=\"logout();\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class=\"app-button-text\">Exit</span>\n\t\t\t\t\t\t<span class=\"material-icons\">exit_to_app</span>\n\t\t\t\t\t</p>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-xs-12 col-sm-6 col-lg-2\">\n\t\t\t\t<button class=\"btn btn-outline-danger w-100 app-button-delete\"\n\t\t\t\t(click)=\"openModal();\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<span class=\"app-button-text\">Delete account</span>\n\t\t\t\t\t\t<span class=\"material-icons\">delete</span>\n\t\t\t\t\t</p>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t\t\n\t\t<br>\n\t\t<app-footer></app-footer>\n\t</div>\n\n\t<!-- Visible as carousel only on xs and sm -->\n\t<!-- Here I used original Bootstrap Carousel,\n\tbecause i need customize navigation arrows\n\t(a and span elements), but it's are not in the\n\tHTML template of ng-bootstrap Carousel Conponent\n\t(Angular Bootstrap generates these elements in a runtime) -->\n\n\t<!-- .app-allow-v-scroll needs to allow horizontal swipe event and keep vertical scroll on mobiles (except iOS) - without it vertical scroll does not working -->\n\t\n\t<!-- TODO: Don't use swipe since issue with scroll in Safari for awhile\n\tDelete this, problem were not solved.\n\tIf though decide returnswipe pay attention to .h-100, .app-h-wo-footer for footer being in the right place-->\n\t\n\t<!-- <div class=\"d-block d-md-none app-h-wo-footer app-allow-v-scroll\"\n\t[ngClass]=\"{'app-allow-v-scroll': !isIOS, 'app-allow-v-scroll-ios': isIOS}\"\n\t*ngIf=\"!notesError\">\n\t\t<div id=\"carouselNotes\" class=\"carousel slide app-allow-v-scroll\"\n\t\t[ngClass]=\"{'app-allow-v-scroll': !isIOS, 'app-allow-v-scroll-ios': isIOS}\"\n\t\tdata-ride=\"carousel\" data-interval=\"false\"\n\t\t(swipeleft)=\"onSwipe('carousel-control-next')\"\n    (swiperight)=\"onSwipe('carousel-control-prev')\"> -->\n\t\n\t<div class=\"d-block d-md-none\"\n\t*ngIf=\"!notesError\">\n\t\t<div class=\"app-h-wo-footer\">\n\t\t\t<div id=\"carouselNotes\" class=\"carousel slide\"\n\t\t\tdata-ride=\"carousel\" data-interval=\"false\">\n\t\t\t  <div class=\"carousel-inner\">\n\t\t\t    <div class=\"carousel-item active\">\n\t\t\t      <h2 class=\"text-center display-4 app-vi-header app-line-break\">Very<br>important</h2>\n\t\t\t\t\t\t<div class=\"row d-block w-100 no-gutters\">\n\t\t\t\t\t\t\t<app-note *ngFor=\"let note of user.notes.veryImportant;\n\t\t\t\t\t\t\tindex as i\"\n\t\t\t\t\t\t\t[note]=\"note\"\n\t\t\t\t\t\t\t[noteClass]=\"{ noteExist: 'app-vi-note',\n\t\t\t\t\t\t\t\tnoteEmpty: 'app-vi-note-empty' }\"\n\t\t\t\t\t\t\t[noteSpec]=\"{ type: 'veryImportant', index: i }\"\n\t\t\t\t\t\t\t[activeNote]=\"activeNote\"\n\t\t\t\t\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\" \n\t\t\t\t\t\t\t(deleteNote)=\"onDeleteNote('veryImportant', i)\"\n\t\t\t\t\t\t\t(updateNote)=\"onUpdateNote('veryImportant', i, $event)\"\n\t\t\t\t\t\t\tclass=\"col-md-4 d-block w-100\"></app-note>\n\t\t\t\t\t\t</div>\n\t\t\t    </div>\n\t\t\t    <div class=\"carousel-item\">\n\t\t\t      <h2 class=\"text-center display-4 app-ai-header\">Also<br>important</h2>\n\t\t\t\t\t\t<div class=\"row d-block w-100 no-gutters\">\n\t\t\t\t\t\t\t<app-note *ngFor=\"let note of user.notes.alsoImportant;\n\t\t\t\t\t\t\tindex as i\"\n\t\t\t\t\t\t\t[note]=\"note\"\n\t\t\t\t\t\t\t[noteClass]=\"{ noteExist: 'app-ai-note',\n\t\t\t\t\t\t\t\tnoteEmpty: 'app-ai-note-empty' }\"\n\t\t\t\t\t\t\t[noteSpec]=\"{ type: 'alsoImportant', index: i }\"\n\t\t\t\t\t\t\t[activeNote]=\"activeNote\"\n\t\t\t\t\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t\t\t\t\t(deleteNote)=\"onDeleteNote('alsoImportant', i)\"\n\t\t\t\t\t\t\t(updateNote)=\"onUpdateNote('alsoImportant', i, $event)\"\n\t\t\t\t\t\t\tclass=\"col-md-4 d-block w-100\"></app-note>\n\t\t\t\t\t\t</div>\n\t\t\t    </div>\n\t\t\t    <div class=\"carousel-item\">\n\t\t\t      <h2 class=\"text-center display-4 app-wal-header\">Wait<br>a little</h2>\n\t\t\t\t\t\t<div class=\"row d-block w-100 no-gutters\">\n\t\t\t\t\t\t\t<app-note *ngFor=\"let note of user.notes.waitALittle;\n\t\t\t\t\t\t\tindex as i\"\n\t\t\t\t\t\t\t[note]=\"note\"\n\t\t\t\t\t\t\t[noteClass]=\"{ noteExist: 'app-wal-note',\n\t\t\t\t\t\t\t\tnoteEmpty: 'app-wal-note-empty' }\"\n\t\t\t\t\t\t\t[noteSpec]=\"{ type: 'waitALittle', index: i }\"\n\t\t\t\t\t\t\t[activeNote]=\"activeNote\"\n\t\t\t\t\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t\t\t\t\t(deleteNote)=\"onDeleteNote('waitALittle', i)\"\n\t\t\t\t\t\t\t(updateNote)=\"onUpdateNote('waitALittle', i, $event)\"\n\t\t\t\t\t\t\tclass=\"col-md-4 d-block w-100\"></app-note>\n\t\t\t\t\t\t</div>\n\t\t\t    </div>\n\t\t\t    <div class=\"carousel-item\">\n\t\t\t    \t<h2 class=\"text-center display-4 app-l-header\">Later</h2>\n\t\t\t\t\t\t<div class=\"row d-block w-100 no-gutters\">\n\t\t\t\t\t\t\t<app-note *ngFor=\"let note of user.notes.later;\n\t\t\t\t\t\t\tindex as i\"\n\t\t\t\t\t\t\t[note]=\"note\"\n\t\t\t\t\t\t\t[noteClass]=\"{ noteExist: 'app-l-note',\n\t\t\t\t\t\t\t\tnoteEmpty: 'app-l-note-empty' }\"\n\t\t\t\t\t\t\t[noteSpec]=\"{ type: 'later', index: i }\"\n\t\t\t\t\t\t\t[activeNote]=\"activeNote\"\n\t\t\t\t\t\t\t(selectingDateTime)=\"onDateTimeSelect($event)\"\n\t\t\t\t\t\t\t(deleteNote)=\"onDeleteNote('later', i)\"\n\t\t\t\t\t\t\t(updateNote)=\"onUpdateNote('later', i, $event)\"\n\t\t\t\t\t\t\tclass=\"col-md-4 d-block w-100\"></app-note>\n\t\t\t\t\t\t</div>\n\t\t\t    </div>\n\t\t\t  </div>\n\t\t\t  <a class=\"carousel-control-prev app-carousel-control\" href=\"#carouselNotes\" role=\"button\" data-slide=\"prev\"\n\t\t\t  id=\"carousel-control-prev\" (click)=\"selectControlClass(-1)\">\n\t\t\t    <span class=\"carousel-control-prev-icon display-4\" aria-hidden=\"true\"\n\t\t\t    [ngClass]=\"'app-carousel-control-prev-' + currentNotesNum\"></span>\n\t\t\t    <span class=\"sr-only\">Previous</span>\n\t\t\t  </a>\n\t\t\t  <a class=\"carousel-control-next app-carousel-control\" href=\"#carouselNotes\" role=\"button\" data-slide=\"next\"\n\t\t\t  id=\"carousel-control-next\" (click)=\"selectControlClass(1)\">\n\t\t\t    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"\n\t\t\t    [ngClass]=\"'app-carousel-control-next-' + currentNotesNum\"></span>\n\t\t\t\t   <span class=\"sr-only\">Next</span>\n\t\t\t  </a>\n\t\t\t</div>\n\t\t\t\n\t\t\t<br> <!-- Delete account and exit buttons -->\n\t\t\t<div class=\"row app-exit-del-button\">\n\t\t\t\t<div class=\"col-xs-12 col-sm-6 col-lg-2 offset-lg-8\">\n\t\t\t\t\t<button class=\"btn btn-outline-primary w-100\"\n\t\t\t\t\t(click)=\"logout();\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<span class=\"app-button-text\">Exit</span>\n\t\t\t\t\t\t\t<span class=\"material-icons\">exit_to_app</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"col-xs-12 col-sm-6 col-lg-2\">\n\t\t\t\t\t<button class=\"btn btn-outline-danger w-100 app-button-delete\"\n\t\t\t\t\t(click)=\"openModal();\">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t<span class=\"app-button-text\">Delete account</span>\n\t\t\t\t\t\t\t<span class=\"material-icons\">delete</span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<br>\n\t\t<app-footer></app-footer>\n\t</div>\n</div>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/notes/notes.component.ts":
/*!******************************************!*\
  !*** ./src/app/notes/notes.component.ts ***!
  \******************************************/
/*! exports provided: NotesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotesComponent", function() { return NotesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/ngx-device-detector.umd.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ngx_device_detector__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user */ "./src/app/user.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _delete_account_modal_delete_account_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../delete-account-modal/delete-account-modal.component */ "./src/app/delete-account-modal/delete-account-modal.component.ts");
/* harmony import */ var _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../delete-acc-confirm.service */ "./src/app/delete-acc-confirm.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NotesComponent = /** @class */ (function () {
    function NotesComponent(userService, conf, router, modalService, deleteAccConfirmService, deviceService) {
        var _this = this;
        this.userService = userService;
        this.conf = conf;
        this.router = router;
        this.modalService = modalService;
        this.deleteAccConfirmService = deleteAccConfirmService;
        this.deviceService = deviceService;
        this.user = new _user__WEBPACK_IMPORTED_MODULE_4__["User"];
        deleteAccConfirmService.deleteConfirmed$.subscribe(function () {
            _this.deleteAccount();
        });
    }
    NotesComponent.prototype.ngOnInit = function () {
        // For allow vertical scroll on iOS devices
        // (but we lose swipe this way)
        this.isIOS = /ipad|iphone|ipod/i.test(this.deviceService.device);
        this.getNotes(true);
        this.currentNotesNum = 0;
        this.activeNote = {};
    };
    NotesComponent.prototype.onDeleteNote = function (noteType, index) {
        var _this = this;
        var userToSend;
        this.user.notes[noteType].splice(index, 1);
        userToSend = this.user;
        // Deleting null elements from notes arrays
        // for pass validation on server
        for (var k in userToSend.notes) {
            for (var i = 2; i >= 0; i--) {
                if (userToSend.notes[k][i] === null) {
                    userToSend.notes[k].splice(i, 1);
                }
            }
        }
        this.userService.updateUser(userToSend).subscribe(function (res) {
            _this.getNotes();
        }, function (error) { _this.notesError = _this.errorMessage(error); });
    };
    NotesComponent.prototype.onUpdateNote = function (noteType, index, note) {
        var _this = this;
        var userToSend;
        this.user.notes[noteType][index] = note;
        userToSend = this.user;
        // Deleting null elements from notes arrays
        // for pass validation on server
        for (var k in userToSend.notes) {
            for (var i = 2; i >= 0; i--) {
                if (userToSend.notes[k][i] === null) {
                    userToSend.notes[k].splice(i, 1);
                }
            }
        }
        this.userService.updateUser(userToSend).subscribe(function (res) {
            _this.getNotes();
        }, function (error) { _this.notesError = _this.errorMessage(error); });
    };
    NotesComponent.prototype.getNotes = function (isInint) {
        var _this = this;
        this.userService.getNotes().subscribe(function (res) {
            // Adding null elments to arrays while it length
            // will reach 3, for displaying empty notes to user 
            Object.keys((new _user__WEBPACK_IMPORTED_MODULE_4__["User"]()).notes).forEach(function (k) {
                if (!res.notes[k])
                    res.notes[k] = [];
                for (var i = 0; i < 3; i++) {
                    if (!res.notes[k][i])
                        res.notes[k].push(null);
                    // Transform note.notificationDate: string to
                    // note.notificationDate: Date
                    if (res.notes[k][i] && res.notes[k][i].notificationDate) {
                        res.notes[k][i].notificationDate =
                            new Date(res.notes[k][i].notificationDate);
                    }
                }
            });
            _this.user = res;
        }, function (error) {
            // In case of first attempt to load notes status 403
            // obviosly mean that user not log in yet
            if (isInint && error === 403)
                _this.router.navigateByUrl('login');
            _this.notesError = _this.errorMessage(error);
        });
    };
    NotesComponent.prototype.selectControlClass = function (m) {
        // 4 kinds of notes = 4 values
        // for this.currentNotesNum (0, 1, 2 and 3)
        // that defines class names for changing conrols
        // colors in xs carousel mode 
        var t = this.currentNotesNum + m;
        if (t < 0)
            t = 4 + m;
        this.currentNotesNum = t % 4;
    };
    // TODO: Delete this
    NotesComponent.prototype.onSwipe = function (id) {
        document.getElementById(id).click();
    };
    NotesComponent.prototype.onDateTimeSelect = function ($event) {
        // Set disable = true, to avoid
        // multiple Date or Time Pickers
        if ($event) {
            this.activeNote = {
                type: $event.type,
                index: $event.index
            };
        }
        else {
            // Selecting was done, so set disabled = false
            // at all buttons with Date and Time Pickers
            this.activeNote = {};
        }
    };
    NotesComponent.prototype.logout = function () {
        var _this = this;
        this.userService.logout().subscribe(function (res) {
            _this.router.navigateByUrl('login');
        }, function (error) {
            _this.notesError = _this.errorMessage(error);
        });
    };
    NotesComponent.prototype.deleteAccount = function () {
        var _this = this;
        this.userService.deleteAccount().subscribe(function (res) {
            _this.router.navigateByUrl('login');
        }, function (error) {
            _this.notesError = _this.errorMessage(error);
        });
    };
    NotesComponent.prototype.openModal = function () {
        var modalRef = this.modalService
            .open(_delete_account_modal_delete_account_modal_component__WEBPACK_IMPORTED_MODULE_7__["DeleteAccountModalComponent"], { centered: true });
    };
    NotesComponent.prototype.errorMessage = function (error) {
        switch (error) {
            case 500:
                return 'Sorry, server error. Try again later';
            case 403:
                return 'Forbidden';
            case 400:
                return 'Bad request';
            case 0:
                return 'Something bad happened, please try again later';
            default:
                return error;
        }
    };
    NotesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-notes',
            template: __webpack_require__(/*! ./notes.component.html */ "./src/app/notes/notes.component.html"),
            styles: [__webpack_require__(/*! ./notes.component.css */ "./src/app/notes/notes.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"],
            _config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _delete_acc_confirm_service__WEBPACK_IMPORTED_MODULE_8__["DeleteAccConfirmService"],
            ngx_device_detector__WEBPACK_IMPORTED_MODULE_3__["DeviceDetectorService"]])
    ], NotesComponent);
    return NotesComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/*!*********************************!*\
  !*** ./src/app/user.service.ts ***!
  \*********************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config.service */ "./src/app/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserService = /** @class */ (function () {
    function UserService(http, conf) {
        this.http = http;
        this.conf = conf;
    }
    UserService.prototype.login = function (username, password) {
        return this.http.post(this.conf.serverUrl + 'login', {
            username: username,
            password: password
        }, {
            withCredentials: true,
            responseType: 'text'
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.getNotes = function () {
        return this.http.get(this.conf.serverUrl + 'notes', { withCredentials: true })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.addUser = function (username, password) {
        return this.http.post(this.conf.serverUrl + 'adduser', {
            username: username,
            password: password
        }, {
            withCredentials: true,
            responseType: 'text'
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.updateUser = function (user) {
        return this.http.put(this.conf.serverUrl + 'updatenotes', user, {
            withCredentials: true,
            responseType: 'text'
            // ,
            // headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.logout = function () {
        return this.http.get(this.conf.serverUrl + 'logout', {
            withCredentials: true,
            responseType: 'text'
            // ,
            // headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.deleteAccount = function () {
        return this.http.delete(this.conf.serverUrl + 'deleteuser', {
            withCredentials: true,
            responseType: 'text'
            // ,
            // headers: new HttpHeaders({ 'Content-Type': 'application/json, text/plain, */*' })
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    UserService.prototype.handleError = function (error) {
        var message;
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            // message = 'An error occurred:'+ error.error.message
            message = 'A client-side or network error occurred';
        }
        else {
            // The backend returned an unsuccessful response code.
            // code =  error.status
            // body = error.error
            message = error.status;
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(message);
    };
    ;
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _config_service__WEBPACK_IMPORTED_MODULE_4__["ConfigService"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/user.ts":
/*!*************************!*\
  !*** ./src/app/user.ts ***!
  \*************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User() {
        this.notes = {
            veryImportant: [],
            alsoImportant: [],
            waitALittle: [],
            later: []
        };
    }
    return User;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\my_folder\_web_dev\notes\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map