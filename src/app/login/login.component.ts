import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data = "your perfect banking partner"
  data1 = "Enter ac no"

  // acno=" " or
  

  // userDetails: any = {
  //   1000: { username: "anu", acno: 1000, password: "qwerty", balance: 0 },
  //   1001: { username: "amal", acno: 1001, password: "xcv", balance: 0 },
  //   1003: { username: "arun", acno: 1003, password: "567", balance: 0 },
  //   1004: { username: "mega", acno: 1004, password: "ccc", balance: 0 }


  // }
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }  //dependancy injection
  ngOnInit():void {

  }

    loginForm=this.fb.group({
      acno:['',[Validators.required,Validators.pattern('[0-9]+[]')]],
      psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]')]]
    })


  // login() {
  //   // alert('login worked')
  // var acnum = this.acno //repeated this call makes the code lengthy
  //   var userDetails: any = this.ds.userDetails
  // var psw = this.psw
  //   if (acnum in userDetails) {
  //     if (psw == userDetails[acnum]["password"]) {
  //       alert('login succes')
  //       //redirection
  //       this.router.navigateByUrl("dashboard")
  //     }
  //     else {
  //       alert('incurrect password')
  //     }
  //   }
  //   else {
  //     alert('incurrect ac no')
  //   

  login(){
    var acnum=this.loginForm.value.acno
    var psw=this.loginForm.value.psw
    if(this.loginForm.valid){
      const result=this.ds.login(acnum,psw)
    if(result){
      alert("login success")
      this.router.navigateByUrl("dashboard")
    }
    else{
      alert("incorrect acno or password")
    }
    }
    else{
      alert('invalid form')
    }
    
  }


}
