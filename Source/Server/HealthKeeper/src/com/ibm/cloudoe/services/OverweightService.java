package com.ibm.cloudoe.services;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.ibm.cloudoe.forms.OverweightForm;
import com.ibm.cloudoe.forms.OverweightRecord;
import com.ibm.cloudoe.models.OverweightDiagnosis;
import com.ibm.cloudoe.utils.Converter;
import com.ibm.cloudoe.utils.Global;
import com.mongodb.Block;

public class OverweightService
{
	private static final DateFormat detectedDateparser = new SimpleDateFormat("EEE MMM dd hh:mm:ss z yyyy", Locale.ENGLISH);
	
	public OverweightDiagnosis detectOverweight(OverweightForm form)
	{
		final Double bmi = calculateBmi(form.getWeightLbs(), form.getHeightInch());
		
		final OverweightDiagnosis diagnosis = new OverweightDiagnosis();
		diagnosis.setBmi(bmi);
		diagnosis.setGender(form.getGender());
		diagnosis.setWeightLbs(form.getWeightLbs());
		diagnosis.setHeightInch(form.getHeightInch());
		diagnosis.setHealthyWeightLowerLbs(calculateHealthyWeightLowerLbs(form.getHeightInch()));
		diagnosis.setHealthyWeightUpperLbs(calculateHealthyWeightUpperLbs(form.getHeightInch()));
		
		if (bmi < 18.5d) {
			diagnosis.setDiagnosis("Underweight");
			
			// Set weight gaining calories as healthy calories
			diagnosis.setHealthyCaloriesLower(calculateWeightGainCalories(form));
			diagnosis.setHealthyCaloriesUpper(diagnosis.getHealthyCaloriesLower() + 200);
		} else if (bmi < 24.9d) {
			diagnosis.setDiagnosis("Normal");
			
			// Set weight maintaining calories as healthy calories
			diagnosis.setHealthyCaloriesLower(calculateWeightMaintainCalories(form));
			diagnosis.setHealthyCaloriesUpper(diagnosis.getHealthyCaloriesLower() + 200);
		} else if (bmi < 29.9d) {
			diagnosis.setDiagnosis("Overweight");
			
			// Set weight losing calories as healthy calories
			diagnosis.setHealthyCaloriesLower(calculateWeightLossCalories(form));
			diagnosis.setHealthyCaloriesUpper(diagnosis.getHealthyCaloriesLower() + 200);
		} else {
			diagnosis.setDiagnosis("Obese");
			
			// Set weight losing calories as healthy calories
			diagnosis.setHealthyCaloriesLower(calculateWeightLossCalories(form));
			diagnosis.setHealthyCaloriesUpper(diagnosis.getHealthyCaloriesLower() + 200);
		}
		
		return diagnosis;
	}

	public boolean saveRecord(String usrId, OverweightDiagnosis diagnosis)
	{
		final List<OverweightRecord> overweightRecordHist = getRecordsBy(usrId, 1, false);
		
		if (overweightRecordHist.isEmpty()){
			persistRecord(usrId, diagnosis);
			return true;
		}
		
		try {
			final Date prevCheckupDate = detectedDateparser.parse(overweightRecordHist.get(0).getDetectedDate());
			final long diffMillis = System.currentTimeMillis() - prevCheckupDate.getTime();
			final long diffDays = TimeUnit.DAYS.convert(diffMillis, TimeUnit.MILLISECONDS);
			
			if (diffDays % 7 == 0) {
				persistRecord(usrId, diagnosis);
				return true;
			}
		} catch (ParseException e) {
			e.printStackTrace();	
		}
		
		return false;
	}
	
	private void persistRecord(String usrId, OverweightDiagnosis diagnosis)
	{
		final Document docDiagnosis = Converter.toMongoDocument(diagnosis);
		
		final Document query = new Document("_id", new ObjectId(usrId));
		final Document updateQuery = new Document("$push", new Document("OverweightHist", docDiagnosis));
		
		Global.DB.health.findOneAndUpdate(query, updateQuery);
	}
	
