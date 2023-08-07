package com.project.service;


import com.project.entity.Admin;


public interface AdminService {
	
	public Admin createAdmin(Admin admin);
	public Admin loginAdmin(String username, String pass);
}
