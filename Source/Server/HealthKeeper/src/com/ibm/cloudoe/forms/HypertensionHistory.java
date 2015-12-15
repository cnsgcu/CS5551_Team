package com.ibm.cloudoe.forms;

import java.util.LinkedList;
import java.util.List;

public class HypertensionHistory
{
	private Integer count;
	private List<HypertensionRecord> records = new LinkedList<HypertensionRecord>();
	
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public List<HypertensionRecord> getRecords() {
		return records;
	}
	public void setRecords(List<HypertensionRecord> records) {
		this.records = records;
	}
	
}
