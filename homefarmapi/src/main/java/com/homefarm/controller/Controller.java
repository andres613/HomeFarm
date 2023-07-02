package com.homefarm.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.factory.annotation.Autowired;

import com.homefarm.service.ArduinoService;
import com.homefarm.service.UserService;
import com.homefarm.domain.User;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Controller {
	
	@Autowired
	private UserService userService = new UserService();
	private ArduinoService arduinoService = new ArduinoService();
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public User login(@RequestBody User user) {
		return userService.userLoggedIn(user);
	}
		
	@GetMapping("/read")
	public String read() {
		return arduinoService.read();
	}
		
	@RequestMapping(params="value")
	public String write(@RequestParam String value) {
		return arduinoService.write(value);
	}
	
	@GetMapping("/thread")
	public void thread() {
		arduinoService.thread();
	}
	
	@GetMapping("/stopservice")
	public void stopService() {
		arduinoService.stopService();
	}

}