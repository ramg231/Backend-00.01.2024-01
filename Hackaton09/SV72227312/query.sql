-- HACKATHON 09
-- HENRY GÓMEZ - SV72227312

-- Seleccionar los clientes que viven en el país de "usa" 
Select * from customers where Country = 'USA';

-- Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
Select * from suppliers where City = 'Berlin';

-- Seleccionar los empleados con código 3,5 y 8 
select * from employees where EmployeeID in(3,5,8);

-- Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
alter table Products add column Stock int;
update Products set Stock = floor((rand()*(1000-0+1))+0) where products.ProductID is not null;

select p.*, s.SupplierName from products p
inner join suppliers s
on p.SupplierID = s.SupplierID
where s.SupplierID in(1,3,5) and p.Stock > 0;

-- Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
select * from products where Price BETWEEN 20 AND 90;

-- Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
select * from orders where OrderDate BETWEEN '1997-01-01' AND '1997-07-15';

-- Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
select * from orders o
inner join employees e
on o.EmployeeID = e.EmployeeID
where e.EmployeeID in(1,3,4,8) and year(OrderDate) = '1997';

-- Mostrar las ordenes hechas en el año 1996 
select * from orders o
inner join orderdetails ord
on o.OrderID = ord.OrderID
where year(OrderDate) = '1996';

-- Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
select * from orders o
inner join orderdetails ord
on o.OrderID = ord.OrderID
where year(OrderDate) = 1996 and month(OrderDate) = 04;

-- Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
select * from orders o
inner join orderdetails ord
on o.OrderID = ord.OrderID
where year(OrderDate) = 1996 and day(OrderDate) = 01;

-- Mostrar todos los clientes que no tienen fax
ALTER TABLE customers -- Agregamos la columna Fax
ADD COLUMN Fax VARCHAR(50);

UPDATE Customers
SET Fax = CONCAT(SUBSTRING_INDEX(UUID(), '-', 1), '-', SUBSTRING_INDEX(UUID(), '-', -1)); -- Actualizamos con valores aleatorios

UPDATE Customers -- Añadimos null aleatoriamente
SET Fax = NULL
WHERE RAND() < 0.1;

select * from customers where Fax is null;

-- Mostrar todos los clientes que tienen fax 
select * from customers where Fax is not null;

-- Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
select ProductName, Price, Stock, c.CategoryName from products p
inner join categories c
on p.CategoryID = c.CategoryID;

-- Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
select ProductName, Price, s.SupplierID, s.SupplierName from products p
inner join suppliers s
on p.SupplierID = s.SupplierID;

-- Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.
select ord.OrderID, ord.ProductID, p.Price, ord.Quantity, (ord.Quantity*p.Price) as TotalPaid  from orderdetails ord
inner join products p
on ord.ProductID = p.ProductID;

-- Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
select ord.OrderID, o.OrderDate, p.ProductID, p.Price, e.EmployeeID, CONCAT(e.FirstName , ' ' , e.LastName) as NameEmployeed from orderdetails ord
inner join products p
on ord.ProductID = p.ProductID
inner join orders o
on ord.OrderID = o.OrderID
inner join employees e
on o.EmployeeID = e.EmployeeID;

-- Mostrar los 10 productos con menor stock 
select * FROM Products
ORDER BY Stock ASC
LIMIT 10;

-- Mostrar los 10 productos con mayor stock 
select * FROM Products
ORDER BY Stock DESC
LIMIT 10;

-- Mostrar los 10 productos con menor precio 
select * FROM Products
ORDER BY Price ASC
LIMIT 10;

-- Mostrar los 10 productos con mayor precio 
select * FROM Products
ORDER BY Price DESC
LIMIT 10;

-- Mostrar los 10 productos más baratos
select * FROM Products
ORDER BY Price ASC
LIMIT 10;

-- Mostrar los 10 productos más caros 
select * FROM Products
ORDER BY Price DESC
LIMIT 10;

-- Seleccionar todos los campos de la tabla clientes,ordenar por compania
select * FROM customers ORDER BY CustomerName;

-- Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
 select * FROM customers 
 WHERE LEFT(CustomerName, 1) = 'B' AND Country = 'UK'
 ORDER BY CustomerName;
 
 -- Seleccionar todos los campos de productos de las categorias 1,3 y 5, ordenar por categoria 
 select * from products where CategoryID in(3,5,8) ORDER BY CategoryID;
 
 -- Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
 select * from products where Price BETWEEN 50 AND 200; 
 
 -- Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
select c.CustomerName, c.CustomerID, o.OrderDate, p.Price, p.ProductName from orderdetails ord
inner join products p
on ord.ProductID = p.ProductID
inner join orders o
on ord.OrderID = o.OrderID
inner join customers c
on o.CustomerID = c.CustomerID;
 
 -- Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
select c.CategoryName, COUNT(p.ProductID) AS NumProductos FROM Categories c
LEFT JOIN Products p 
ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;
 
 -- Seleccionar los 5 productos mas vendidos
SELECT ord.ProductID, p.ProductName, SUM(Quantity) AS TotalVendido FROM OrderDetails ord
INNER JOIN Products p 
ON ord.ProductID = p.ProductID
GROUP BY ProductID, ProductName
ORDER BY TotalVendido DESC
LIMIT 5;

