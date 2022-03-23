CREATE TABLE products
(
    id INT NOT NULL AUTO_INCREMENT,
    korean_name VARCHAR(100) NOT NULL UNIQUE,
    english_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    create_at DATETIME DEFAULT NOW() NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
);