package com.ibm.cloudoe.forms;


public class OverweightRecord
{
	private Double bmi;
	private String gender;
	
	private String diagnosis;
	
	private Integer weightLbs;
	private Integer heightInch;

	private String detectedDate;

	public Double getBmi() {
		return bmi;
	}

	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public Integer getWeightLbs() {
		return weightLbs;
	}

	public void setWeightLbs(Integer weightLbs) {
		this.weightLbs = weightLbs;
	}

	public Integer getHeightInch() {
		return heightInch;
	}

	public void setHeightInch(Integer heightInch) {
		this.heightInch = heightInch;
	}

	public String getDetectedDate() {
		return detectedDate;
	}

	public void setDetectedDate(String detectedDate) {
		this.detectedDate = detectedDate;
	}
}
