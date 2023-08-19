package com.homefarm.repository;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

public interface IUserOperation {
	
	public UserDTO request(User user, IUserRepository iUserRepository);
	
}
