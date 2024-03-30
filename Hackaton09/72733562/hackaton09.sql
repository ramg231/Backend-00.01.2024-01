-- Pruebas
Select * from orders limit 10;
Select * from shipper limit 10;
Select * from orderdetails limit 10;
Select * from products limit 10;
Select * from product  limit 10;
Select * from suppliers limit 10;
Select * from employees limit 10;
--
--
--
--
--
-- -----------------------------------------------------------------------------------------------------------------------
-- Importante: Usar el northwind que envio el profesor hasta el 15, porque esta desactualizado, profe, si lo va a probar,
--             use el otro northwind, porque desde el 16 tuve que poner otro para actualizar datos.
-- -----------------------------------------------------------------------------------------------------------------------
--
--
--
--
--
--
-- ---------------------
-- Problema número 1:
-- ---------------------
Select * from Customers where country = 'USA';
-- ---------------------
-- Problema número 2:
-- ---------------------
Select * from Suppliers where city = "BERLIN";
-- ---------------------
-- Problema número 3:
-- ---------------------
Select * From Employees where EmployeeID IN(3,5,8);
-- ---------------------
-- Problema número 4;
-- ---------------------
SELECT p.ProductID, p.ProductName, od.Quantity, p.SupplierID
FROM Products p
JOIN OrderDetails od ON p.ProductID = od.ProductID
WHERE od.Quantity > 0
AND p.SupplierID IN (1, 3, 5);
-- ---------------------
-- Problema número 5;
-- ---------------------
SELECT * FROM Products 
where Price >= 20 AND Price <= 90
Order by price DESC
-- ---------------------
-- Problema número 6;
-- ---------------------
SELECT * FROM Orders
where OrderDate > "1997-01-01" AND OrderDate < "1997-07-15"
-- ---------------------
-- Problema número 7;
-- ---------------------
SELECT * FROM Orders
where year(OrderDate)="1997" AND EmployeeID IN (1,3,4,8)
-- ---------------------
-- Problema número 8;
-- ---------------------
SELECT * FROM Orders
where year(OrderDate)="1996"
-- ---------------------
-- Problema número 9;
-- ---------------------
SELECT * FROM Orders
where year(OrderDate)="1997" AND month(OrderDate)="04" -- Profe, no existen datos en abril xd
-- ---------------------
-- Problema número 10;
-- ---------------------
SELECT * FROM Orders
where day(OrderDate)="01" and year(OrderDate)="1998"  -- Y aca no hay datos en 1998
-- ---------------------
-- Problema número 11;
-- ---------------------
SELECT * FROM Customers
where FAX is null
-- ---------------------
-- Problema número 12;
-- ---------------------
SELECT * FROM Customers
where FAX is not null
-- ---------------------
-- Problema número 13;
-- ---------------------
SELECT p.ProductName, p.Price, od.Quantity, p.CategoryID
FROM Products p
JOIN OrderDetails od ON p.ProductID = od.ProductID
-- ---------------------
-- Problema número 14;
-- ---------------------
SELECT p.ProductName, p.Price, p.supplierID, Su.SupplierName AS NombreEmpresa
FROM Products p
JOIN Suppliers Su ON p.SupplierID = Su.SupplierID
-- ---------------------
-- Problema número 15;
-- ---------------------
SELECT od.OrderID, p.ProductID, p.Price, od.Quantity, p.Price * od.Quantity AS "Precio Total"
FROM Products p
JOIN Orderdetails od ON p.ProductID = od.ProductID
-- ---------------------
-- Problema número 16;
-- ---------------------

-- A partir de acá empiezo a usar el nuevo northwind, porque antes estaba desactualizado profe, en clase usamos otra.

