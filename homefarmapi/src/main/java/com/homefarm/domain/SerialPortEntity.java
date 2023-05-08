package com.homefarm.domain;

import com.fazecast.jSerialComm.SerialPort;

public class SerialPortEntity {
	
	private SerialPort serialPort;
	
	public SerialPortEntity() {
		setSerialPort(getPort());
	}
	
	private String getPort() {
		String port = "";
		SerialPort[] availablePorts = SerialPort.getCommPorts();
		
        for (SerialPort p : availablePorts) {
        	if(p.openPort()) {
        		port = p.getSystemPortName();
        		p.closePort();
        		break;
        	}
        }
        
        return port;
	}
	
	
	private void setSerialPort(String port) {
		this.serialPort = getSerialPort(port);
	}
	
	
	public SerialPort getSerialPort(String port) {
		int BaudRate = 9600;
		int DataBits = 8;
		int StopBits = SerialPort.ONE_STOP_BIT;
		int Parity   = SerialPort.NO_PARITY;
		
		SerialPort serialPort = SerialPort.getCommPort(port);
		serialPort.setComPortParameters(BaudRate, DataBits, StopBits, Parity);
		serialPort.setComPortTimeouts(SerialPort.TIMEOUT_WRITE_BLOCKING, 1000, 0);
		
		return serialPort;
	}
	
	public SerialPort getSerialPort() {
		return serialPort;
	}

}
