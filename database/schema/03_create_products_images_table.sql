CREATE TABLE products_images
(
    id INT NOT NULL AUTO_INCREMENT,
    image_url VARCHAR(3000) NOT NULL,
    products_id INT NOT NULL,
    create_at DATETIME DEFAULT NOW(),
    PRIMARY KEY(id),
    FOREIGN KEY(products_id) REFERENCES products(id)
);