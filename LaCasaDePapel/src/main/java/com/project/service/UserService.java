package com.project.service;

import java.util.List;
import com.project.entity.User;

public interface UserService {
	
	public User getUserById(Integer id);
	public User registerUser(User user);
	public void deleteUserById(Integer id);
    public User UpdateUserById(Integer id, User user);
    public List<User> getAllUsers();
    public User loginUser(User user);
     public User updateByUserName(String username, User user);
    public User updateFirstNameById( Integer id, User user);
    public User updateLastNameById( Integer id, User user);
    public User updateGenderById( Integer id, User user);
    public User updateDobById( Integer id, User user);
    public User updateEmailById( Integer id, User user);
    public User updatePasswordById( Integer id, User user);
    public User updateUsernameById(Integer id,User user);
    List<User> searchUsers(String searchText);

    
}
