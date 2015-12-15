package com.ibm.cloudoe.forms;

import java.util.List;

public class OverweightHistory
{
	private int count;
	private List<OverweightRecord> records;
	
	public int getCount()
	{
		return count;
	}
	
	public void setCount(int count)
	{
		this.count = count;
	}
	
	public List<OverweightRecord> getRecords()
	{
		return records;
	}
	
	public void setRecords(List<OverweightRecord> records)
	{
		this.records = records;
	}
}
