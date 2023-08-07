package com.project.entity;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;


@Entity
public class Account {
    @Id
    @SequenceGenerator(name="account_sequence",
	sequenceName="account_sequence", 
	allocationSize=1,
	initialValue=111111)
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
	        generator="account_sequence")
    @Column(name="account_number")
    private Long accountNum;
    private double accountBal;
    @Column(name="account_status")
    private boolean status;

    @JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",  referencedColumnName = "id")
    private User user;
	@JsonIgnore
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List <Transaction>  transactions = new ArrayList<>();
    
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
        this.user = user;
    }

    public Account() {
        this.accountBal = 500.0; 
    }

   
    public Account(Long accountNum, double accountBal) {
        this.accountNum = accountNum;
        this.accountBal = accountBal;
    }

    public Long getAccountNum() {
        return accountNum;
    }

    public void setAccountNum(Long accountNum) {
        this.accountNum = accountNum;
    }

    public double getAccountBal() {
        return accountBal;
    }

    public void setAccountBal(double accountBal) {
        this.accountBal = accountBal;
    }
    public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public List <Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	 public List<Transaction> getTransactionHistory() {
	        return transactions;
	 }
	@Override
	public String toString() {
		return "Account [accountNum=" + accountNum + ", accountBal=" + accountBal + ", status=" + status + "]";
	}

}
