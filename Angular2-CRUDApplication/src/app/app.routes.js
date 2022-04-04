"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_component_1 = require("./Component/Customer/Customer.component");
var Student_component_1 = require("./Component/Student/Student.component");
exports.appRoutes = [
    {
        path: 'student',
        component: Student_component_1.StudentComponent
    },
    {
        path: 'customer',
        component: Customer_component_1.CustomerComponent
    }
];
//# sourceMappingURL=app.routes.js.map