package com.ibm.cloudoe.models;

import java.util.Date;

import com.ibm.cloudoe.forms.OverweightForm.Gender;

public class OverweightDiagnosis
{
	private Double bmi;
	private Gender gender;
	
	private String diagnosis;
	
	private Integer weightLbs;
	private Integer heightInch;
	
	private transient Integer healthyWeightLowerLbs;
	private transient Integer healthyWeightUpperLbs;
	
	private transient Integer healthyCaloriesLower;
	private transient Integer healthyCaloriesUpper;

	private Date detectedDate = new Date();
	
	public Double getBmi()
	{
		return bmi;
	}
	
	public void setBmi(Double bmi)
	{
		this.bmi = bmi;
	}
	
	public String getDiagnosis()
	{
		return diagnosis;
	}
	
	public void setDiagnosis(String description)
	{
		this.diagnosis = description;
	}
	
	public Date getDetectedDate()
	{
		return detectedDate;
	}
	
	public void setDetectedDate(Date detectedDate)
	{
		this.detectedDate = detectedDate;
	}
	
	public Integer getWeightLbs()
	{
		return weightLbs;
	}
	
	public void setWeightLbs(Integer weightLbs)
	{
		this.weightLbs = weightLbs;
	}
	
	public Integer getHeightInch()
	{
		return heightInch;
	}
	
	public void setHeightInch(Integer heightInch)
	{
		this.heightInch = heightInch;
	}

	public Gender getGender()
	{
		return gender;
	}

	public void setGender(Gender gender)
	{
		this.gender = gender;
	}

	public Integer getHealthyWeightLowerLbs()
	{
		return healthyWeightLowerLbs;
	}

	public void setHealthyWeightLowerLbs(Integer healthyWeightLowerLbs)
	{
		this.healthyWeightLowerLbs = healthyWeightLowerLbs;
	}

	public Integer getHealthyWeightUpperLbs()
	{
		return healthyWeightUpperLbs;
	}

	public void setHealthyWeightUpperLbs(Integer healthyWeightUpperLbs)
	{
		this.healthyWeightUpperLbs = healthyWeightUpperLbs;
	}

	public Integer getHealthyCaloriesLower() {
		return healthyCaloriesLower;
	}

	public void setHealthyCaloriesLower(Integer healthyCaloriesLower) {
		this.healthyCaloriesLower = healthyCaloriesLower;
	}

	public Integer getHealthyCaloriesUpper() {
		return healthyCaloriesUpper;
	}

	public void setHealthyCaloriesUpper(Integer healthyCaloriesUpper) {
		this.healthyCaloriesUpper = healthyCaloriesUpper;
	}
}
