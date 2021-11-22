import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
   baseUrl = environment.backendBaseUrl;

  constructor(private httpClient:HttpClient) { }


  getAlldata(){
    return this.httpClient
      .post(`${this.baseUrl}/polls/viewData/`, {})
  }


  updateData(formvalues:any){
    return this.httpClient
      .post(`${this.baseUrl}/polls/updateData/`, {formvalues})    
  }

  chartData(){
    return this.httpClient
      .post(`${this.baseUrl}/polls/chartData/`, {})    
  }


}
