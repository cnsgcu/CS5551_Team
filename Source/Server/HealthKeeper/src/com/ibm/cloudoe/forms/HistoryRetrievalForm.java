package com.ibm.cloudoe.forms;

import java.util.Date;

public class HistoryRetrievalForm
{
	private String usrId;
	private Date endDate;
	private Date startDate;
	
	public String getUsrId()
	{
		return usrId;
	}
	
	public void setUsrId(String usrId)
	{
		this.usrId = usrId;
	}
	
	public Date getEndDate()
	{
		return endDate;
	}
	
	public void setEndDate(Date endDate)
	{
		this.endDate = endDate;
	}
	
	public Date getStartDate()
	{
		return startDate;
	}
	
	public void setStartDate(Date startDate)
	{
		this.startDate = startDate;
	}
}
