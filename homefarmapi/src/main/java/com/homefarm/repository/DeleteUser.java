package com.homefarm.repository;

import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

@Repository
public class DeleteUser implements IUserOperation {

	@Override
	public UserDTO request(User user, IUserRepository iUserRepository) {
		try {
			UserDTO userDTO = iUserRepository.findByDocument(user.getDocument());
			
			if(Objects.isNull(userDTO))
				return null;
			
			iUserRepository.delete(user);
			
			return userDTO;
		} catch (Exception e) {
			return null;
		}
	}

}
