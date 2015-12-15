package com.ibm.cloudoe.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.ibm.cloudoe.forms.DiabetesRecord;
import com.ibm.cloudoe.models.DiabetesDiagnosis;
import com.ibm.cloudoe.utils.Global;import com.mongodb.Block;

public class DiabetesService
{
	public void updateDiabetesHistoryBy(DiabetesDiagnosis record)
	{
		final String result = getDiabetesResult(record.getSugar1(), record.getSugar2());
		record.setResult(result);
		
		final Document docDiagnosis = new Document();
		docDiagnosis.put("sugar1", record.getSugar1());
		docDiagnosis.put("sugar2", record.getSugar2());
		docDiagnosis.put("result", result);
		docDiagnosis.put("detectedDate", new Date());
        	
		final Document findQuery = new Document("_id", new ObjectId(record.getId()));
		final Document updateQuery = new Document("$push", new Document("DiabetesHist", docDiagnosis));
	    
		Global.DB.health.findOneAndUpdate(findQuery, updateQuery);
	}
	
	public List<DiabetesRecord> getRecordsBy(String usrId, int num, boolean ascending)
	{
		final List<DiabetesRecord> diabetesRecordList = new ArrayList<DiabetesRecord>(num);
		
		final List<Document> toDiabetesDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$DiabetesHist"),
			new Document("$sort", new Document("DiabetesHist.detectedDate", ascending?1:-1)),
			new Document("$limit", num),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toDiabetesRecord = new Block<Document>() {
			@Override
			public void apply(Document doc) {
				final DiabetesRecord diabetesRecord = fromDocument(doc);

				diabetesRecordList.add(diabetesRecord);				
			}
		};
		
		Global.DB.health.aggregate(toDiabetesDoc).forEach(toDiabetesRecord);
		
		return diabetesRecordList;
	}
	
	public List<DiabetesRecord> getRecordsBy(String usrId, Date start, Date end, boolean ascending)
	{
		final List<DiabetesRecord> diabetesRecordList = new LinkedList<DiabetesRecord>();

		final Document dateInterval = new Document();
		dateInterval.put("$gt", start);
		dateInterval.put("$lt", end);
		
		final List<Document> toDiabetesDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$DiabetesHist"),
			new Document("$match", new Document("DiabetesHist.detectedDate", dateInterval)),
			new Document("$sort", new Document("DiabetesHist.detectedDate", ascending?1:-1)),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toDiabetesRecord = new Block<Document>() {
			@Override
			public void apply(Document doc) {
				final DiabetesRecord diabetesRecord = fromDocument(doc);

				diabetesRecordList.add(diabetesRecord);
			}
		};
		
		Global.DB.health.aggregate(toDiabetesDoc).forEach(toDiabetesRecord);
		
		return diabetesRecordList;
	}
	
	public static DiabetesRecord fromDocument(Document doc)
	{
		final DiabetesRecord diabetesRecord = new DiabetesRecord();
		diabetesRecord.setSugar1(doc.getString("sugar1"));
		diabetesRecord.setSugar2(doc.getString("sugar2"));
		diabetesRecord.setResult(doc.getString("result"));
		diabetesRecord.setDetectedDate(doc.getDate("detectedDate").toString());
		
		return diabetesRecord;
	}
	
	public static Document projectOverweightRecord()
	{
		final Document projection = new Document("_id", false);
		projection.put("sugar1", "$DiabetesHist.sugar1");
		projection.put("sugar2", "$DiabetesHist.sugar2");
		projection.put("result", "$DiabetesHist.result");
		projection.put("detectedDate", "$DiabetesHist.detectedDate");
		
		return projection;
	}
	
	String getDiabetesResult (String sugar1, String sugar2){
		int iSugar1, iSugar2;
		iSugar1 = Integer.parseInt(sugar1);
		iSugar2 = Integer.parseInt(sugar2);
		
		if (iSugar1 < 110 && iSugar2 < 140){
			
			return "Normal";
		}
		
        if ((iSugar1 >= 110 && iSugar1 < 126) && iSugar2 < 140){
        	
        	return "Impaired fasting glycaemia glucose";
        }
        
        if (iSugar1 < 126 && iSugar2 < 200 && iSugar2 >= 140){
        	
        	return "Impaired glucose tolerance";
        }
        
        
		return "Diabetes mellitus";
	}
	
	String getRecord (String record){
		
		String subString = record.substring(6);
		int flag;
		flag = Integer.parseInt(subString);
		flag ++;
		subString = Integer.toString(flag);
		subString = "record"+subString;
		return subString;
	}
}
