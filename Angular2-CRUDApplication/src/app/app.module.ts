import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-modal'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
    
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes'
import { StudentComponent } from './Component/Student/Student.component';
import { CustomerComponent } from './Component/Customer/Customer.component';
import { HeaderComponent } from './Component/Header/Header.component';
import { FooterComponent } from './Component/Footer/Footer.component';
import { LoaderComponent } from './Component/Loader/loader.component';

//Services
import { CustomerService } from './Services/customer.service'
import { CommonService } from './Services/common.service'

@NgModule({

    declarations: [AppComponent, StudentComponent, CustomerComponent, HeaderComponent, FooterComponent, LoaderComponent],
    imports: [BrowserModule, HttpModule, ModalModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, ToastrModule.forRoot()],
    providers: [CustomerService, CommonService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

//RouterModule.forRoot(appRoutes)
