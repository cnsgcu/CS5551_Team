package com.ibm.cloudoe.forms;

public class HypertensionRecord
{
	private String sbp;
	private String dbp;
	private String result;
	private String detectedDate;
	
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
	public String getDetectedDate() {
		return detectedDate;
	}
	public void setDetectedDate(String detectedDate) {
		this.detectedDate = detectedDate;
	}
}
