package com.project.service;

import java.util.List;
import com.project.entity.Transaction;
import com.project.entity.Account;


public interface AccountService {

	    Account getAccountByUserId(Integer userId);
	    Account createAccount(Account account);
	    void deposit(Long accountNum, double amount);
	    void Transaction(Long fromAccountNum, Long toAccountNum, double amount);
	    double getAccountBalance(Long accountNum);
	    List <Transaction> getTransactionHistory(Long accountNum);



}
 