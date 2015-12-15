package com.ibm.cloudoe.forms;

public class OverweightForm
{	
	private Float lat;
	private Float lon;

	private String usrId;
	
	private Gender gender;
	
	private Integer age;
	private Integer weightLbs;
	private Integer heightInch;
	
	public static enum Gender
	{
		Male, Female
	}
	
	public Float getLat()
	{
		return lat;
	}

	public void setLat(Float lat)
	{
		this.lat = lat;
	}

	public Float getLon()
	{
		return lon;
	}

	public void setLon(Float lon)
	{
		this.lon = lon;
	}

	public String getUsrId()
	{
		return usrId;
	}

	public void setUsrId(String usrId)
	{
		this.usrId = usrId;
	}
	
	public Gender getGender()
	{
		return gender;
	}

	public void setGender(Gender gender)
	{
		this.gender = gender;
	}

	public Integer getAge()
	{
		return age;
	}

	public void setAge(Integer age)
	{
		this.age = age;
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
}
