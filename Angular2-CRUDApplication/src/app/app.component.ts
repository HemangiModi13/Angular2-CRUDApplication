import { Component } from '@angular/core';
import { HeaderComponent } from './Component/Header/Header.component';
import { FooterComponent } from './Component/Footer/Footer.component';
import { StudentComponent } from './Component/Student/Student.component';
import { CustomerComponent } from './Component/Customer/Customer.component';


@Component({
    selector: 'my-app',
    //template: `<router-outlet> </router-outlet>`,

    //template: `<app-Header> </app-Header>
    //        <router-outlet> </router-outlet>
    //        <app-Footer> </app-Footer>`,
    template: `<app-Header> </app-Header>
               <app-Customer> </app-Customer>
`,

})
export class AppComponent { name = 'Angular'; }
