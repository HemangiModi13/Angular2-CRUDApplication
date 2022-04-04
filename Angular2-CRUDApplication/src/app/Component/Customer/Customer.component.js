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
var forms_1 = require("@angular/forms");
var customer_service_1 = require("../../Services/customer.service");
var common_service_1 = require("../../Services/common.service");
var global_1 = require("../../Shared/global");
var ngx_toastr_1 = require("ngx-toastr");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(_customerService, _commonService, _toastrService, fb) {
        this._customerService = _customerService;
        this._commonService = _commonService;
        this._toastrService = _toastrService;
        this.fb = fb;
        //Declare CustomerList Array as type of Customer Class Model
        this.Loadershow = false;
        this.ModelLable = "Add Record";
        this.IsValid = true;
        this.formData = new FormData();
        this.InitialCustomer();
        this.frmCustomer = this.fb.group({
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            Email: ['', forms_1.Validators.required],
            Password: ['', forms_1.Validators.required],
            PhoneNo: ['', forms_1.Validators.required],
            ConfirmPassword: ['', forms_1.Validators.required],
            Country: ['', forms_1.Validators.required],
            State: ['', forms_1.Validators.required],
            City: ['', forms_1.Validators.required]
            //Picture: ['', Validators.required]
        });
    }
    ;
    CustomerComponent.prototype.fileChange = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            //this.ImagePreview = event.target.result;
            var file = fileList[0];
            var fileExtenstion = file.type.split('/');
            if (fileExtenstion[1].toLowerCase() == "png" || fileExtenstion[1].toLowerCase() == "img" || fileExtenstion[1].toLowerCase() == "jpg" || fileExtenstion[1].toLowerCase() == "jpeg") {
                this.formData.append("uploadFile", file, file.name);
                // Image Preview
                var reader = new FileReader();
                reader.onload = function (event) {
                    _this.ImagePreview = reader.result;
                };
                reader.readAsDataURL(event.target.files[0]);
            }
            else {
                this._toastrService.error('Please Select Only Images', 'Imaeg');
                this.fileUpload.nativeElement.value = "";
            }
        }
    };
    CustomerComponent.prototype.ngOnInit = function () {
        this.GetCustomerList();
        this.GetCountryList();
    };
    CustomerComponent.prototype.InitialCustomer = function () {
        this.Customer_Modal = {
            firstName: "",
            lastName: "",
            iD: "",
            email: "",
            password: "",
            phoneNo: "",
            ConfirmPassword: "",
            Country: "",
            State: "",
            CIty: "",
            Picture: "",
        };
    };
    CustomerComponent.prototype.ConvertToCustomer = function (obj) {
        var _customer = {
            FirstName: obj.firstName,
            LastName: obj.lastName,
            ID: obj.iD,
            Email: obj.email,
            Password: obj.password,
            PhoneNo: obj.phoneNo,
            CountryID: obj.Country,
            StateID: obj.State,
            CityID: obj.City
        };
        return _customer;
    };
    CustomerComponent.prototype.ConvertCustomerToModel = function (obj) {
        var _customer = {
            firstName: obj.FirstName,
            lastName: obj.LastName,
            iD: obj.ID,
            email: obj.Email,
            password: obj.Password,
            phoneNo: obj.PhoneNo,
            Country: obj.CountryID,
            State: obj.StateID,
            City: obj.CityID
        };
        return _customer;
    };
    CustomerComponent.prototype.GetCustomerList = function () {
        var _this = this;
        this.Loadershow = true;
        this._customerService.GetCustomer(global_1.Global.WebUrl + "api/Customer/GetCustomerList").subscribe(function (customer) {
            _this.CustomerList = JSON.parse(customer._body);
            _this.Loadershow = false;
        }, function (error) { return _this.ErrorMessage = error; });
    };
    CustomerComponent.prototype.GetCountryList = function () {
        var _this = this;
        this._commonService.GetCountry(global_1.Global.WebUrl + "api/Customer/GetCountry").subscribe(function (common) {
            _this.CountryList = JSON.parse(common._body);
            console.log(common._body);
        });
    };
    CustomerComponent.prototype.GetStateListByCountryID = function (countryID) {
        var _this = this;
        if (countryID != "") {
            this._commonService.GetState(global_1.Global.WebUrl + "api/Customer/GetState", countryID).subscribe(function (common) {
                _this.StateList = JSON.parse(common._body);
            });
        }
        else {
            //this.StateList = null;
            //this.CityList = null;
        }
    };
    CustomerComponent.prototype.GetCityListByStateID = function (stateID) {
        var _this = this;
        if (stateID != "") {
            this._commonService.GetCity(global_1.Global.WebUrl + "api/Customer/GetCity", stateID).subscribe(function (common) {
                _this.CityList = JSON.parse(common._body);
            });
        }
        else {
            //this.CityList = null;
        }
    };
    CustomerComponent.prototype.DeleteCustomer = function (ID, Index) {
        var _this = this;
        if (confirm("Are you sure you want to delere record ?")) {
            this.Loadershow = true;
            this._customerService.DeleteCustomer(global_1.Global.WebUrl + "api/Customer/DeleteCustomer?ID=" + ID).subscribe(function (customer) {
                if (customer.status == 200) {
                    _this.CustomerList.splice(Index, 1);
                    _this.CloseModal();
                    _this.Loadershow = false;
                    _this._toastrService.success('Customer Delete Successfully!', 'Customer');
                }
                else {
                    _this.Loadershow = false;
                    _this._toastrService.error('Failed to Delete Customer!', 'Customer');
                }
            });
        }
    };
    CustomerComponent.prototype.CleanForm = function () {
        this.InitialCustomer();
    };
    CustomerComponent.prototype.SaveCustomer = function (customerData) {
        var _this = this;
        this.Loadershow = true;
        this.frmCustomer._status == "INVALID" ? this.IsValid = false : this.IsValid = true;
        if (this.IsValid == true) {
            customerData = this.ConvertToCustomer(customerData);
            var headers = new http_1.Headers();
            var options = new http_1.RequestOptions({ headers: headers });
            if (customerData.ID != null && customerData.ID != undefined && customerData.ID != 0 && customerData.ID != "") {
                var model = {
                    Modelcustomer: customerData,
                    formData: this.formData
                };
                this._customerService.UpdateCustomer(global_1.Global.WebUrl + "api/Customer/UpdateCustomer", model).subscribe(function (customer) {
                    if (customer.status == 200) {
                        _this.CloseModal();
                        _this.CleanForm();
                        _this.GetCustomerList();
                        _this._toastrService.success('Customer Update Successfully!', 'Customer');
                        _this.Loadershow = false;
                    }
                    else {
                        _this._toastrService.error('Failed to Update Customer!', 'Customer');
                        _this.Loadershow = false;
                    }
                });
            }
            else {
                var model = {
                    Modelcustomer: customerData,
                    formData: this.formData
                };
                this._customerService.SaveCustomer(global_1.Global.WebUrl + "api/Customer/SaveCustomer", model).subscribe(function (customer) {
                    if (customer.status == 200) {
                        _this.CloseModal();
                        _this.CleanForm();
                        _this.GetCustomerList();
                        _this._toastrService.success('Customer Save Successfully!', 'Customer');
                        _this.Loadershow = false;
                        //alert("Customer Save Successfully");
                        //this.GetCustomerList();
                    }
                    else {
                        _this._toastrService.error('Failed to save customer!', 'Customer');
                        _this.Loadershow = false;
                        //alert("Failed to save customer");
                    }
                });
            }
            this.frmCustomer.reset();
            this.CleanForm();
        }
        this.Loadershow = false;
    };
    CustomerComponent.prototype.EditCustomer = function (customerData) {
        var CustomerData = this.ConvertCustomerToModel(customerData);
        if (CustomerData.Country != 0) {
            this.GetStateListByCountryID(CustomerData.Country);
        }
        if (CustomerData.State != 0) {
            this.GetCityListByStateID(CustomerData.State);
        }
        this.Customer_Modal = CustomerData;
        this.ModelLable = "Edit Record";
        this.model.open();
    };
    CustomerComponent.prototype.CloseModal = function () {
        this.IsValid = true;
        this.model.close();
        this.frmCustomer.reset();
    };
    CustomerComponent.prototype.OpenModal = function () {
        this.IsValid = true;
        this.CleanForm();
        this.ModelLable = "Add Record";
        this.model.open();
        this.frmCustomer.reset();
    };
    __decorate([
        core_1.ViewChild('myModal'),
        __metadata("design:type", Object)
    ], CustomerComponent.prototype, "model", void 0);
    __decorate([
        core_1.ViewChild('btnUpload'),
        __metadata("design:type", Object)
    ], CustomerComponent.prototype, "fileUpload", void 0);
    CustomerComponent = __decorate([
        core_1.Component({
            selector: "app-Customer",
            templateUrl: 'app/Component/Customer/Customer.component.html'
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService, common_service_1.CommonService, ngx_toastr_1.ToastrService, forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=Customer.component.js.map