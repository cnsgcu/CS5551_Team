package com.ibm.cloudoe.services;

import java.lang.reflect.Type;
import java.util.Map;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.google.gson.reflect.TypeToken;
import com.ibm.cloudoe.models.User;
import com.ibm.cloudoe.utils.Global;
import com.mongodb.client.result.DeleteResult;

public class UserService
{
	public User findUserById(final String usrId)
	{
		final Document query = new Document("_id", new ObjectId(usrId));
		
		final Document userDoc = Global.DB.health.find(query).first();
		final User foundUser = new User();
		
		if (userDoc == null) {
			return foundUser;
		}
		
		foundUser.setDob(userDoc.getString("dob"));
		foundUser.setName(userDoc.getString("name"));
		foundUser.setEmail(userDoc.getString("email"));
		foundUser.setId(userDoc.get("_id").toString());
		foundUser.setPassword(userDoc.getString("password"));
		
		return foundUser;
	}

	public User findUserBy(final String email, final String password)
	{
		final Document query = new Document();
		query.append("email", email);
		query.append("password", password);
		
		final Document userDoc = Global.DB.health.find(query).first();
		final User foundUser = new User();
		
		// Next two lines are added by Tarun to check for the wrong username or password.
		if (userDoc == null) {
			System.out.println("Wrong username and password 1");
			return null;
		}
		
		foundUser.setDob(userDoc.getString("dob"));
		foundUser.setName(userDoc.getString("name"));
		foundUser.setEmail(userDoc.getString("email"));
		foundUser.setId(userDoc.get("_id").toString());
		foundUser.setPassword(userDoc.getString("password"));
		
		return foundUser;
	}
	
	public User createUser(final User user)
	{
		final Type stringStringMap = new TypeToken<Map<String, Object>>(){}.getType();
		final Map<String, Object> params = Global.gson.fromJson(Global.gson.toJson(user), stringStringMap);

		final Document userDoc = new Document(params);

		Global.DB.health.insertOne(userDoc);
		user.setId(userDoc.get("_id").toString());
		
		return user;
	}
	
	public boolean updateUser(final User user)
	{
		final Type stringStringMap = new TypeToken<Map<String, Object>>(){}.getType();
		final Map<String, Object> params = Global.gson.fromJson(Global.gson.toJson(user), stringStringMap);
		params.remove("id");

		final Document userDoc = new Document(params);

		Global.DB.health.updateOne(
			new Document("_id", new ObjectId(user.getId())),
	        new Document("$set", userDoc)
        );
		
		return true;
	}
	
	public long deleteUser(final User user)
	{
		final DeleteResult result = Global.DB.health.deleteOne(new Document("_id", new ObjectId(user.getId())));

		return result.getDeletedCount();
	}
}
