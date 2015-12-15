package com.ibm.cloudoe.controllers;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ibm.cloudoe.forms.CredentialForm;
import com.ibm.cloudoe.models.User;
import com.ibm.cloudoe.services.UserService;

@Path("/users")
public class UserResource
{
	private UserService userService = new UserService();

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User add(User user)
	{
		userService.createUser(user);
		user.setPassword(null);

		return user;
	}

	@POST
	@Path("/identify")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> identify(CredentialForm credential) throws UnsupportedEncodingException
	{
		if (credential.getEmail().trim().isEmpty() || credential.getPassword().trim().isEmpty()) {
			return Collections.emptyList();
		}
		
		final User user = userService.findUserBy(credential.getEmail(), credential.getPassword());
		
		if (user == null){
			System.out.println("Wrong username and password 2");
			return Collections.emptyList();
		}
		
		user.setPassword(null);

		return Arrays.asList(user);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User update(User user)
	{
		// TODO implement update user profile
		
		return null;
	}
	
	@DELETE
	@Path("{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public User delete(@PathParam("userId") String userId)
	{
		// TODO implement delete user profile
		
		return null;
	}
}
