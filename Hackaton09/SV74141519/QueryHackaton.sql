USE Northwind;
-- 1.	Seleccionar los clientes que viven en el país de "usa" 
SELECT * FROM Customers WHERE country = 'USA';
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
SELECT * FROM Suppliers WHERE city = 'Berlin';
-- 3.	Seleccionar los empleados con código 3,5 y 8 
SELECT * FROM Employees WHERE EmployeeID = 3 OR EmployeeID = 5 OR EmployeeID = 8;
-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
SELECT ProductID, ProductName, SupplierID, Unit
FROM Products
WHERE Unit > 0
AND SupplierID IN (1, 3, 5);
-- 5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
SELECT ProductID, ProductName, Price
FROM Products
WHERE Price >= 20 AND Price <= 90;
-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
SELECT OrderID, OrderDate
FROM Orders
WHERE OrderDate BETWEEN '1997-01-01' AND '1997-07-15';
-- 7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
SELECT OrderID, OrderDate, EmployeeID
FROM Orders
WHERE YEAR(OrderDate) = 1997
AND EmployeeID IN (1, 3, 4, 8);
-- 8.	Mostrar las ordenes hechas en el año 1996 
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1996;
-- 9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1997 AND MONTH(OrderDate) = 04;
-- 10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
SELECT OrderID, OrderDate
FROM Orders
WHERE YEAR(OrderDate) = 1998 AND DAY(OrderDate) = 01;
-- 11.	Mostrar todos los clientes que no tienen fax 
SELECT *
FROM Customers
WHERE Fax IS NULL OR Fax = '';
-- 12.	Mostrar todos los clientes que tienen fax 
SELECT *
FROM Customers
WHERE Fax IS NOT NULL OR Fax <> '';
-- 13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
SELECT 
    Products.ProductName,
    Products.Price,
    Products.Unit,
    Categories.CategoryName
FROM 
    Products
JOIN 
    Categories ON Products.CategoryID = Categories.CategoryID;
-- 14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
SELECT 
    Products.ProductName,
    Products.Price,
    Products.SupplierID,
    Suppliers.SupplierName
FROM 
    Products
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID;
-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. ]
SELECT 
    OrderDetails.OrderID,
    OrderDetails.ProductID,
    Products.Price,
    OrderDetails.Quantity,
    (Products.Price * OrderDetails.Quantity) AS TotalPaid
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID;
-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
SELECT 
    Orders.OrderID,
    Orders.OrderDate,
    OrderDetails.ProductID,
    Products.Price,
    Orders.EmployeeID,
    CONCAT(Employees.FirstName, ' ', Employees.LastName) AS EmployeeFullName
FROM 
    Orders
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Employees ON Orders.EmployeeID = Employees.EmployeeID; 
-- 17.	Mostrar los 10 productos con menor stock 
SELECT ProductID, ProductName, Stock
FROM Products
ORDER BY Stock ASC
LIMIT 10; 
-- 18.	Mostrar los 10 productos con mayor stock 
SELECT ProductID, ProductName, Stock
FROM Products
ORDER BY Stock DESC
LIMIT 10;
-- 19.	Mostrar los 10 productos con menor precio 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price ASC
LIMIT 10;
-- 20.	Mostrar los 10 productos con mayor precio 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 10; 
-- 21.	Mostrar los 10 productos más baratos 
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price ASC
LIMIT 10; 
-- 22.	Mostrar los 10 productos más caros    
SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 10;
-- 23.	Seleccionar todos los campos de la tabla clientes,ordenar por compañia 
SELECT Customers.*, Suppliers.SupplierName
FROM Customers
INNER JOIN Suppliers
ORDER BY Suppliers.SupplierName;
-- 24.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
SELECT Customers.*, Suppliers.SupplierName AS NombreCompañia
FROM Customers
JOIN Suppliers
WHERE Suppliers.SupplierName LIKE 'B%' AND Customers.Country = 'UK'
ORDER BY Suppliers.SupplierName;
-- 25.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
SELECT *
FROM Products
WHERE CategoryID IN (1, 3, 5)
ORDER BY CategoryID;
-- 26.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
SELECT *
FROM Products
WHERE Price BETWEEN 50 AND 200; 
-- 27.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 

-- 28.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
SELECT 
    Categories.CategoryName,
    COUNT(Products.ProductID) AS NumeroDeProductos
FROM 
    Categories
JOIN 
    Products ON Categories.CategoryID = Products.CategoryID
GROUP BY 
    Categories.CategoryName; 
-- 29.	Seleccionar los 5 productos mas vendidos 
SELECT 
    OrderDetails.ProductID,
    Products.ProductName,
    SUM(Quantity) AS TotalVendido
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY 
    ProductID, ProductName
ORDER BY 
    TotalVendido DESC
LIMIT 5; 
-- 30.	Seleccionar los jefes de los empleados 
SELECT * 
FROM Employees
WHERE Title LIKE 'Jefe';
-- 31.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
SELECT *
FROM Products
WHERE ProductName LIKE 'M%' AND Price BETWEEN 28 AND 129; 
-- 32.	Obtener todos los clientes del  Pais de USA,Francia y UK 
SELECT *
FROM Customers
WHERE Country IN ('USA', 'France', 'UK'); 
-- 33.	Obtener todos los productos descontinuados o con stock cero. 
SELECT *
FROM Products
WHERE Discontinued = 1 OR Stock = 0;
-- 34.	Obtener todas las ordenes hechas por el empleado King Robert 
SELECT Orders.*, Employees.FirstName, Employees.LastName
FROM Orders
JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
WHERE Employees.FirstName LIKE 'Robert' AND Employees.LastName LIKE 'King';

