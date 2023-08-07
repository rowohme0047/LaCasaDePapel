package com.project.serviceimpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.entity.Account;
import com.project.entity.User;
import com.project.exception.UserNotFoundException;
import com.project.repository.UserRepository;
import com.project.service.AccountService;
import com.project.service.UserService;

@Service
public class UserServiceimpl implements UserService {
	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private AccountService accountService; 

	
    public UserServiceimpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	@Override
	public void deleteUserById(Integer id) {
		if(!userRepository.existsById(id)) {
			throw new UserNotFoundException("User Id "+id+"  doesn't exist!");
		}
		 userRepository.deleteById(id);
	}
	
	@Override
	public User UpdateUserById(Integer id, User user) {
		 User eUser = userRepository.findById(id)
				 .orElseThrow(()-> new UserNotFoundException("User Id "+id+"  doesn't exist!"));
		        eUser.setFirstName(user.getFirstName());
		        eUser.setLastName(user.getLastName());
		        eUser.setGender(user.getGender());
		        eUser.setDob(user.getDob());
		        eUser.setUsername(user.getUsername());
		        eUser.setPass(user.getPass());
		        return userRepository.save(eUser);
	}
	

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@Override
	public User getUserById(Integer id) {
		return userRepository.findById(id)
				.orElseThrow(()-> new UserNotFoundException("User Id "+id+" doesn't exist!"));
	}

	@Override
    public User loginUser(User user) {
        User loggedInUser = userRepository.findByUsernameAndPass(user.getUsername(), user.getPass());
        if (loggedInUser == null) {
            throw new UserNotFoundException("Invalid username or password");
        }
        return loggedInUser;
    }


	@Override
	public User registerUser(User user) {
		if(user.getPass().equals(user.getCpass()))
		{
			
		User savedUser = userRepository.save(user);
		Account account = new Account();
		account.setStatus(false);
	    account.setUser(savedUser);
	    accountService.createAccount(account);
	    return savedUser;
		} else {
			return null;
		}
	}


	@Override
	public User updateFirstNameById(Integer id, User user) {
		User fuser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		fuser.setFirstName(user.getFirstName());
		return userRepository.save(fuser);
	}

	@Override
	public User updateLastNameById(Integer id, User user) {
		User luser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		luser.setLastName(user.getLastName());
		return userRepository.save(luser);
	}

	@Override
	public User updateGenderById(Integer id, User user) {
		User guser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		guser.setGender(user.getGender());
		return userRepository.save(guser);
	}

	@Override
	public User updateDobById(Integer id, User user) {
		User duser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		duser.setDob(user.getDob());
		return userRepository.save(duser);
	}

	@Override
	public User updateEmailById(Integer id, User user) {
		User muser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		muser.setEmail(user.getEmail());
		return userRepository.save(muser);
	}
	 public User updateUsernameById(Integer id,User user) {
		 User uuser=userRepository.findById(id)
					.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
			uuser.setUsername(user.getUsername());
			return userRepository.save(uuser);
	 }

	@Override
	public User updatePasswordById(Integer id, User user) {
		User ppuser=userRepository.findById(id)
				.orElseThrow(()->new UserNotFoundException("User Id "+id+" doesn't exist!"));
		ppuser.setPass(user.getPass());
		ppuser.setCpass(user.getCpass());
		return userRepository.save(ppuser);
	}
	
	  @Override public User updateByUserName(String username, User user) { 
		  User puser=userRepository.findByUsername(username); 
		  if(puser==null) { 
			  throw new UserNotFoundException("Username "+username+" does not exist!"); 
			  }
	  puser.setPass(user.getPass()); 
	  puser.setCpass(user.getCpass());
	  return userRepository.save(puser); 
	  }
	  
	  @Override
	    public List<User> searchUsers(String searchText) {
	        return userRepository.findByFirstNameContainingIgnoreCase(searchText);
	  } 

}
