package com.homefarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.homefarm.domain.User;

@Repository
public interface IUserRepository extends JpaRepository<User, String> {
	
	public User findByEmail(String email);
//	public String nativeQuery = "SELECT * FROM User";
//    
//    @Query(value = nativeQuery, nativeQuery = true)
//    public User findUser();    
	
}
