package com.ibm.cloudoe.utils;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import org.bson.Document;

public class Converter
{
	public static Document toMongoDocument(Object obj)
	{
		final Document doc = new Document();
		
		for (final Field f : obj.getClass().getDeclaredFields()) {
			if (!Modifier.isTransient(f.getModifiers())) {
				final boolean isAccessible = f.isAccessible();
				
				if (!f.isAccessible()) {
					f.setAccessible(true);
				}
				
				try {
					Object value = f.get(obj);
					
					if (value != null) {
						if (value.getClass().isEnum()) {
							doc.put(f.getName(), value.toString());					
						} else {
							doc.put(f.getName(), value);
						}					
					}
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
				
				f.setAccessible(isAccessible);
			}
		}
		
		return doc;
	}
}