SELECT od.OrderId, o.orderDate, p.ProductId, p.unitPrice, e.EmployeesId, CONCAT(e.firstname, "," , e.lastname) AS "Nombre Completo"
FROM Product p
JOIN Orderdetails od ON p.productId = od.productId
CROSS JOIN Employees e
CROSS JOIN Orders o
-- ---------------------
-- Problema número 17;
-- ---------------------
SELECT p.ProductId, p.ProductName, od.Quantity                  -- Estoy usando Quantity, porque unitsInStock esta todo en null.
From Product p
JOIN Orderdetails od ON p.productId = od.productId
Order by Quantity LIMIT 10;
-- ---------------------
-- Problema número 18;
-- ---------------------
SELECT p.ProductId, p.ProductName, od.Quantity                  -- Estoy usando Quantity, porque unitsInStock esta todo en null.
From Product p
JOIN Orderdetails od ON p.productId = od.productId
Order by Quantity DESC LIMIT 10;
-- ---------------------
-- Problema número 19;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Estoy usando Quantity, porque unitsInStock esta todo en null.
From Product p
Order by p.unitPrice LIMIT 10;
-- ---------------------
-- Problema número 20;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Estoy usando Quantity, porque unitsInStock esta todo en null.
From Product p
Order by p.unitPrice DESC LIMIT 10;
-- ---------------------
-- Problema número 21;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Esta pregunta se repitio xd
From Product p
Order by p.unitPrice LIMIT 10;
-- ---------------------
-- Problema número 22;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Esta pregunta se repitio (de nuevo) xd
From Product p
Order by p.unitPrice DESC LIMIT 10;
-- ---------------------
-- Problema número 23;
-- ---------------------
SELECT * FROM CUSTOMERS
Order by companyName
-- ---------------------
-- Problema número 24;
-- ---------------------
SELECT * FROM CUSTOMERS
WHERE companyName LIKE "__________B%" and country = "UK"       -- No existen, si pruebas con otras letras
Order by companyName;                                          -- que no sean B, por ejemplo, "A" si da resultados
-- ---------------------
-- Problema número 25;
-- ---------------------
SELECT * FROM PRODUCT
WHERE categoryID IN (1,3,5)
Order by categoryID
-- ---------------------
-- Problema número 26;
-- ---------------------
SELECT * FROM PRODUCT
WHERE unitPrice >=50 AND unitPrice <=200
Order by unitPrice DESC
-- ---------------------
-- Problema número 27;
-- ---------------------
SELECT c.companyName, c.custId, o.orderDate, p.unitPrice, od.discount, p.productId
FROM Product p
JOIN Orderdetails od ON p.productId = od.productId
JOIN Orders o ON od.orderId = o.orderId
JOIN Customers c ON o.custId = c.custId
-- ---------------------
-- Problema número 28;
-- ---------------------
SELECT categoryId, COUNT(*) AS totalCategoria
FROM Product
GROUP BY categoryId;
-- ---------------------
-- Problema número 29;
-- ---------------------

-- No sé como averiguar los mas vendidos, porque no hay nada que indique eso, pero,
-- voy a multiplicar unitPrice x Quantity, para ver el total que cuesta más.

SELECT p.productId, p.ProductName, od.unitPrice, od.Quantity, od.unitPrice * od.Quantity AS "Precio total"
FROM Product p
JOIN orderdetails od ON p.productId = od.productId
Order by unitPrice*Quantity DESC LIMIT 5;
-- ---------------------
-- Problema número 30;
-- ---------------------
Select employeesId, firstname, lastname, title from employees
WHERE title = "CEO"

