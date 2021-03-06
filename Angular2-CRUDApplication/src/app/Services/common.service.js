"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var CommonService = /** @class */ (function () {
    function CommonService(http) {
        this.http = http;
    }
    CommonService.prototype.GetCountry = function (url) {
        return this.http.get(url).map(function (res) {
            return res;
        });
    };
    CommonService.prototype.GetState = function (url, CountryID) {
        return this.http.get(url + "?CountryID=" + CountryID).map(function (res) {
            return res;
        });
    };
    CommonService.prototype.GetCity = function (url, StateID) {
        return this.http.get(url + "?StateID=" + StateID).map(function (res) {
            return res;
        });
    };
    CommonService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map