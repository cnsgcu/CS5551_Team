package com.ibm.cloudoe.models;

import java.util.Date;

public class HypertensionDiagnosis {

	private String id;
	private String sbp;
	private String dbp;
	private String result;
	private Date detectedDate = new Date();
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getSbp() {
		return sbp;
	}
	public void setSbp(String sbp) {
		this.sbp = sbp;
	}
	public String getDbp() {
		return dbp;
	}
	public void setDbp(String dbp) {
		this.dbp = dbp;
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
