package com.homefarm.domain;

import java.util.Objects;

public class EntityTransform {

	public User dtoToEntity(UserDTO userDTO) {
		if (Objects.isNull(userDTO))
			return null;

		if (userDTO.getUserTypeId() == 0)
			userDTO.setUserTypeId(2);

		User user = new User(0, null, null, null, null, null);

		user.setId(userDTO.getId());
		user.setDocument(userDTO.getDocument());
		user.setName(userDTO.getName());
		user.setPhone(userDTO.getPhone());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setUserType(new UserType());
		user.getUserType().setId(userDTO.getUserTypeId());
		user.getUserType().setDescription(userDTO.getUserType());

		return user;
	}

	public UserDTO entityToDTO(User user) {
		if (Objects.isNull(user))
			return null;

		UserDTO userDTO = new UserDTO(0, null, null, null, null, null);

		userDTO.setId(user.getId());
		userDTO.setDocument(user.getDocument());
		userDTO.setName(user.getName());
		userDTO.setPhone(user.getPhone());
		userDTO.setEmail(user.getEmail());
		userDTO.setPassword(user.getPassword());

		if (user.getUserType() != null) {
			userDTO.setUserTypeId(user.getUserType().getId());
			userDTO.setUserType(user.getUserType().getDescription().toLowerCase());
		}

		return userDTO;
	}

}
