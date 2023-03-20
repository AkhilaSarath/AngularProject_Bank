import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any

  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    this.user = this.ds.currentUser
  }

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]]
  })

  //whenever a page is loaded constructor works and after that ngOnInit works


  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert('please login')
      this.router.navigateByUrl("")
    }
  }
  deposit() {

    var acno = this.depositForm.value.acno
    var psw = this.depositForm.value.psw
    var amnt = this.depositForm.value.amnt
    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno, psw, amnt)
      if (result) {  //if any value other than false return it is considered as true
        alert(`your account has been credited with ${amnt}.available balance is${result}`)
      }
      else {
        alert(`incorrect acno or password`)
      }
    }
    else {
      alert('invalid form')
    }
  }

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var psw = this.withdrawForm.value.psw1
    var amnt = this.withdrawForm.value.amnt1
    if (this.withdrawForm.valid) {
      const result = this.ds.withdraw(acno, psw, amnt)
      if (result) {  //if any value other than false return it is considered as true
        alert(`your account has been debitted with ${amnt}.available balance is${result}`)
      }
      else {
        alert(`incorrect acno or password`)
      }
    }
    else {
      alert('invalid form')
    }
  }
  logout(){
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    this.router.navigateByUrl("")
  }


}

