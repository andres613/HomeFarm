package com.homefarm.service;

import com.fazecast.jSerialComm.SerialPort;
import com.homefarm.domain.SerialPortEntity;
import com.homefarm.repository.ArduinoWriteAndReadService;

public class ThreadOfArduinoReadAndWriteService implements Runnable {
	private SerialPortEntity serialPortEntity;
	private ArduinoWriteAndReadService arduinoWriteAndReadService = new ArduinoWriteAndReadService();
	
	private volatile boolean shutdown;
	private volatile boolean sendData;
	
	private String data;
	private String valueToSend;
	
	@Override
	public void run() {
		String data;
		shutdown = false;
		sendData = false;
		
		serialPortEntity = new SerialPortEntity();
		SerialPort serialPort = serialPortEntity.getSerialPort();
		
		while(!shutdown) {
			if(!serialPort.isOpen()) {
				if (!serialPort.openPort()) {
					System.out.println("Failed to open port :(");
				}
				
				data = arduinoWriteAndReadService.read(serialPort).trim();
				
				if (jsonValidate(data)) {
					setData(data);
					System.out.println(read());
				}
				
				if(sendData) {
					arduinoWriteAndReadService.write(serialPort, getValueToSend());
					
					sendData = false;
				}
				
				serialPort.closePort();
			} else {
				if (!serialPort.openPort())
					System.out.println("Failed to open port :(");
			}
		}
	}
	
	private boolean jsonValidate(String data) {
		if (data.charAt(0) == '{' && data.charAt(data.length()-1) == '}')
			return true;
			
		return false;
	}
	
	private void setData(String data) {
		this.data = data;
	}
	
	public String read() {
		return data;
	}
	
	public String sendDataToArduino(String value) {
		setValueToSend(value);
		sendData = true;
		
		return value;
	}
	
	private void setValueToSend(String valueToSend) {
		this.valueToSend = valueToSend;
	}
	
	private String getValueToSend() {
		return valueToSend;
	}
	
	public void shutdown() {
		shutdown = true;
	}

}
