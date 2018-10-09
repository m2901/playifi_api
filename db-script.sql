create table account(
   account_id INT NOT NULL AUTO_INCREMENT,
   email VARCHAR(255) NOT NULL,
   username VARCHAR(40) NOT NULL,
   password VARCHAR(255) NOT NULL,
   is_active boolean NOT null default true,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
   PRIMARY KEY ( account_id )
);