package com.ibm.cloudoe.controllers;

import java.io.IOException;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

@Path("/nutrition")
public class NutritionResource
{
	static public final String nutritionAPITemplate = 
		"http://api.nal.usda.gov/ndb/reports/?ndbno=%s&type=f&format=json&api_key=TnuJOsEgPNEEO7IMiPyHPjiH038tet819KzrE7q7";
	
	@POST
	public String getNutrition(String foodName)
	{
		// TODO: get foodId
		System.out.println(foodName);
		
		final HttpGet httpGet = new HttpGet(String.format(nutritionAPITemplate, "01001"));

		try {
			final HttpClient httpClient = HttpClientBuilder.create().build();

			final HttpResponse httpResponse = httpClient.execute(httpGet);
			final String responseString = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
			System.out.println(responseString);

			return responseString;
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
}
