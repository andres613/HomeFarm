package com.homefarm.service;

import org.springframework.stereotype.Service;

@Service
public class ArduinoService {
	
	ThreadOfArduinoReadAndWriteService threadOfArduinoReadService = new ThreadOfArduinoReadAndWriteService();
	
	public void thread() {
		threadOfArduinoReadService.run();
	}
	
	public String read() {
		return threadOfArduinoReadService.read();
	}
	
	public String write(String value) {
		return threadOfArduinoReadService.sendDataToArduino(value);
	}
	
	public String stopService() {
		threadOfArduinoReadService.shutdown();
		return "OK";
	}
	
}
