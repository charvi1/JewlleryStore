const db = require("../db");

//  Create Product Table if Not Exists
const createProductTable = `
  CREATE TABLE IF NOT EXISTS Product (
    ProductId INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(300) NOT NULL,
    ProductDescription VARCHAR(1000),
    UnitPrice DECIMAL(18,2) NOT NULL,
    Quantity INT NOT NULL,
    Qty_Reorder INT NOT NULL,
    ImageURL VARCHAR(500),
    SubCategoryId INT,
    FOREIGN KEY (SubCategoryId) REFERENCES SubCategory(SubCategoryId) ON DELETE CASCADE
  )
`;

db.query(createProductTable, (err) => {
  if (err) throw err;
  console.log("Product table is ready with ImageURL!");
});

module.exports = db;
