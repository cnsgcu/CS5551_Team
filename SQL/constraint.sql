
ALTER TABLE `medical_record`
ADD CONSTRAINT medical_record_fk_user 
FOREIGN KEY (user_id) REFERENCES user(user_id)
ON UPDATE CASCADE
ON DELETE CASCADE;