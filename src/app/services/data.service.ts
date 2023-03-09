import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userDetails: any = {
    1000: { username: "anu", acno: 1000, password: "qwerty", balance: 0 },
    1001: { username: "amal", acno: 1001, password: "xcv", balance: 0 },
    1003: { username: "arun", acno: 1003, password: "567", balance: 0 },
    1004: { username: "mega", acno: 1004, password: "ccc", balance: 0 }
  }

  register(acno:any,uname:any,psw:any):any{
    var userDetails=this.userDetails
    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno]={username:uname,acno,password:psw,balance:0} //acno only since key and value are same variable acno
      console.log(userDetails)
      return true
    }

  }


  constructor() { }
}
