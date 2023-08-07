package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository <Admin, Long> {
	
    public Admin findByUsername(String username);

	public Admin findByUsernameAndPass(String username,String pass); 
}
