package com.homefarm.repository;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.fazecast.jSerialComm.SerialPort;

public class ArduinoWriteAndReadService {

    public String read(SerialPort serialPort) {
    	
        byte[] buffer = new byte[1024];
        int numBytes;
        String arduinoResponse = "";
    	boolean isReading = true;
    	
        InputStream inputStream = serialPort.getInputStream();
        
        while (isReading) {
			try {
				numBytes = inputStream.read(buffer);
				if (numBytes > 0) {
	                arduinoResponse += new String(buffer, 0, numBytes);
	                if (arduinoResponse.contains("\n")) {
	                	arduinoResponse = arduinoResponse.trim();

	                	inputStream.close();
	                    isReading = false;
	                }
	            }
			} catch (IOException e) {
				e.printStackTrace();
			}
        }
        /**/
        return arduinoResponse;
    }

    
	public String write(SerialPort serialPort, String value) {
		try {
			OutputStream outputStream = serialPort.getOutputStream();
			byte[] bytes = value.getBytes();

			if (value != "0") {
				outputStream.write(bytes);
				outputStream.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "Send value: " + value;
	}
    
}