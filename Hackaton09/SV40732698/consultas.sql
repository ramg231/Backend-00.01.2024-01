--Seleccionar los clientes que viven en el país de "usa"
Select * from Customers where country = 'USA';

--Seleccionar los proveedores que viven en la ciudad de "BERLIN"
Select * from suppliers where city = 'Berlin';

--Seleccionar los empleados con código 3,5 y 8
Select * from employees where EmployeeID in (3,5,8);

--Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
SELECT *
FROM products
WHERE stock > 0
AND suppliers IN (1, 3, 5);

--Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
SELECT *
FROM products
WHERE price >= 20 AND price <= 90;

--Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997
SELECT *
FROM orders
WHERE OrderDate BETWEEN '1997-01-01' AND '1997-07-15';


--Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
SELECT orders.*
FROM ordenes_compra OC
JOIN empleados E ON OC.codigo_empleado = E.codigo
WHERE OC.fecha_orden >= '1997-01-01' AND OC.fecha_orden <= '1997-12-31'
AND E.codigo IN (1, 3, 4, 8);

--Mostrar las ordenes hechas en el año 1996
SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1996;

--Mostrar las ordenes hechas en el año 1997 ,del mes de abril

SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1997 AND MONTH(OrderDate) = 4;

--Mostrar las ordenes hechas el primero de todos los meses, del año 1998
SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1998 AND DAY(OrderDate) = 1;

--Mostrar todos los clientes que no tienen fax
SELECT *
FROM customers
WHERE Fax IS NULL;

--Mostrar todos los clientes que tienen fax
SELECT *
FROM customers
WHERE Fax IS NOT NULL;

--Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.
SELECT p.ProductName, p.Price, p.Stock, c.CategoryName
FROM products p
JOIN categories c ON p.CategoryID = c.CategoryID;

--Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
SELECT pr.ProductName, pr.Price, pr.SupplierID, su.SupplierName
FROM products pr
JOIN suppliers su ON pr.SupplierID = su.SupplierID;

--Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.
SELECT od.OrderID, od.ProductID, p.Price, od.Quantity, (p.Price * od.Quantity) AS TotalPaid
FROM orderdetails od
JOIN products p ON od.ProductID = p.ProductID;

--Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
SELECT o.OrderID, o.OrderDate, od.ProductID, p.Price, o.EmployeeID, CONCAT(e.FirstName, ' ', e.LastName) AS FullName
FROM orders o
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID
JOIN employees e ON o.EmployeeID = e.EmployeeID;

--Mostrar los 10 productos con menor stock
SELECT *
FROM products
ORDER BY Stock
LIMIT 10;

--Mostrar los 10 productos con mayor stock
SELECT *
FROM products
ORDER BY Stock DESC
LIMIT 10;

--Mostrar los 10 productos con menor precio
SELECT *
FROM products
ORDER BY Price
LIMIT 10;

--Mostrar los 10 productos con mayor precio
SELECT *
FROM products
ORDER BY Price DESC
LIMIT 10;

--Mostrar los 10 productos más baratos
SELECT *
FROM products
ORDER BY Price
LIMIT 10;

--Mostrar los 10 productos más caros
SELECT *
FROM products
ORDER BY Price DESC
LIMIT 10;

--Seleccionar todos los campos de la tabla clientes,ordenar por compania
SELECT *
FROM customers
ORDER BY CompanyName;

--Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania
SELECT *
FROM customers
WHERE CompanyName LIKE 'B%' AND Country = 'UK'
ORDER BY CompanyName;

--Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria
SELECT *
FROM products
WHERE CategoryID IN (1, 3, 5)
ORDER BY CategoryID;

--Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
SELECT *
FROM products
WHERE Price BETWEEN 50 AND 200;

--Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
SELECT c.CustomerID, c.CustomerName, o.OrderDate, od.UnitPrice, p.ProductName
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID;

--Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
SELECT c.CategoryName, COUNT(p.ProductID) AS NumProductos
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;

--Seleccionar los 5 productos mas vendidos
SELECT p.ProductName, SUM(od.Quantity) AS TotalVendido
FROM products p
JOIN orderdetails od ON p.ProductID = od.ProductID
GROUP BY p.ProductID
ORDER BY TotalVendido DESC
LIMIT 5;

--Seleccionar los jefes de los empleados
SELECT e1.FirstName AS Empleado, e2.FirstName AS Jefe
FROM employees e1
JOIN employees e2 ON e1.ReportsTo = e2.EmployeeID;

--Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
SELECT *
FROM products
WHERE ProductName LIKE 'M%' AND Price BETWEEN 28 AND 129;

