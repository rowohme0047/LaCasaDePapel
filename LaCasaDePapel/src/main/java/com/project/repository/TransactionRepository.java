package com.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.project.entity.Transaction;
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	@Query(value="select * from transaction_table where account_num=?1",nativeQuery=true)
	 List <Transaction> getTransactionHistory(Long accountNum);
}
