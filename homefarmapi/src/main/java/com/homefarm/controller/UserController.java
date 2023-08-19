package com.homefarm.controller;
import com.homefarm.service.UserService;
import com.homefarm.domain.UserDTO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	@Autowired
	private UserService userService = new UserService();
		
	@PostMapping("/user/create")
	public UserDTO createUser(@RequestBody UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		System.out.println(userDTO.toString());
		return userService.userOperationHandler("create", 0, userDTO);
	}
	
	@PostMapping("/user/login")
	public UserDTO login(@RequestBody UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		return userService.userOperationHandler("login", 0, userDTO);
	}
	
	@PostMapping("/user/read")
	public UserDTO read(@RequestBody UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		return userService.userOperationHandler("read", 0, userDTO);
	}
	
	@PutMapping("/user/update")
	public UserDTO update(@RequestParam int id, @RequestBody UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		return userService.userOperationHandler("update", id, userDTO);
	}
	
	@DeleteMapping("/user/delete")
	public UserDTO delete(@RequestBody UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		return userService.userOperationHandler("delete", 0, userDTO);
	}
	
}