CREATE TABLE allergies 
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) UNIQUE NOT NULL,
    create_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id)
);