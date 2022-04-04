import { Routes } from '@angular/router'
import { CustomerComponent } from './Component/Customer/Customer.component'
import { StudentComponent } from './Component/Student/Student.component'
export const appRoutes: Routes = [
    {
        path: 'student',
        component: StudentComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    }
];