package com.project.serviceimpl;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.entity.Account;
import com.project.entity.Transaction;
import com.project.exception.AuthenticationException;
import com.project.exception.UserNotFoundException;
import com.project.repository.AccountRepository;
import com.project.repository.TransactionRepository;
import com.project.service.AccountService;

@Service
public class AccountServiceimpl implements AccountService {
	
     @Autowired
    private final AccountRepository accountRepository;
     @Autowired
     private TransactionRepository transactionRepository;
  
    @Autowired
    public AccountServiceimpl(AccountRepository accountRepository,TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
       this.transactionRepository=transactionRepository;
    }
    @Override
    public Account getAccountByUserId(Integer userId) {
       Account account = accountRepository.findByUserId(userId);
        if (account == null) {
            throw new UserNotFoundException("Account not found for userId: " + userId);
        }

        return account;
    }
    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }
    @Override
    public void deposit(Long accountNum, double amount) {
        Account account = accountRepository.findByAccountNum(accountNum);
        if (account == null) {
            throw new UserNotFoundException("Account not found with accountNum: " + accountNum);
        }

        double currentBalance = account.getAccountBal();
        double newBalance = currentBalance + amount;
        account.setAccountBal(newBalance);
        accountRepository.save(account);

        // Create a new Transaction entity for the deposit
        Transaction depositTransaction = new Transaction(amount, "DEPOSIT", LocalDateTime.now());

        // Set the relationship between the Transaction and the account
        depositTransaction.setAccount(account);

        // Add the deposit transaction to the transaction history of the account
        account.getTransactionHistory().add(depositTransaction);

        // Save the account to persist the changes
        accountRepository.save(account);
    }
	@Override
	public void Transaction(Long fromAccountNum, Long toAccountNum, double amount) {
	    Account fromAccount = accountRepository.findByAccountNum(fromAccountNum);
	    if (fromAccount == null) {
	        throw new UserNotFoundException("From Account not found with accountNum: " + fromAccountNum);
	    }

	    Account toAccount = accountRepository.findByAccountNum(toAccountNum);
	    if (toAccount == null) {
	        throw new UserNotFoundException("To Account not found with accountNum: " + toAccountNum);
	    }

	    if (fromAccount.getAccountBal() < amount) {
	        throw new AuthenticationException("Insufficient account balance");
	    }

	    // Create a new Transaction entity for the transfer
	    Transaction transaction = new Transaction(amount, "TRANSFER", LocalDateTime.now());

	    // Set the relationship between the Transaction and the accounts
	    transaction.setAccount(fromAccount);
	    transaction.setPreviousTransaction(null); // As it's a new transaction, it has no previous transaction

	    // Add the transaction to the transaction history of both accounts
	    fromAccount.getTransactionHistory().add(transaction);
	    toAccount.getTransactionHistory().add(transaction);

	    // Update the account balances
	    fromAccount.setAccountBal(fromAccount.getAccountBal() - amount);
	    toAccount.setAccountBal(toAccount.getAccountBal() + amount);

	    // Save both accounts to persist the changes
	    accountRepository.save(fromAccount);
	    accountRepository.save(toAccount);
	}
	@Override
	public double getAccountBalance(Long accountNum) {
		Account account = accountRepository.findByAccountNum(accountNum);
        if (account == null) {
            throw new UserNotFoundException("Account not found with accountNum: " + accountNum);
        }
        return account.getAccountBal();
    }
	@Override
    public List<Transaction> getTransactionHistory(Long accountNum) {
		return this.transactionRepository.getTransactionHistory(accountNum);
		
		/*
		 * 
		 * Account account = accountRepository.findByAccountNum(accountNum); if (account
		 * == null) { throw new
	 * UserNotFoundException("Account not found with accountNum: " + accountNum); }
		 * return account.getTransactions();
		 */
	
	}
	}

    
