CREATE TABLE `student management system`.`user` ( `id` INT NOT NULL AUTO_INCREMENT ,
 `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL ,
  `phone` VARCHAR(45) NOT NULL , `parent_phone` VARCHAR(45) NOT NULL ,
   `comments` TEXT NOT NULL ,
    `payment_status` VARCHAR(20) NOT NULL DEFAULT 'Δεν Πληρώθηκε' ,
 PRIMARY KEY (`id`)) ENGINE = InnoDB;