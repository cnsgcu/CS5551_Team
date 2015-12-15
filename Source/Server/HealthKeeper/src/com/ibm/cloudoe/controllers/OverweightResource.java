package com.ibm.cloudoe.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ibm.cloudoe.forms.OverweightForm;
import com.ibm.cloudoe.forms.OverweightHistory;
import com.ibm.cloudoe.forms.OverweightRecord;
import com.ibm.cloudoe.models.OverweightDiagnosis;
import com.ibm.cloudoe.models.User;
import com.ibm.cloudoe.services.OverweightService;
import com.ibm.cloudoe.services.UserService;

@Path("overweight")
public class OverweightResource
{
	private static final UserService userService = new UserService();
	private static final OverweightService overweightService = new OverweightService();
	public static final DateFormat dateParser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX", Locale.ENGLISH);

	@POST
	@Path("/detect")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public OverweightDiagnosis detect(OverweightForm form)
	{
		final User usr = userService.findUserById(form.getUsrId());
		
		if (usr.getDob() != null) {
			try {
				final Calendar usrDob = Calendar.getInstance();
				usrDob.setTime(dateParser.parse(usr.getDob()));

				int usrAge = Calendar.getInstance().get(Calendar.YEAR) - usrDob.get(Calendar.YEAR);
				form.setAge(usrAge);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		
		final OverweightDiagnosis diagnosis = overweightService.detectOverweight(form);
		
		overweightService.saveRecord(form.getUsrId(), diagnosis);
		
		return diagnosis;
	}
	
	@GET
	@Path("/history/top/{usrId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public OverweightHistory reportHistory(@PathParam("usrId") String userId)
	{		
		final List<OverweightRecord> records = overweightService.getRecordsBy(userId, 8, false);
		
		final OverweightHistory hist = new OverweightHistory();
		hist.setRecords(records);
		hist.setCount(records.size());
		
		return hist;
	}
}
