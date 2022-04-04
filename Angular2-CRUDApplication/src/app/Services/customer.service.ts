import { Injectable } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class CustomerService {

    constructor(private http: Http) { }

    GetCustomer(url: string) {
        return this.http.get(url).map((res: Response) => {
            return <any>res;
        });
        //.catch(this.handleError);
    }

    SaveCustomer(url: string, ModelCustomer: any) {
        return this.http.post(url, ModelCustomer).map((res: Response) => { return <any>res });
    }

    UpdateCustomer(url: string, ModelCustomer: any) {
        return this.http.put(url, ModelCustomer).map((res: Response) => { return <any>res });
    }

    DeleteCustomer(url: string) {
        return this.http.delete(url).map((res: Response) => { return <any>res });
    }


    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}