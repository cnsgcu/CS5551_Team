DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` ( 
    `user_id`       INT UNSIGNED AUTO_INCREMENT,
    `first_name`    VARCHAR(30) NOT NULL,
    `last_name`     VARCHAR(30) NOT NULL,
    `email`         VARCHAR(25) NOT NULL,
    `password`      CHAR(128)   NOT NULL,
    `gender`        CHAR(1)     NOT NULL,
    `date_of_birth` DATE        NOT NULL,
    `created_date`  TIMESTAMP   NOT NULL,
    PRIMARY KEY(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;


DROP TABLE IF EXISTS `medical_record`;
CREATE TABLE `medical_record` ( 
    `record_id`    INT UNSIGNED AUTO_INCREMENT,
    `user_id`      INT UNSIGNED NOT NULL,
    `height`       DECIMAL(5,2),
    `weight`       DECIMAL(5,2),
    `blood_sugar`  INT UNSIGNED,
    `sbp`          DECIMAL(5,2),
    `dbp`          DECIMAL(5,2),
    `created_date` TIMESTAMP,
    PRIMARY KEY(`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;


DROP TABLE IF EXISTS `hypertension_diagnosis`;
CREATE TABLE `hypertension_diagnosis` ( 
    `hypertension_diagnosis_id` INT UNSIGNED AUTO_INCREMENT,
    `sbp_lower_bound`           INT UNSIGNED NOT NULL,
    `sbp_upper_bound`           INT UNSIGNED NOT NULL,
    `dbp_lower_bound`           INT UNSIGNED NOT NULL,
    `dbp_upper_bound`           INT UNSIGNED NOT NULL,
    `diagnosis`                 VARCHAR(25) NOT NULL,
    PRIMARY KEY(`hypertension_diagnosis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `overweight_diagnosis`;
CREATE TABLE `overweight_diagnosis` ( 
    `overweight_diagnosis_id` INT UNSIGNED AUTO_INCREMENT,
    `bmi_lower_bound`         INT UNSIGNED NOT NULL,
    `bmi_upper_bound`         INT UNSIGNED NOT NULL,
    `diagnosis`               VARCHAR(25) NOT NULL,
    PRIMARY KEY(`overweight_diagnosis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `diabetes_diagnosis`;
CREATE TABLE `diabetes_diagnosis` (
  `diabetes_diagnosis_id`        INT UNSIGNED AUTO_INCREMENT,
  `two_hour_glucose_lower_bound` DECIMAL(5,2) UNSIGNED NOT NULL,
  `two_hour_glucose_upper_bound` DECIMAL(5,2) UNSIGNED NOT NULL,
  `fasting_glucose_lower_bound`  DECIMAL(5,2) UNSIGNED NOT NULL,
  `fasting_glucose_upper_bound`  DECIMAL(5,2) UNSIGNED NOT NULL,
  `diagnosis`                    VARCHAR(25) NOT NULL,
  PRIMARY KEY(`diabetes_diagnosis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=1;