-- Seleccionar los jefes de los empleados
SELECT e.EmployeesID, e.LastName AS EmployeeLastName,
       e.ReportsTo AS BossEmployeeID, 
       b.LastName AS BossLastName
FROM Employees e
LEFT JOIN Employees b ON e.ReportsTo = b.EmployeeID;

select * from employees;
 
-- Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
select * FROM products 
WHERE LEFT(ProductName, 1) = 'M' AND Price BETWEEN 28 AND 129
ORDER BY ProductName;
 
-- Obtener todos los clientes del  Pais de USA,Francia y UK 
select * FROM customers
WHERE Country IN('USA','Francia','UK');
 
-- Obtener todos los productos descontinuados o con stock cero.
ALTER TABLE products -- añadimos las columna discontinued
ADD COLUMN discontinued TINYINT(1);

UPDATE Products -- generamos valores aleatorios de 0 o 1, donde 1 significa que esta descontinuado
SET discontinued = ROUND(RAND());

select * FROM products
WHERE discontinued = 1 OR Stock = 0;
 
-- Obtener todas las ordenes hechas por el empleado King Robert 
select CONCAT(LastName,' ',FirstName) as NameEmployeed, o.* from orders o
inner join employees e
on o.EmployeeID = e.EmployeeID
where CONCAT(LastName,' ',FirstName) = 'King Robert';

-- Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
select c.CustomerName ,o.* from orders o
inner join customers c
on o.CustomerID = c.CustomerID
where CustomerName = "Que delicia";

-- Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
 select CONCAT(LastName,' ',FirstName) as NameEmployeed, o.* from orders o
inner join employees e
on o.EmployeeID = e.EmployeeID
where CONCAT(LastName,' ',FirstName) IN('King Robert','Davolio Nancy','Fuller Andrew');
 
-- Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
 select ord.OrderID, p.ProductID, p.ProductName, p.Price, p.Stock from products p
 inner join orderdetails ord
 on p.ProductID = ord.ProductID
 where ord.OrderID = 10257;
 
 -- Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
 select ord.OrderID, p.ProductID, p.ProductName, p.Price, p.Stock, o.OrderDate from products p
 inner join orderdetails ord
 on p.ProductID = ord.ProductID
 inner join orders o 
 on ord.OrderID = o.OrderID
 where year(o.OrderDate) >= 1997;
 
 -- Calcular los 15 productos mas caros 
select ProductID, ProductName, Price from Products
order by Price DESC
limit 15;
 
 -- Calcular los 5 productos mas baratos
 select ProductID, ProductName, Price from Products
order by Price ASC
limit 5;
 
 -- Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
select c.CategoryName, p.ProductName, p.Price, p.Stock from categories c
inner join Products p 
on c.CategoryID = p.CategoryID;
 
 -- Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
select c.CategoryName, p.ProductName from categories c
inner join Products p 
on c.CategoryID = p.CategoryID
and p.ProductName NOT LIKE 'P%';

 -- Calcular el stock de productos por cada categoria. Mostrar el nombre de la categoria y el stock por categoria.
select c.CategoryName, SUM(p.Stock) AS StockPorCategoria from Categories c
inner join Products p 
ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryName;
 
 -- Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
select c.ContactName AS Cliente, s.SupplierName AS Proveedor, CONCAT(e.FirstName, ' ', e.LastName) AS Empleado, p.ProductName AS Producto from orders o
inner join customers c on c.CustomerID = o.CustomerID
inner join employees e on e.EmployeeID = o.EmployeeID
inner join orderdetails ord on ord.OrderID = o.OrderID
inner join products p on p.ProductID = ord.ProductID
inner join suppliers s on s.SupplierID = p.SupplierID
where ord.OrderID = 10257;
 
 -- Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
select year(OrderDate) AS Año, CustomerID AS CodigoCliente, COUNT(*) AS NumeroOrdenes FROM orders
GROUP BY YEAR(OrderDate), CustomerID
ORDER BY CustomerID, Año; 
 
 -- Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
select YEAR(OrderDate) AS Año, MONTH(OrderDate) AS Mes, COUNT(*) AS NumeroOrdenes from Orders
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY Año, Mes;
 
 -- Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join 
SELECT c.CustomerName AS NombreCliente,
       o.OrderID AS CodigoOrdenCompra,
       o.OrderDate AS FechaOrdenCompra,
       od.ProductID AS CodigoProducto,
       od.Quantity AS CantidadPedida,
       p.ProductName AS NombreProducto,
       s.SupplierName AS NombreProveedor,
       s.City AS CiudadProveedor
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
JOIN Suppliers s ON p.SupplierID = s.SupplierID;

 -- Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187
 SELECT c.CustomerName AS NombreCliente,
       c.ContactName AS NombreContacto,
       o.OrderID AS CodigoOrdenCompra,
       o.OrderDate AS FechaOrdenCompra,
       od.ProductID AS CodigoProducto,
       od.Quantity AS CantidadPedida,
       p.ProductName AS NombreProducto,
       s.SupplierName AS NombreProveedor
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
JOIN Suppliers s ON p.SupplierID = s.SupplierID
WHERE s.SupplierName BETWEEN 'A' AND 'G' 
  AND od.Quantity BETWEEN 23 AND 187;