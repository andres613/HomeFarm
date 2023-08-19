package com.homefarm.repository;

import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

@Repository
public class UpdateUser implements IUserOperation {

	@Override
	public UserDTO request(User user, IUserRepository iUserRepository) {
		try {
			UserDTO userDTO = iUserRepository.findById(user.getId());
			
			if(Objects.isNull(userDTO))
				return null;
			
			iUserRepository.save(user);
			
			return userDTO;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

}