-- 35.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
SELECT *
FROM Orders
WHERE CustomerID IN (SELECT CustomerID FROM Customers WHERE CustomerID IN 
(SELECT CustomerID FROM Products WHERE SupplierID = (SELECT SupplierID FROM Suppliers WHERE SupplierName = 'Que delicia')));
-- 36.	Obtener todas las ordenes hechas por el empleado King 
-- Robert,Davolio Nancy y Fuller Andrew 
SELECT *
FROM Orders
WHERE EmployeeID IN (
    SELECT EmployeeID
    FROM Employees
    WHERE FirstName IN ('Robert', 'Nancy', 'Andrew') AND LastName IN ('King', 'Davolio', 'Fuller')
);
-- 37.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
SELECT 
    Products.ProductID AS Codigo,
    Products.ProductName AS Nombre,
    Products.Price AS Precio,
    OrderDetails.Quantity AS Stock,
    OrderDetails.OrderID
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
WHERE 
    OrderDetails.OrderID = 10257;
-- 38.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
SELECT 
    Products.ProductID AS Codigo,
    Products.ProductName AS Nombre,
    Products.Price AS Precio,
    OrderDetails.Quantity AS Stock,
    Orders.OrderDate AS Fecha_compra
FROM 
    OrderDetails
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Orders ON OrderDetails.OrderID = Orders.OrderID
WHERE 
    Orders.OrderDate >= '1997-01-01' AND Orders.OrderDate <= CURDATE(); 
-- 39.	Calcular los 15 productos mas caros 
SELECT 
    ProductID,
    ProductName,
    Price
FROM 
    Products
ORDER BY 
    Price DESC
LIMIT 15; 	 
-- 40.	Calcular los 5 productos mas baratos 
 SELECT 
    ProductID,
    ProductName,
    Price
FROM 
    Products
ORDER BY 
    Price ASC
LIMIT 5;
-- 41.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
SELECT 
    Categories.CategoryName,
    Products.ProductName,
    Products.Price,
    Products.Stock
FROM 
    Categories
JOIN 
    Products ON Categories.CategoryID = Products.CategoryID
ORDER BY 
    CategoryName, ProductName; 
-- 42.	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
SELECT 
    Categories.CategoryName AS Categoria,
    Products.ProductName AS NombreProducto
FROM 
    Categories
JOIN 
    Products ON Categories.CategoryID = Products.CategoryID
WHERE 
    Products.ProductName NOT LIKE 'P%'
ORDER BY 
    NombreProducto;
-- 43.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
SELECT 
    Categories.CategoryName AS Categoria,
    SUM(Products.Stock) AS StockPorCategoria
FROM 
    Categories
JOIN 
    Products ON Categories.CategoryID = Products.CategoryID
GROUP BY 
    Categories.CategoryName;
-- 44.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
SELECT 
    Customers.CustomerName AS NombreCliente,
    Suppliers.SupplierName AS NombreProveedor,
    Employees.FirstName || ' ' || Employees.LastName AS NombreEmpleado,
    Products.ProductName AS NombreProducto,
    Orders.OrderID AS NumeroOrden
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID
JOIN 
    Employees ON Orders.EmployeeID = Employees.EmployeeID
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE 
    Orders.OrderID = 10794;
-- 45.	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
SELECT 
    Customers.CustomerID AS CodigoCliente,
    YEAR(Orders.OrderDate) AS Año,
    COUNT(Orders.OrderID) AS NumeroOrdenes
FROM 
    Customers
LEFT JOIN 
    Orders ON Customers.CustomerID = Orders.CustomerID
GROUP BY 
    CodigoCliente, Año
ORDER BY 
    CodigoCliente, Año; 
-- 46.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
SELECT 
    YEAR(OrderDate) AS Año,
    MONTH(OrderDate) AS Mes,
    COUNT(*) AS NumeroOrdenes
FROM 
    Orders
GROUP BY 
    Año, Mes
ORDER BY 
    Año, Mes; 
-- 47.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, 
-- código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la 
-- ciudad del proveedor ,usar Join 
SELECT 
    Customers.CustomerName AS NombreCliente,
    Orders.OrderID AS CodigoOrden,
    Orders.OrderDate AS FechaOrden,
    OrderDetails.ProductID AS CodigoProducto,
    OrderDetails.Quantity AS Cantidad,
    Products.ProductName AS NombreProducto,
    Suppliers.SupplierName AS NombreProveedor,
    Suppliers.City AS CiudadProveedor
FROM 
    Customers
JOIN 
    Orders ON Customers.CustomerID = Orders.CustomerID
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID;
-- 48. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, 
-- la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y 
-- el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra 
-- de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187.
SELECT 
    Customers.CustomerName AS NombreCliente,
    Customers.ContactName AS NombreContacto,
    Orders.OrderID AS CodigoOrden,
    Orders.OrderDate AS FechaOrden,
    OrderDetails.ProductID AS CodigoProducto,
    OrderDetails.Quantity AS Cantidad,
    Products.ProductName AS NombreProducto,
    Suppliers.SupplierName AS NombreProveedor
FROM 
    Customers
JOIN 
    Orders ON Customers.CustomerID = Orders.CustomerID
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE 
    Suppliers.SupplierName >= 'A' AND Suppliers.SupplierName <= 'G'
    AND OrderDetails.Quantity BETWEEN 23 AND 187;








