package com.homefarm.repository;

import java.util.Objects;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

public class LoginUser implements IUserOperation {

	@Override
	public UserDTO request(User userData, IUserRepository iUserRepository) {
		try {
			UserDTO userDTO = iUserRepository.seachByEmail(userData.getEmail());
			
			if(Objects.isNull(userDTO))
				return null;
			
			if(!userData.getPassword().equals(userDTO.getPassword()))
				return null;
			
			return userDTO;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
}
