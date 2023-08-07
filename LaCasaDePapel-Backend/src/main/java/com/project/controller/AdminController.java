package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.entity.Admin;
import com.project.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	@Autowired
	private final AdminService adminService;
	
	public AdminController(AdminService adminService) {
		this.adminService=adminService;
	}
	@PostMapping("/create")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    }
	
    @PostMapping("/login")
    public ResponseEntity<Admin> loginAdmin(@RequestBody Admin admin) {
        Admin loggedInAdmin = adminService.loginAdmin(admin.getUsername(), admin.getPass());
        return new ResponseEntity<>(loggedInAdmin, HttpStatus.OK);
    }
	
    }