--Obtener todos los clientes del Pais de USA,Francia y UK
SELECT *
FROM customers
WHERE Country IN ('USA', 'France', 'UK');

--Obtener todos los productos descontinuados o con stock cero.
SELECT *
FROM products
WHERE Discontinued = 1 OR Stock = 0;

--Obtener todas las ordenes hechas por el empleado King Robert
SELECT *
FROM orders
WHERE EmployeeID = (
    SELECT EmployeeID
    FROM employees
    WHERE FirstName = 'King' AND LastName = 'Robert');

--Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
SELECT *
FROM orders
WHERE CustomerID = (
    SELECT CustomerID
    FROM customers
    WHERE CompanyName = 'Que delicia');

--Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
SELECT *
FROM orders
WHERE EmployeeID IN (
    SELECT EmployeeID
    FROM employees
    WHERE CONCAT(FirstName, ' ', LastName) IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew'));

--Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
SELECT p.ProductID, p.ProductName, p.Price, od.Quantity AS Stock
FROM orderdetails od
JOIN products p ON od.ProductID = p.ProductID
WHERE od.OrderID = 10257;

--Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
SELECT p.ProductID, p.ProductName, p.Price, od.Quantity AS Stock
FROM orderdetails od
JOIN products p ON od.ProductID = p.ProductID
JOIN orders o ON od.OrderID = o.OrderID
WHERE o.OrderDate >= '1997-01-01' AND o.OrderDate <= CURDATE();

--Calcular los 15 productos mas caros
SELECT ProductID, ProductName, Price
FROM products
ORDER BY Price DESC
LIMIT 15;

--Calcular los 5 productos mas baratos
SELECT ProductID, ProductName, Price
FROM products
ORDER BY Price
LIMIT 5;

--Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
SELECT c.CategoryName, p.ProductName, p.Price, p.Stock
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID;

--Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P
SELECT c.CategoryName, p.ProductName
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
WHERE p.ProductName NOT LIKE 'P%';

--Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.
SELECT c.CategoryName, SUM(p.Stock) AS TotalStock
FROM categories c
JOIN products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;

--Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
SELECT cu.CustomerName, su.SupplierName, CONCAT(em.FirstName, ' ', em.LastName) AS EmployeeName, p.ProductName
FROM orders o
JOIN customers cu ON o.CustomerID = cu.CustomerID
JOIN employees em ON o.EmployeeID = em.EmployeeID
JOIN orderdetails od ON o.OrderID = od.OrderID
JOIN products p ON od.ProductID = p.ProductID
JOIN suppliers su ON p.SupplierID = su.SupplierID
WHERE o.OrderID = 10794;

--Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
SELECT 
    CustomerID,
    YEAR(OrderDate) AS Year,
    COUNT(*) AS OrderCount
FROM 
    orders
GROUP BY 
    CustomerID, YEAR(OrderDate)
ORDER BY 
    CustomerID, YEAR(OrderDate);

--Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
SELECT 
    YEAR(OrderDate) AS Year,
    MONTH(OrderDate) AS Month,
    COUNT(*) AS OrderCount
FROM 
    orders
GROUP BY 
    YEAR(OrderDate), MONTH(OrderDate)
ORDER BY 
    YEAR(OrderDate), MONTH(OrderDate);

--Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join
SELECT 
    c.CustomerName AS CompanyName,
    o.OrderID AS OrderCode,
    o.OrderDate AS OrderDate,
    od.ProductID AS ProductCode,
    od.Quantity AS QuantityOrdered,
    p.ProductName AS ProductName,
    s.SupplierName AS SupplierCompanyName,
    s.City AS SupplierCity
FROM 
    orders o
JOIN 
    customers c ON o.CustomerID = c.CustomerID
JOIN 
    orderdetails od ON o.OrderID = od.OrderID
JOIN 
    products p ON od.ProductID = p.ProductID
JOIN 
    suppliers s ON p.SupplierID = s.SupplierID;

--Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187.
SELECT 
    c.CustomerName AS CompanyName,
    c.ContactName AS ContactName,
    o.OrderID AS OrderCode,
    o.OrderDate AS OrderDate,
    od.ProductID AS ProductCode,
    od.Quantity AS QuantityOrdered,
    p.ProductName AS ProductName,
    s.SupplierName AS SupplierCompanyName
FROM 
    orders o
JOIN 
    customers c ON o.CustomerID = c.CustomerID
JOIN 
    orderdetails od ON o.OrderID = od.OrderID
JOIN 
    products p ON od.ProductID = p.ProductID
JOIN 
    suppliers s ON p.SupplierID = s.SupplierID
WHERE 
    s.SupplierName BETWEEN 'A' AND 'G'
    AND od.Quantity BETWEEN 23 AND 187;
