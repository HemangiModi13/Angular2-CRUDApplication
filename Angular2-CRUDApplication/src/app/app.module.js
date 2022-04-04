"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var ngx_modal_1 = require("ngx-modal");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var app_component_1 = require("./app.component");
var Student_component_1 = require("./Component/Student/Student.component");
var Customer_component_1 = require("./Component/Customer/Customer.component");
var Header_component_1 = require("./Component/Header/Header.component");
var Footer_component_1 = require("./Component/Footer/Footer.component");
var loader_component_1 = require("./Component/Loader/loader.component");
//Services
var customer_service_1 = require("./Services/customer.service");
var common_service_1 = require("./Services/common.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, Student_component_1.StudentComponent, Customer_component_1.CustomerComponent, Header_component_1.HeaderComponent, Footer_component_1.FooterComponent, loader_component_1.LoaderComponent],
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, ngx_modal_1.ModalModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, animations_1.BrowserAnimationsModule, ngx_toastr_1.ToastrModule.forRoot()],
            providers: [customer_service_1.CustomerService, common_service_1.CommonService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//RouterModule.forRoot(appRoutes)
//# sourceMappingURL=app.module.js.map