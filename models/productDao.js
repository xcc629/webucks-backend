const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.$queryRaw`SELECT id, name FROM categories ORDER BY id;`;
};

const getProductsList = async () => {
  return await prisma.$queryRaw`
    SELECT 
    products.id ,
    products.korean_name AS koreanName, 
    products.english_name AS englishName,
    categories.name as category,
    products.category_id AS categoryId,
    JSON_ARRAYAGG(image_url) AS imageUrl
    FROM products 
    JOIN categories ON categories.id = products.category_id
    JOIN products_images ON products_images.products_id  = products.id
    GROUP BY products.id
    ORDER BY products.id;
    `;
};

const getProductDetail = async (para) => {
  const getProductDetail = await prisma.$queryRaw`
    SELECT
        p.id AS id,
        p.korean_name AS koreanName,
        p.english_name As englishName,
        JSON_ARRAYAGG(pi.image_url) AS imageUrl,
        JSON_ARRAYAGG(a.name) AS allergens,
        JSON_OBJECT('fat', n.fat, 'sodium', n.sodium, 'sugar', n.sugar, 'caffein', n.caffein) AS nutritionsInfo
    FROM products p
    LEFT JOIN products_images pi ON p.id = pi.products_id
    LEFT JOIN products_allergies pa ON pa.product_id = p.id
    LEFT JOIN allergies a ON pa.product_id = a.id
    LEFT JOIN nutritions n ON p.id = n.product_id
    WHERE p.id = ${para}
    GROUP BY p.id;
    `;

  return getProductDetail[0];
};

module.exports = { getCategory, getProductsList, getProductDetail };
