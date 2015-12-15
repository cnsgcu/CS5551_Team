package com.ibm.cloudoe.models;

import java.util.Date;

public class DiabetesDiagnosis
{
	private String id;
	private String sugar1;
	private String sugar2;
	private String result;
	private Date detectedDate = new Date();
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSugar1() {
		return sugar1;
	}
	public void setSugar1(String sugar1) {
		this.sugar1 = sugar1;
	}
	public String getSugar2() {
		return sugar2;
	}
	public void setSugar2(String sugar2) {
		this.sugar2 = sugar2;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Date getDetectedDate() {
		return detectedDate;
	}
	public void setDetectedDate(Date detectedDate) {
		this.detectedDate = detectedDate;
	}
}