	public List<OverweightRecord> getRecordsBy(String usrId, int num, boolean ascending)
	{
		final List<OverweightRecord> overweightRecordList = new ArrayList<OverweightRecord>(num);
		
		final List<Document> toOverweightDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$OverweightHist"),
			new Document("$sort", new Document("OverweightHist.detectedDate", ascending?1:-1)),
			new Document("$limit", num),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toOverweightRecord = new Block<Document>() {
			@Override 
			public void apply(Document doc) {
				final OverweightRecord overweightRecord = fromDocument(doc);
				overweightRecordList.add(overweightRecord);
			}
		};
		
		Global.DB.health.aggregate(toOverweightDoc).forEach(toOverweightRecord);
		
		return overweightRecordList;
	}
	
	public List<OverweightRecord> getRecordsBy(String usrId, Date start, Date end, boolean ascending)
	{
		
		final List<OverweightRecord> overweightRecordList = new LinkedList<OverweightRecord>();
		
		final Document dateInterval = new Document();
		dateInterval.put("$gt", start);
		dateInterval.put("$lt", end);
		
		final List<Document> toOverweightDoc = Arrays.asList(
			new Document("$match", new Document("_id", new ObjectId(usrId))),
			new Document("$unwind", "$OverweightHist"),
			new Document("$match", new Document("OverweightHist.detectedDate", dateInterval)),
			new Document("$sort", new Document("OverweightHist.detectedDate", ascending?1:-1)),
			new Document("$project", projectOverweightRecord())
		);
		
		final Block<Document> toOverweightRecord = new Block<Document>() {
			@Override 
			public void apply(Document doc) {
				final OverweightRecord overweightRecord = fromDocument(doc);
				overweightRecordList.add(overweightRecord);
			}
		};
		
		Global.DB.health.aggregate(toOverweightDoc).forEach(toOverweightRecord);
		
		return overweightRecordList;
	}
	
	public static OverweightRecord fromDocument(Document doc)
	{
		final OverweightRecord overweightRecord = new OverweightRecord();
		overweightRecord.setBmi(doc.getDouble("bmi"));
		overweightRecord.setGender(doc.getString("gender"));
		overweightRecord.setDiagnosis(doc.getString("diagnosis"));
		overweightRecord.setWeightLbs(doc.getInteger("weightLbs"));
		overweightRecord.setHeightInch(doc.getInteger("heightInch"));
		overweightRecord.setDetectedDate(doc.getDate("detectedDate").toString());
		
		return overweightRecord;
	}
	
	public static Document projectOverweightRecord()
	{
		final Document projection = new Document("_id", false);
		projection.put("bmi", "$OverweightHist.bmi");
		projection.put("gender", "$OverweightHist.gender");
		projection.put("diagnosis", "$OverweightHist.diagnosis");
		projection.put("weightLbs", "$OverweightHist.weightLbs");
		projection.put("heightInch", "$OverweightHist.heightInch");
		projection.put("detectedDate", "$OverweightHist.detectedDate");
		
		return projection;
	}
	
	private Integer calculateWeightMaintainCalories(OverweightForm form)
	{
		switch (form.getGender()) {
			case Male:
				return (calculateBmr(form) / 100) * 100;
			case Female:
				return (calculateBmr(form) / 100) * 100;
			default:
				return 0;
		}
	}

	private int calculateWeightLossCalories(OverweightForm form)
	{
		return calculateWeightMaintainCalories(form) - 450;
	}

	private int calculateWeightGainCalories(OverweightForm form)
	{
		return calculateWeightMaintainCalories(form) + 500;
	}
	
	private int calculateBmr(OverweightForm form)
	{
		switch (form.getGender()) {
			case Male:
				return (int) (66.47 + (13.75 * form.getWeightLbs() / 2.2) + (5.0 * form.getHeightInch() *  2.54) - (6.75 * form.getAge()));
			case Female:
				return (int) (665.09 + (9.56 * form.getWeightLbs() / 2.2) + (1.84 * form.getHeightInch() *  2.54) - (4.67 * form.getAge()));
			default:
				return 0;
		}
	}
	
	private Double calculateBmi(Integer weightLbs, Integer heightInch)
	{
		return (((double) weightLbs) / (heightInch * heightInch)) * 703;
	}
	
	private Integer calculateHealthyWeightLowerLbs(Integer heightInch)
	{
		return (int) (18.5 * (heightInch * heightInch) / 703);
	}
	
	private Integer calculateHealthyWeightUpperLbs(Integer heightInch)
	{
		return 25 * (heightInch * heightInch) / 703;
	}
}
