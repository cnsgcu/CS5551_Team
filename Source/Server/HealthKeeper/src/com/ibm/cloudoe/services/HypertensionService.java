package com.ibm.cloudoe.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.ibm.cloudoe.forms.HypertensionRecord;
import com.ibm.cloudoe.models.HypertensionDiagnosis;
import com.ibm.cloudoe.utils.Global;
import com.mongodb.Block;

public class HypertensionService
{
	public void updateHypertensionHistoryBy(HypertensionDiagnosis record)
	{
		final String result = getHypertensionResult(record.getSbp(), record.getDbp());
		record.setResult(result);
		record.setDetectedDate(new Date());
		
		final Document docDiagnosis = new Document();
		docDiagnosis.put("sbp", record.getSbp());
		docDiagnosis.put("dbp", record.getDbp());
		docDiagnosis.put("result", result);
		docDiagnosis.put("detectedDate", new Date());
        	
		final Document findQuery = new Document("_id", new ObjectId(record.getId()));
		final Document updateQuery = new Document("$push", new Document("HypertensionHist", docDiagnosis));
	    
		Global.DB.health.findOneAndUpdate(findQuery, updateQuery);
	}

	public List<HypertensionRecord> getRecordsBy(String usrId, int num, boolean ascending)
	{
		final List<HypertensionRecord> hypertensionRecordList = new ArrayList<HypertensionRecord>(num);
		
		final List<Document> toHypertensionDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$HypertensionHist"),
			new Document("$sort", new Document("HypertensionHist.detectedDate", ascending?1:-1)),
			new Document("$limit", num),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toHypertensionRecord = new Block<Document>() {
			@Override
			public void apply(Document doc) {
				final HypertensionRecord hypertensionRecord = fromDocument(doc);

				hypertensionRecordList.add(hypertensionRecord);
			}
		};
		
		Global.DB.health.aggregate(toHypertensionDoc).forEach(toHypertensionRecord);
		
		return hypertensionRecordList;
	}
	
	public List<HypertensionRecord> getRecordsBy(String usrId, Date start, Date end, boolean ascending)
	{
		final List<HypertensionRecord> hypertensionRecordList = new LinkedList<HypertensionRecord>();

		final Document dateInterval = new Document();
		dateInterval.put("$gt", start);
		dateInterval.put("$lt", end);
		
		final List<Document> toHypertensionDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$HypertensionHist"),
			new Document("$match", new Document("HypertensionHist.detectedDate", dateInterval)),
			new Document("$sort", new Document("HypertensionHist.detectedDate", ascending?1:-1)),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toHypertensionRecord = new Block<Document>() {
			@Override
			public void apply(Document doc) {
				final HypertensionRecord hypertensionRecord = fromDocument(doc);

				hypertensionRecordList.add(hypertensionRecord);
			}
		};
			
		Global.DB.health.aggregate(toHypertensionDoc).forEach(toHypertensionRecord);
		
		return hypertensionRecordList;
	}

	public static HypertensionRecord fromDocument(Document doc)
	{
		final HypertensionRecord hypertensionRecord = new HypertensionRecord();
		hypertensionRecord.setSbp(doc.getString("sbp"));
		hypertensionRecord.setDbp(doc.getString("dbp"));
		hypertensionRecord.setResult(doc.getString("result"));
		hypertensionRecord.setDetectedDate(doc.getDate("detectedDate").toString());
		
		return hypertensionRecord;
	}
	
	public static Document projectOverweightRecord()
	{
		final Document projection = new Document("_id", false);
		projection.put("sbp", "$HypertensionHist.sbp");
		projection.put("dbp", "$HypertensionHist.dbp");
		projection.put("result", "$HypertensionHist.result");
		projection.put("detectedDate", "$HypertensionHist.detectedDate");
		
		return projection;
	}
	
	String getHypertensionResult (String sbp, String dbp){
		int iSBP, iDBP;
		iSBP = Integer.parseInt(sbp);
		iDBP = Integer.parseInt(dbp);
		
		if (iSBP < 110 && iDBP < 140){
			
			return "Normal";
		}
		
        if ((iSBP >= 120 && iSBP <= 139) && iDBP < 90){
        	
        	return "Pre Hypertension";
        }
        
        if (iSBP >= 140 && iSBP <= 159 && iDBP >= 100){
        	
        	return "Stage 1 Hypertension";
        }
        
        if (iSBP >= 160 && iSBP <= 179 && iDBP >= 110){
        	
        	return "Stage 2 Hypertension";
        }
        if (iSBP >= 180 || iDBP >= 110){
        
        	return "Sever Hypertension";
        }
        
		return "";
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
