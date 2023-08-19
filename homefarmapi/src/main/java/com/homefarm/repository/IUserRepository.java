package com.homefarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.homefarm.domain.User;
import com.homefarm.domain.UserDTO;

public interface IUserRepository extends JpaRepository<User, Integer> {
	
	@Query ("SELECT new com.homefarm.domain.UserDTO (u.id, u.document, u.name, u.phone, u.email, u.password, ut.id, ut.description) FROM User u INNER JOIN UserType ut ON u.userType.id = ut.id WHERE u.id = ?1")
	public UserDTO findById(int id);
	
	@Query ("SELECT new com.homefarm.domain.UserDTO (u.id, u.document, u.name, u.phone, u.email, u.password, ut.id, ut.description) FROM User u INNER JOIN UserType ut ON u.userType.id = ut.id WHERE u.email = ?1")
	public UserDTO seachByEmail(String email); 
	
	@Query ("SELECT new com.homefarm.domain.UserDTO (u.id, u.document, u.name, u.phone, u.email, u.password, ut.id, ut.description) FROM User u INNER JOIN UserType ut ON u.userType.id = ut.id WHERE u.document = ?1")
	public UserDTO findByDocument(String document);
	
}
