package com.homefarm.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.homefarm.domain.UserDTO;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

public class ValidatorService {

	public JsonNode validator(UserDTO userDTO) throws JsonMappingException, JsonProcessingException {
		ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
		
		ObjectMapper mapper = new ObjectMapper();
		JsonNode jn = null;
		
		Validator validator = factory.getValidator();
		
		Set<ConstraintViolation<UserDTO>> constraintViolations = validator.validate(userDTO);
		
		if (constraintViolations.size() > 0) {			
			Map<String, String> map = new HashMap<String, String>();
			
			for (ConstraintViolation<UserDTO> temp : constraintViolations) {
				map.put(temp.getPropertyPath() + "", temp.getMessage() + "");
			}
			
			jn = mapper.readTree(new ObjectMapper().writeValueAsString(map));
		}
		
		if(!Objects.isNull(jn))
			System.out.println(jn);
		
		return jn;
	}
	
}