-- ---------------------
-- Problema número 31;
-- ---------------------
Select * FROM product
WHERE productName LIKE "________M%" AND unitPrice >27 AND unitPrice <130   -- Ningun producto cumple con el requisito
-- ---------------------
-- Problema número 32;
-- ---------------------
Select * from customers
where country IN ("UK", "France", "USA")
-- ---------------------
-- Problema número 33;
-- ---------------------
Select * from product
Where unitsInStock IS NULL
-- ---------------------
-- Problema número 34;
-- ---------------------
Select e.firstname, e.lastname, o.orderId
from employees e
JOIN orders o ON e.employeesId = o.employeesId
where e.firstname = "Robert" and e.lastname = "King"          -- Ninguno tiene este nombre
-- ---------------------
-- Problema número 35;
-- ---------------------
Select * from customers
where companyName = "Que delicia"                             -- Este tampoco
-- ---------------------
-- Problema número 36;
-- ---------------------
Select e.lastname e.firstname, o.orderId
from employees e
JOIN orders o ON e.employeesId = o.employeesId
where CONCAT(e.lastname," ",e.firstname) IN ("King Robert","Davolio Nancy","Fuller Andrew")          -- Ninguno tiene este nombre
-- ---------------------
-- Problema número 37;
-- ---------------------
Select p.productId, p.productName, p.unitPrice, p.unitsInStock, od.orderId
From product p
JOIN orderdetails od ON p.productId = od.productId
WHERE od.orderId = 10257
-- ---------------------
-- Problema número 38;
-- ---------------------
Select p.productId, p.productName, p.unitPrice, p.unitsInStock, od.orderId, o.orderDate
From product p
JOIN orderdetails od ON p.productId = od.productId
JOIN orders o ON od.orderId = o.orderId
WHERE od.orderId = 10257 AND year(o.orderDate)>1997
-- ---------------------
-- Problema número 39;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Esta pregunta se repitio antes y ahora de nuevo xd
From Product p
Order by p.unitPrice DESC LIMIT 15;
-- ---------------------
-- Problema número 40;
-- ---------------------
SELECT p.ProductId, p.ProductName, p.unitPrice                 -- Esta pregunta se repitio xd
From Product p
Order by p.unitPrice LIMIT 5;
-- ---------------------
-- Problema número 41;
-- ---------------------
SELECT ca.categoryName, p.productName, p.unitPrice, p.unitsInStock
From Product p
JOIN category ca ON p.categoryId = ca.categoryId
-- ---------------------
-- Problema número 42;
-- ---------------------
SELECT ca.categoryName, p.productName
From Product p
JOIN category ca ON p.categoryId = ca.categoryId
WHERE p.productName NOT LIKE "________N%"
-- ---------------------
-- Problema número 43;
-- ---------------------

SELECT ca.categoryName, p.categoryId, SUM(p.unitsOnOrder) AS totalStockCategoría
from product p
JOIN category ca on p.categoryId = ca.categoryId
Group by ca.categoryName, p.categoryId
-- ---------------------
-- Problema número 44;
-- ---------------------

SELECT c.contactName AS customerName, s.contactName AS supplierName, CONCAT(e.firstname," ",e.lastname) AS employeeName, p.productName, od.orderId
From product p
JOIN orderdetails od ON p.productId = od.productId
JOIN orders o ON od.orderId = o.orderId
JOIN employees e ON o.employeesId = e.employeesId
JOIN customers c ON o.custId = c.custId
JOIN suppliers s ON p.suppliersId = s.suppliersId
WHERE od.orderId = 10794

-- ---------------------
-- Problema número 45;
-- ---------------------

SELECT c.custId AS IDCliente, YEAR(o.orderDate) AS Año, COUNT(o.orderId) AS totalOrdenes
FROM customers c
JOIN orders o ON c.custId = o.custId
GROUP BY c.custId, YEAR(o.orderDate)
ORDER BY c.custId, YEAR(o.orderDate);

-- ---------------------
-- Problema número 46;
-- ---------------------

SELECT YEAR(o.orderDate) AS Año, MONTH(o.orderDate) AS Mes, count(o.orderId) AS ordenesAnuales
FROM orders o
Group by YEAR(o.orderDate), MONTH(o.orderDate)
Order by YEAR(o.orderDate), MONTH(o.orderDate) 
-- ---------------------
-- Problema número 47;
-- ---------------------

SELECT c.companyName, o.orderId, o.orderDate, p.productId, od.quantity, p.productName, s.companyName, s.city
FROM customers c
JOIN orders o ON c.custId = o.custId
JOIN orderdetails od ON o.orderId = od.orderId
JOIN product p ON od.productId = p.productId
JOIN suppliers s ON p.suppliersId = s.suppliersId
-- ---------------------
-- Problema número 48;
-- ---------------------
Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, 
la fecha de la orden de compra, el código del producto,cantidad pedida del producto, 
nombre del producto y el nombre de la compañía proveedora, usas JOIN.
Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,
además la cantidad pedida del producto debe estar entre 23 y 187.

SELECT c.companyName, c.contactName, o.orderId, o.orderDate, p.productId, od.quantity, p.productName, s.companyName
FROM customers c
JOIN orders o ON c.custId = o.custId
JOIN orderdetails od ON o.orderId = od.orderId
JOIN product p ON od.productId = p.productId
JOIN suppliers s ON p.suppliersId = s.suppliersId
WHERE s.companyName REGEXP '^suppliers [a-gA-G]'
  AND od.quantity > 22 AND od.quantity < 188;
