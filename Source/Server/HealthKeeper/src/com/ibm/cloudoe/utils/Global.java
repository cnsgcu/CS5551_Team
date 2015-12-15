package com.ibm.cloudoe.utils;

import org.bson.Document;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Global
{
	static public final Gson gson = new Gson();

	public static class DB {
		static private final MongoClientURI uri = new MongoClientURI("mongodb://health:health@ds045694.mongolab.com:45694/healthscope");

		static private final MongoClient dbCLient = new MongoClient(uri);
		static private final MongoDatabase db = dbCLient.getDatabase(uri.getDatabase());
		
		static public final MongoCollection<Document> health = db.getCollection("healthCollection");		
	}
}
