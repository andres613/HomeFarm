package com.homefarm.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.homefarm.service.ArduinoService;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Controller {
	
	private ArduinoService arduinoService = new ArduinoService();
		
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