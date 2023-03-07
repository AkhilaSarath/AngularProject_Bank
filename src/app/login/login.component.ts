import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data = "your perfect banking partner"
  data1 = "Enter ac no"

  // acno=" " or
  acno: any
  psword: any

  userDetails: any = {
    1000: { username: "anu", acno: 1000, password: "qwerty", balance: 0 },
    1001: { username: "amal", acno: 1001, password: "xcv", balance: 0 },
    1003: { username: "arun", acno: 1003, password: "567", balance: 0 },
    1004: { username: "mega", acno: 1004, password: "ccc", balance: 0 }


  }


  login() {
    // alert('login worked')
    var acnum = this.acno //repeated this call makes the code lengthy
    var userDetails: any = this.userDetails
    var psword = this.psword
    if (acnum in userDetails) {
      if (psword == userDetails[acnum]["password"]) {
        alert('login succes')
      }
      else {
        alert('incurrect password')
      }
    }
    else {
      alert('incurrect ac no')
    }
  }

  acnoChange(event: any) {  //argument must be event
    // console.log(event.target.value);
    this.acno = event.target.value  //when there is no data every time this must be declared as instance

    console.log(this.acno)

  }
  pswordChange(event: any) {
    this.psword = event.target.value
    console.log(this.psword)
  }
}
