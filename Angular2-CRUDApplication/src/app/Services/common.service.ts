import { Injectable } from '@angular/core'
import { Http, Request, Response } from '@angular/http'

@Injectable()
export class CommonService {

    constructor(private http: Http) { }

    GetCountry(url: string) {
        return this.http.get(url).map((res: Response) => {
            return <any>res;
        })
    }

    GetState(url: string, CountryID: number) {
        return this.http.get(url + "?CountryID=" + CountryID).map((res: Response) => {
            return <any>res;
        });
    }

    GetCity(url: string, StateID: number) {

        return this.http.get(url + "?StateID=" + StateID).map((res: Response) => {
            return <any>res;
        });
    }
}