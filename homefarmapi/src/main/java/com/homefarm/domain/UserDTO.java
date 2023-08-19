package com.homefarm.domain;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserDTO {
	
	int id;

	@NotNull(message = "Número de identificación no ingresado")
	@Size(min = 10, max = 15, message = "Número de identificación no válido. Debe contener al menos diez(10) dígitos")
	@Pattern(regexp = "^[0-9]*$", message = "Número de identificación no válido; sólo se admiten números")
	String document;
	
	@NotNull(message = "Nombre no ingresado")
	@Size(min = 3, max = 100, message = "Tamaño de nombre incorrecto. Debe contener al menos tres(3) caracteres")
	String name;
	
	@Size(min = 10, max = 15, message = "Número telefónico incorrecto. Debe contener al menos diez(10) dígitos")
	@Pattern(regexp = "^[0-9]*$", message = "El campo teléfono solo permite números")
	String phone;
	
	@NotNull(message = "Por favor, ingrese un correo electrónico")
	@Pattern(regexp = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$",
	message = "El email ingresado no tiene un formato válido, ejemplo: 'nombre@dominio.com'")
	String email;
	
	@NotNull(message = "Por favor, ingrese una contraseña")
	@Size(min = 4, max = 15, message = "Tamaño de contraseña incorrecta. Debe contener al menos cuatro(4) caracteres")
	String password;
	
	private int userTypeId;
	
	private String userType;
	
	public UserDTO() {}

	public UserDTO(int id, String document, String name, String phone, String email, String password) {
		this.id = id;
		this.document = document;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.password = password;
	}

	public UserDTO(int id, String document, String name, String phone, String email, String password, int userTypeId, String userType) {
		this.id = id;
		this.document = document;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.password = password;
		this.userTypeId = userTypeId;
		this.userType = userType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getUserTypeId() {
		return userTypeId;
	}

	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}
	
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", document=" + document + ", name=" + name + ", phone=" + phone + ", email="
				+ email + ", password=" + password + ", userTypeId=" + userTypeId + ", userType=" + userType + "]";
	}
		
}