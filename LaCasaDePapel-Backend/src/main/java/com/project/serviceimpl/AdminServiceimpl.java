package com.project.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.entity.Admin;
import com.project.exception.UserNotFoundException;
import com.project.repository.AdminRepository;
import com.project.service.AdminService;

@Service
public class AdminServiceimpl implements AdminService {
	@Autowired
    private final AdminRepository adminRepository;
	
	public AdminServiceimpl(AdminRepository adminRepository) {
		this.adminRepository=adminRepository;
	}

	  @Override
	    public Admin createAdmin(Admin admin) {
	        Admin existingAdmin = adminRepository.findByUsername(admin.getUsername());
	        if (existingAdmin != null) {
	            throw new UserNotFoundException("Username already exists.");
	        }

	        return adminRepository.save(admin);
	    }

	@Override
	public Admin loginAdmin(String username, String pass) {
		Admin adminLogin = adminRepository.findByUsernameAndPass(username, pass);
        if (adminLogin == null) {
            throw new UserNotFoundException("Invalid username or password");
        }
        return adminLogin;
    }

		
	}
	