package com.homefarm.service;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.hash.Hashing;
import com.homefarm.domain.User;
import com.homefarm.repository.IUserRepository;

@Service
public class UserService {

	@Autowired
	private IUserRepository iUserRepository;
	
	public User userLoggedIn(User user) {		
		String passsha256 = Hashing.sha256().hashString(user.getPass(), StandardCharsets.UTF_8).toString();
		
		try {
			User userInDatabase = findByEmail(user.getEmail());
			
			if(passsha256.equals(userInDatabase.getPass())) {
				userInDatabase.setPass("");
				
				return userInDatabase;
			}
		} catch (Exception e) {
			return null;
		}
		
		return null;
	}
	
	public User findByEmail(String email) {
		return iUserRepository.findByEmail(email);
	}
	
}