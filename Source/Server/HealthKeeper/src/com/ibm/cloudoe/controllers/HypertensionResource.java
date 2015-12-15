package com.ibm.cloudoe.controllers;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ibm.cloudoe.forms.HypertensionHistory;
import com.ibm.cloudoe.forms.HypertensionRecord;
import com.ibm.cloudoe.models.HypertensionDiagnosis;
import com.ibm.cloudoe.services.HypertensionService;


@Path("/hypertension")
public class HypertensionResource
{
	private HypertensionService hypertensionService = new HypertensionService();
	
	@POST
	@Path("/detect")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public HypertensionDiagnosis hypertension(HypertensionDiagnosis record) throws UnsupportedEncodingException
	{
		 
		if (record.getId().trim().isEmpty() || record.getSbp().trim().isEmpty() 
			|| record.getDbp().trim().isEmpty()) {
			return null;
		}
		
		hypertensionService.updateHypertensionHistoryBy(record);
		
		return record;
	}
	
	@GET
	@Path("/history/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public HypertensionHistory reportHistory(@PathParam("userId")String userId) throws UnsupportedEncodingException
	{	
		final HypertensionHistory hist = new HypertensionHistory();
		
		final List<HypertensionRecord> hypertensionRecordList = hypertensionService.getRecordsBy(userId, 3, false);
		
		hist.setRecords(hypertensionRecordList);
		hist.setCount(hypertensionRecordList.size());
		
		return hist;
	}
}
