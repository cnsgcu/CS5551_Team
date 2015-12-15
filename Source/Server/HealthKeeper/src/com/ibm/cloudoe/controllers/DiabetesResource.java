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

import com.ibm.cloudoe.forms.DiabetesHistory;
import com.ibm.cloudoe.forms.DiabetesRecord;
import com.ibm.cloudoe.forms.HistoryRetrievalForm;
import com.ibm.cloudoe.models.DiabetesDiagnosis;
import com.ibm.cloudoe.services.DiabetesService;

@Path("/diabetes")
public class DiabetesResource
{
	private DiabetesService diabetesService = new DiabetesService();
	
	@POST
	@Path("/detect")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public DiabetesDiagnosis detectDiabetes(DiabetesDiagnosis record) throws UnsupportedEncodingException
	{
		if (record.getId().trim().isEmpty() || record.getSugar1().trim().isEmpty() 
			|| record.getSugar2().trim().isEmpty()) {
			return null;
		}
		
		diabetesService.updateDiabetesHistoryBy(record);
		
		return record;
	}
	
	@POST
	@Path("/history")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public DiabetesHistory reportHistory(HistoryRetrievalForm form) throws UnsupportedEncodingException
	{	
		final DiabetesHistory hist = new DiabetesHistory();
		
		final List<DiabetesRecord> disabetesRecordList = diabetesService.getRecordsBy(form.getUsrId(), form.getStartDate(), form.getEndDate(), true);

		hist.setRecords(disabetesRecordList);
		hist.setCount(disabetesRecordList.size());
		
		return hist;
	}
	
	@GET
	@Path("/history/top/{usrId}")
	@Produces(MediaType.APPLICATION_JSON)
	public DiabetesHistory reportTopHistory(@PathParam("usrId") String userId) throws UnsupportedEncodingException
	{	
		final DiabetesHistory hist = new DiabetesHistory();
		
		final List<DiabetesRecord> disabetesRecordList = diabetesService.getRecordsBy(userId, 3, false);

		hist.setRecords(disabetesRecordList);
		hist.setCount(disabetesRecordList.size());
		
		return hist;
	}
}
