import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalManager } from 'ngb-modal';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  policies:any;
  curpolicy:any[]=[];
  searchText:any = ''
  display=true;
  closeResult = '';
  updateForm: FormGroup;
  constructor(private router:Router,private modalService: NgbModal,private ds:DataService) {
    this.updateForm = new FormGroup({
      "policy_id": new FormControl('',[Validators.required]),
      "date_of_purchase": new FormControl('', [Validators.required]),
      "customer_id": new FormControl('', [Validators.required]),
      "vehicle_segment": new FormControl('', [Validators.required]),
      "premium": new FormControl('', [Validators.required,Validators.max(1000000)])
    });
   }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {

    this.getalldata()

  }

  getdata(policy:any) {
    this.updateForm.controls["policy_id"].setValue(policy['policy_id'])
    this.updateForm.controls["date_of_purchase"].setValue(policy['date_of_purchase'])
    this.updateForm.controls["customer_id"].setValue(policy['customer_id'])
    this.updateForm.controls["vehicle_segment"].setValue(policy['vehicle_segment'])
    this.updateForm.controls["premium"].setValue(policy['premium'])
  }

  inputNameValidator(event: any) {
    let k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123));
  }
  inputSearchValidator(event: any) {
    let k;
    k = event.charCode;
    return ((k > 63 && k < 91) || (k > 96 && k < 123) || k == 95 || k == 45 || k == 32 || k == 46 || (k >= 48 && k <= 57));
  }
  inputPreValidator(event: any) {
    let k;
    k = event.charCode;
    return ((k > 47 && k < 58));
    
  }

  getalldata() {
    
    this.ds.getAlldata().subscribe(
      (result: any) => {
        if (result) {
          this.policies = result['values_customer']
        }
      }, 
      (err :any) => {
        alert(err.message)
      }
      )
  }

  update() {
    if(this.updateForm.valid){
      this.ds.updateData(this.updateForm.value).subscribe(
      (result: any) => {
        if (result) {
          this.policies = result['values_customer']

        }
      }, 
      (err :any) => {
        alert(err.message)
      }
      )   

    }
    else{
        alert("Data is invalid")
    }
     
  }

}
