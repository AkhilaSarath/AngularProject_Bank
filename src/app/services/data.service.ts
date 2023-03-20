import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    this.getDetails()
  }
  
  currentUser: any
  currentAcno:any
  userDetails:any
  // userDetails: any = {
  //   1000: { username: "anu", acno: 1000, password: "qwerty", balance: 0,transaction:[]},
  //   1001: { username: "amal", acno: 1001, password: "xcv", balance: 0,transaction:[]},
  //   1003: { username: "arun", acno: 1003, password: "567", balance: 0,transaction:[]},
  //   1004: { username: "mega", acno: 1004, password: "ccc", balance: 0,transaction:[]}
  // }


  saveDetails(){
    if(this.userDetails){
      localStorage.setItem("userDetails",JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",this.currentUser)
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }

  getDetails(){
    if(localStorage.getItem("userDetails")){
      this.userDetails=JSON.parse(localStorage.getItem("userDetails")|| "")  //here OR must be specified when we use getItem and parse together
    }
    if(localStorage.getItem("currentUser")){
      this.currentUser=localStorage.getItem("currentUser")
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
    }
    }
  

  register(acno: any, uname: any, psw: any): any {
    var userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = { username: uname, acno, password: psw, balance: 0,transaction:[] } //acno only since key and value are same variable acno
      console.log(userDetails)
      this.saveDetails()
      return true
    }

  }
  login(acno: any, psw: any) {
    var userDetails = this.userDetails
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        //store current user
        this.currentUser = userDetails[acno]["username"]
        this.currentAcno=acno
        this.saveDetails()
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
  deposit(acno: any, psw: any, amnt: any) {
    var amount = parseInt(amnt)
    var userDetails = this.userDetails
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        userDetails[acno]["balance"] += amount
        console.log(userDetails)

        //add transaction data
        userDetails[acno]["transaction"].push(
          {
            Type:"credit",
            Amount:amount
          }
        )

        this.saveDetails()

        return userDetails[acno]["balance"]

      }
      else {

        return false
      }
    }
    else {

      return false
    }
  }

  withdraw(acno: any, psw: any, amnt: any) {
    var amount = parseInt(amnt)
    var userDetails = this.userDetails
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        if(amount<=userDetails[acno]["balance"]){
          userDetails[acno]["balance"] -= amount
          // console.log(userDetails)

            //add transaction data
        userDetails[acno]["transaction"].push(
          {
            Type:"Debit",
            Amount:amount
          }
        )
        this.saveDetails()
          // console.log(userDetails)
          return userDetails[acno]["balance"]
        }
        else{
          alert("insufficient Balance")
        }
      }
      else {

        return false
      }
    }
    else {

      return false
    }
  }

  getTransaction(acno:any){
    return this.userDetails[acno].transaction
  }

 
}




