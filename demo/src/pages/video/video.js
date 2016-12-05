"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.user = {};
        this.user.userName = '';
    }
    ContactPage.prototype.login = function () {
        if (this.user.userName == '') {
            var toast = Toast.create({
                message: '用户格式错误',
                duration: 2000
            });
            this.nav.present(toast);
        }
    };
    ContactPage = __decorate([
        core_1.Component({
            selector: 'page-contact',
            templateUrl: 'focus.html'
        })
    ], ContactPage);
    return ContactPage;
}());
exports.ContactPage = ContactPage;
//# sourceMappingURL=focus.js.map
