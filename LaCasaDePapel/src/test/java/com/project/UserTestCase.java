package com.project;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.project.entity.User;
import com.project.service.UserService;
@SpringBootTest
class UserTestCase {
@Autowired
private UserService userService;
 static User user=null;
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		 user=new User();
		user.setFirstName("revanth");
		user.setLastName("kumar");
		user.setGender("male");
        user.setDob("12-02-2000");
        user.setEmail("revanthk@gmail.com");
        user.setUsername("revkum");
        user.setPass("Password@123");
        user.setCpass("Password@123");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}
@Disabled
	@Test
	void testRegisterUser() {
	   assertNotNull(userService.registerUser(user));
	}
@Disabled
@Test
void testGetUserById() {
	assertNotNull(userService.getUserById(1003));
}

}
