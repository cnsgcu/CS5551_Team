package com.ibm.cloudoe.forms;

import java.util.LinkedList;
import java.util.List;

public class DiabetesHistory
{
	private Integer count;
	private List<DiabetesRecord> records = new LinkedList<DiabetesRecord>();
	
	public Integer getCount() {
		return count;
	}
	
	public void setCount(Integer count) {
		this.count = count;
	}
	
	public List<DiabetesRecord> getRecords() {
		return records;
	}
	
	public void setRecords(List<DiabetesRecord> records) {
		this.records = records;
	}
}
