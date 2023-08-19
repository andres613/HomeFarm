package com.homefarm.repository;

import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

@Repository
public class ReadUser implements IUserOperation {

	@Override
	public UserDTO request(User userData, IUserRepository iUserRepository) {
		try {
			UserDTO userDTO = iUserRepository.findByDocument(userData.getDocument());
			
			if(Objects.isNull(userDTO))
				return null;
			
			return userDTO;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

}
