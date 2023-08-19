package com.homefarm.repository;

import java.util.Objects;

import org.springframework.stereotype.Repository;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

@Repository
public class CreateUser implements IUserOperation {

	@Override
	public UserDTO request(User user, IUserRepository iUserRepository) {
		try {
			if(!Objects.isNull(iUserRepository.findById(user.getId())))
				return null;
			
			iUserRepository.save(user);
			
			return iUserRepository.findById(user.getId());
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

}
