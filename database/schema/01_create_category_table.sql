CREATE TABLE categories
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    create_at DATETIME DEFAULT NOW() NOT NULL,
    PRIMARY KEY(id)
);