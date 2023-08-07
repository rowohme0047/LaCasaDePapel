package com.project.controller;

import java.util.List;
import java.util.Map;
import com.project.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.entity.Account;
import com.project.service.AccountService;
import com.project.service.UserService;

@RestController
@RequestMapping("/api/account")
public class AccountController {
	
	private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
    }
    
    @GetMapping("/{userId}/acc")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable Integer userId) {
        Account account = accountService.getAccountByUserId(userId);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
    
    @PostMapping("/{accountNum}/deposit")
    public ResponseEntity<?> deposit(@PathVariable Long accountNum, @RequestBody double amount) {
        accountService.deposit(accountNum, amount);
        return new ResponseEntity<>("Amount Deposited successful", HttpStatus.OK);
    }
    @PostMapping("/{fromAccountNum}/transact")
    public ResponseEntity<String> Transaction(
    		@PathVariable Long fromAccountNum,
    		@RequestBody Map<String, Object> requestBody) {
    	
    	Long toAccountNum = Long.parseLong(requestBody.get("toAccountNum").toString());
        double amount = Double.parseDouble(requestBody.get("amount").toString());

        accountService.Transaction(fromAccountNum, toAccountNum, amount);
        return new ResponseEntity<>("Transaction completed successfully", HttpStatus.OK);
    }
    @GetMapping("/{accountNum}/balance")
    public ResponseEntity<Double> getAccountBalance(@PathVariable Long accountNum) {
        double balance = accountService.getAccountBalance(accountNum);
        return new ResponseEntity<>(balance, HttpStatus.OK);
    }
    @GetMapping("/{accountNum}/history")
    public List<Transaction> getTransactionHistory(@PathVariable Long accountNum) 
    {
    	System.out.println("working");
        return  accountService.getTransactionHistory(accountNum);
    
        //return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    

}
