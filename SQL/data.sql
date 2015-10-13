INSERT INTO hypertension_diagnosis(sbp_lower_bound, sbp_upper_bound, dbp_lower_bound, dbp_upper_bound, diagnosis) VALUES(90, 119, 60, 79, 'Normal');
INSERT INTO hypertension_diagnosis(sbp_lower_bound, sbp_upper_bound, dbp_lower_bound, dbp_upper_bound, diagnosis) VALUES(119, 139, 79, 90, 'Pre-hypertension');
INSERT INTO hypertension_diagnosis(sbp_lower_bound, sbp_upper_bound, dbp_lower_bound, dbp_upper_bound, diagnosis) VALUES(139, 159, 90, 100, 'State 1');
INSERT INTO hypertension_diagnosis(sbp_lower_bound, sbp_upper_bound, dbp_lower_bound, dbp_upper_bound, diagnosis) VALUES(159, 179, 100, 110, 'State 2');
INSERT INTO hypertension_diagnosis(sbp_lower_bound, sbp_upper_bound, dbp_lower_bound, dbp_upper_bound, diagnosis) VALUES(180, 999, 110, 999, 'State 3');

INSERT INTO overweight_diagnosis(bmi_lower_bound, bmi_upper_bound, diagnosis) VALUES(0, 18, 'Underweight');
INSERT INTO overweight_diagnosis(bmi_lower_bound, bmi_upper_bound, diagnosis) VALUES(19, 24, 'Normal weight');
INSERT INTO overweight_diagnosis(bmi_lower_bound, bmi_upper_bound, diagnosis) VALUES(25, 29, 'Overweight');
INSERT INTO overweight_diagnosis(bmi_lower_bound, bmi_upper_bound, diagnosis) VALUES(30, 99, 'Obese');