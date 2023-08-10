import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'http://localhost:8086/api/account';
  constructor(private http: HttpClient) {  }
  public getAccountByUserId(uId:any){
    return this.http.get(`${this.accountUrl}/${uId}/acc`);
  }
  public getBalanceByaccounNum(accountNum:any){
    return this.http.get(`${this.accountUrl}/${accountNum}/balance`);
  }
  public depositAmtToAccountNum(accountNum:any, depositA:any){
   // const httpOptions = {
   //   headers: new HttpHeaders({
   //     'Content-Type': 'application/json' 
  //  };
  
    return this.http.post(`${this.accountUrl}/${accountNum}/deposit`,depositA,{responseType:'text' as 'json'});
  }
  public transaction(accountNum:any, accountNum2:any, transferAmt:any){
    const requestBody = {
      toAccountNum: accountNum2,
      amount: transferAmt
    };
    return this.http.post(`${this.accountUrl}/${accountNum}/transact`,requestBody,{responseType:'text' as 'json'} );
  }
  public getTransactionHistory(accountNum:any): Observable<any[]>{
    return this.http.get<any[]>(`${this.accountUrl}/${accountNum}/history`)
    .pipe(
      // Format timestamp to a more readable date and time string
      map(transactions => transactions.map(transaction => {
        const timestamp = new Date(transaction.timestamp);
        const formattedTimestamp = `${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`;
        const formattedTransaction = {
          id: transaction.id,
          amount: transaction.amount,
          type: transaction.type,
          timestamp: transaction.timestamp
        };
        return formattedTransaction;
      }))
    );
}
}



