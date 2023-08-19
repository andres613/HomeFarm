package com.homefarm.service;

import java.nio.charset.StandardCharsets;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.hash.Hashing;

import com.homefarm.domain.EntityTransform;
import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;
import com.homefarm.repository.IUserOperation;
import com.homefarm.repository.IUserRepository;
import com.homefarm.repository.CreateUser;
import com.homefarm.repository.LoginUser;
import com.homefarm.repository.ReadUser;
import com.homefarm.repository.UpdateUser;
import com.homefarm.repository.DeleteUser;

@Service
public class UserService {

	@Autowired
	private IUserRepository iUserRepository;	
	private EntityTransform entityTransform = new EntityTransform();
	private ValidatorService validatorService = new ValidatorService();
	
	
	public UserDTO userOperationHandler(String option, int id, UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		if(!Objects.isNull(validator(userDTO)))
			return null;
		
		switch (option) {
			case "create": {	
				return create(dtoToEntity(userDTO));
			}
			case "login": {
				return login(dtoToEntity(userDTO));
			}
			case "read": {
				return read(dtoToEntity(userDTO));
			}
			case "update": {
				userDTO.setId(id);
				return update(dtoToEntity(userDTO));
			}
			case "delete": {
				return delete(dtoToEntity(userDTO));
			}
		}
		
		return null;
	}
	
	
	private JsonNode validator(UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		return validatorService.validator(userDTO);
	}
	
	
	private User dtoToEntity(UserDTO userDTO) {
		return entityTransform.dtoToEntity(userDTO);
	}
	
	
	private UserDTO entityToDTO(User user) {
		return entityTransform.entityToDTO(user);
	}
	
	
	private UserDTO create(User user) {
		return entityToDTO(userOperation(prepareUser(user), new CreateUser()));
	}
	
	
	public UserDTO login(User user) {
		return entityToDTO(userOperation(prepareUser(user), new LoginUser()));
	}
	
	
	public UserDTO read(User user) {
		return entityToDTO(userOperation(prepareUser(user), new ReadUser()));
	}
	
	
	public UserDTO update(User user) {
		return entityToDTO(userOperation(prepareUser(user), new UpdateUser()));
	}
	
	
	public UserDTO delete(User user) {
		return entityToDTO(userOperation(prepareUser(user), new DeleteUser()));
	}
	
	
	private User prepareUser(User user) {
		user.setPassword(hashPass(user.getPassword()));
		
		return user;
	}
	
	
	private User userOperation(User user, IUserOperation iUserOperation) {
		return entityTransform.dtoToEntity(iUserOperation.request(user, iUserRepository));
	}
	
	
	private String hashPass(String password) {
		String passSha256 = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
		
		return passSha256;
	}
	
}