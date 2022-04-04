import { Component, ViewChild } from '@angular/core'
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CustomerService } from '../../Services/customer.service'
import { CommonService } from '../../Services/common.service'
import { Customer } from '../../Model/Customer.model'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Global } from '../../Shared/global'
import { ModalModule } from 'ngx-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: "app-Customer",
    templateUrl: 'app/Component/Customer/Customer.component.html'
})

export class CustomerComponent {

    @ViewChild('myModal') model: any;
    @ViewChild('btnUpload') fileUpload: any;
    //Declare CustomerList Array as type of Customer Class Model
    Loadershow: boolean = false;
    CustomerList: Customer[];
    CountryList: any;
    StateList: any;
    CityList: any;
    ModelLable: string = "Add Record";
    ErrorMessage: string;
    Customer_Modal: any;
    IsValid: boolean = true;
    ImagePreview: string;
    formData: FormData = new FormData();
    //Declare  object in service 

    frmCustomer: any;  // this object for validation 
    constructor(private _customerService: CustomerService, private _commonService: CommonService, private _toastrService: ToastrService, private fb: FormBuilder) {
        this.InitialCustomer()
        this.frmCustomer  = this.fb.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Email: ['', Validators.required],
            Password: ['', Validators.required],
            PhoneNo: ['', Validators.required],
            ConfirmPassword: ['', Validators.required],
            Country: ['', Validators.required],
            State: ['', Validators.required],
            City: ['', Validators.required]
            //Picture: ['', Validators.required]
        });
    };
    fileChange(event: any) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            //this.ImagePreview = event.target.result;
            let file: File = fileList[0];
            let fileExtenstion = file.type.split('/');
            if (fileExtenstion[1].toLowerCase() == "png" || fileExtenstion[1].toLowerCase() == "img" || fileExtenstion[1].toLowerCase() == "jpg" || fileExtenstion[1].toLowerCase() == "jpeg") {
                this.formData.append("uploadFile", file, file.name)
                // Image Preview
                var reader = new FileReader();
                reader.onload = (event) => {
                    this.ImagePreview = reader.result;
                }
                reader.readAsDataURL(event.target.files[0]);
            }
            else {
                this._toastrService.error('Please Select Only Images', 'Imaeg');
                this.fileUpload.nativeElement.value = "";
            }
        }
    }

    ngOnInit(): void {

        this.GetCustomerList();
        this.GetCountryList();
    }

    InitialCustomer() {
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

        }
    }

    ConvertToCustomer(obj: any) {
        var _customer = {
            FirstName: obj.firstName,
            LastName: obj.lastName,
            ID: obj.iD,
            Email: obj.email,
            Password: obj.password,
            PhoneNo: obj.phoneNo,
            CountryID: obj.Country,
            StateID: obj.State,
            CityID : obj.City
        }
        return _customer;
    }

    ConvertCustomerToModel(obj: any) {
        var _customer = {
            firstName: obj.FirstName,
            lastName: obj.LastName,
            iD: obj.ID,
            email: obj.Email,
            password: obj.Password,
            phoneNo: obj.PhoneNo,
            Country: obj.CountryID,
            State: obj.StateID,
            City :obj.CityID
        }
        return _customer;
    }


    GetCustomerList() {
        this.Loadershow = true;
        this._customerService.GetCustomer(Global.WebUrl + "api/Customer/GetCustomerList").subscribe(customer => {
            this.CustomerList = JSON.parse(customer._body);
            this.Loadershow = false;

        }, error => this.ErrorMessage = <any>error)
    }

    GetCountryList() {
        this._commonService.GetCountry(Global.WebUrl + "api/Customer/GetCountry").subscribe(common => {
            this.CountryList = JSON.parse(common._body);
            console.log(common._body);

        })
    }

    GetStateListByCountryID(countryID) {
        if (countryID != "") {
            this._commonService.GetState(Global.WebUrl + "api/Customer/GetState", countryID).subscribe(common => {
                this.StateList = JSON.parse(common._body);
            })
        } else {
            //this.StateList = null;
            //this.CityList = null;
        }
    }
    GetCityListByStateID(stateID) {
        if (stateID != "") {
            this._commonService.GetCity(Global.WebUrl + "api/Customer/GetCity", stateID).subscribe(common => {
                this.CityList = JSON.parse(common._body);
            })
        }
        else {
            //this.CityList = null;
        }
    }



    DeleteCustomer(ID: string, Index: number) {
        if (confirm("Are you sure you want to delere record ?")) {
            this.Loadershow = true;
            this._customerService.DeleteCustomer(Global.WebUrl + "api/Customer/DeleteCustomer?ID=" + ID).subscribe(customer => {
                if (customer.status == 200) {
                    this.CustomerList.splice(Index, 1);
                    this.CloseModal();
                    this.Loadershow = false;
                    this._toastrService.success('Customer Delete Successfully!', 'Customer');
                }
                else {
                    this.Loadershow = false;
                    this._toastrService.error('Failed to Delete Customer!', 'Customer');
                }
            })
        }
    }

    CleanForm() {
        this.InitialCustomer()
    }

    SaveCustomer(customerData: any) {
        this.Loadershow = true;
        this.frmCustomer._status == "INVALID" ? this.IsValid = false : this.IsValid = true;

        if (this.IsValid == true) {
            customerData = this.ConvertToCustomer(customerData);
            let headers = new Headers()
            let options = new RequestOptions({ headers: headers });
            if (customerData.ID != null && customerData.ID != undefined && customerData.ID != 0 && customerData.ID != "") {
                var model = {
                    Modelcustomer: customerData,
                    formData:this.formData
                }
                this._customerService.UpdateCustomer(Global.WebUrl + "api/Customer/UpdateCustomer", model ).subscribe(customer => {
                    if (customer.status == 200) {
                        this.CloseModal();
                        this.CleanForm();
                        this.GetCustomerList();
                        this._toastrService.success('Customer Update Successfully!', 'Customer');
                        this.Loadershow = false;

                    }
                    else {
                        this._toastrService.error('Failed to Update Customer!', 'Customer');
                        this.Loadershow = false;
                    }
                })
            }
            else {
                var model = {
                    Modelcustomer: customerData,
                    formData: this.formData
                }
                this._customerService.SaveCustomer(Global.WebUrl + "api/Customer/SaveCustomer", model).subscribe(customer => {
                    if (customer.status == 200) {
                        this.CloseModal();
                        this.CleanForm();
                        this.GetCustomerList();
                        this._toastrService.success('Customer Save Successfully!', 'Customer');
                        this.Loadershow = false;
                        //alert("Customer Save Successfully");

                        //this.GetCustomerList();
                    }
                    else {
                        this._toastrService.error('Failed to save customer!', 'Customer');
                        this.Loadershow = false;
                        //alert("Failed to save customer");
                    }
                })
            }
            this.frmCustomer.reset();
            this.CleanForm();
        }
        this.Loadershow = false;
    }

    EditCustomer(customerData: Customer) {
      
        var CustomerData = this.ConvertCustomerToModel(customerData);
        if (CustomerData.Country != 0) {
            this.GetStateListByCountryID(CustomerData.Country);
        }
        if (CustomerData.State != 0) {
            this.GetCityListByStateID(CustomerData.State);
        }
        this.Customer_Modal = CustomerData
        this.ModelLable = "Edit Record";
        this.model.open();
    }

    CloseModal() {
        this.IsValid = true;
        this.model.close();
        this.frmCustomer.reset();
    }

    OpenModal() {
        this.IsValid = true;
        this.CleanForm();
        this.ModelLable = "Add Record"
        this.model.open();
        this.frmCustomer.reset();
    }

}
