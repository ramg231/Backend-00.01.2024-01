-- 1.	Seleccionar los clientes que viven en el país de "usa" 
Select * from Customers where country = 'USA';
 
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
Select * from Suppliers where City = 'Berlin';
 
-- 3.	Seleccionar los empleados con código 3,5 y 8
Select * from Employees  where EmployeeID in (3,5,8);
 
-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
Select * from Products where SupplierID in (1,3,5) and Stock > 0;
 
-- 5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
Select * from Products where Price >= 20 and Price <= 90 order by Price;
 
-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
Select * from Orders where OrderDate >= '1997-01-01' and OrderDate <= '1997-07-15' order by OrderDate;
 
-- 7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
Select * from Orders where OrderDate >= '1997-01-01' and OrderDate <= '1997-12-31' and EmployeeID in (1,3,4,8);

-- 8.	Mostrar las ordenes hechas en el año 1996 
Select * from Orders where OrderDate >= '1996-01-01' and OrderDate <= '1996-12-31';
 
-- 9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
Select * from Orders where OrderDate >= '1997-04-01' and OrderDate <= '1997-04-30';
 
-- 10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
Select * from Orders where YEAR(OrderDate) = 1998 and DAY(OrderDate) = 01;
 
-- 11.	Mostrar todos los clientes que no tienen fax 
Select * from Customers where Fax is null;

-- 12.	Mostrar todos los clientes que tienen fax 
Select * from Customers where Fax is not null;
 
-- 13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
Select P.ProductName,P.Price,P.Stock,C.CategoryName from Products P
INNER JOIN Categories C ON P.CategoryID = C.CategoryID;

-- 14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 
Select P.ProductName, P.Price, P.SupplierID, S.SupplierName from Products P
INNER JOIN Suppliers S ON P.SupplierID = S.SupplierID;
 
-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. 
Select O.OrderID, O.ProductID, O.Quantity, P.Price, P.Price * O.Quantity as 'Total Pagado' from OrderDetails O
INNER JOIN Products P ON O.ProductID = P.ProductID;
 
-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
Select O.OrderID, O.OrderDate, OD.ProductID, P.Price, E.EmployeeID, CONCAT(E.FirstName, ' ', E.LastName) as 'Nombre Completo' from Orders O
INNER JOIN OrderDetails OD ON OD.OrderID = O.OrderID
INNER JOIN Products P ON P.ProductID = OD.ProductID
INNER JOIN Employees E ON E.EmployeeID = O.EmployeeID;

-- 17.	Mostrar los 10 productos con menor stock 
Select * from Products order by Stock
LIMIT 10;

-- 18.	Mostrar los 10 productos con mayor stock 
Select * from Products order by Stock desc
LIMIT 10;
 
-- 19.	Mostrar los 10 productos con menor precio 
Select * from Products order by Price
LIMIT 10;

-- 20.	Mostrar los 10 productos con mayor precio 
Select * from Products order by Price desc
LIMIT 10;
 
-- 21.	Mostrar los 10 productos más baratos 
Select * from Products order by Price
LIMIT 10;

-- 22.	Mostrar los 10 productos más caros 
Select * from Products order by Price desc
LIMIT 10;

-- 1.	Seleccionar todos los campos de la tabla clientes, ordenar por compania 
Select * from Customers order by Company;
-- (Desafortunadamente no encontre la forma de crear valores string al azar)

Select * from Employees;

-- 2.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 


-- 3.	Seleccionar todos los campos de productos de las categorias 1,3 y 5, ordenar por categoria 
Select * from Products where CategoryID in (1,3,5) order by CategoryID;

-- 4.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
Select * from Products where Price >= 50 and Price <= 200 order by Price;

-- 5.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
Select C.Company, O.OrderDate, P.Price, P.ProductName, P.Unit from Orders O
INNER JOIN OrderDetails OD on OD.OrderID = O.OrderID 
INNER JOIN Customers C on O.CustomerID = C.CustomerID
INNER JOIN Products P on OD.ProductID = P.ProductID;

-- 6.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
Select CategoryID, COUNT(*) as 'Productos por Categoria' from Products group by CategoryID;

-- 7.	Seleccionar los 5 productos mas vendidos 
Select ProductID, SUM(Quantity) as 'Cantidad Vendida' from OrderDetails group by ProductID order by SUM(Quantity) desc
LIMIT 5;

-- 8.	Seleccionar los jefes de los empleados 
Select EmployeeID, FirstName, LastName, Boss from Employees;

-- 9.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
Select * from Products where ProductName like 'M%' and Price >= 28 and Price <= 129;

-- 10.	Obtener todos los clientes del  Pais de USA,Francia y UK 
Select * from Customers where Country in ('USA','France','UK');

-- 11.	Obtener todos los productos descontinuados o con stock cero. 
Select * from Products where Stock = 0;

-- 12.	Obtener todas las ordenes hechas por el empleado King Robert 
Select E.FirstName, E.LastName, O.* from Orders O 
INNER JOIN Employees E ON O.EmployeeID = E.EmployeeID
where E.LastName = 'King' and E.FirstName = 'Robert';

-- 13.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
Select O.*, C.Company from Orders O
INNER JOIN Customers C on O.CustomerID = C.CustomerID
where C.Company = 'Que Delicia';

-- 14.	Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
Select E.FirstName, E.LastName, O.* from Orders O 
INNER JOIN Employees E ON O.EmployeeID = E.EmployeeID
where (E.LastName = 'King' and E.FirstName = 'Robert') or (E.LastName = 'Fuller' and E.FirstName = 'Andrew') or (E.LastName = 'Davolio' and E.FirstName = 'Nancy');

-- 15.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
select P.ProductID, P.ProductName, P.Price, P.Stock, O.OrderID from Products P 
INNER JOIN OrderDetails O on P.ProductID = O.ProductID
where OrderID = 10257;

-- 16.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
select P.ProductID, P.ProductName, P.Price, P.Stock, O.OrderID, O.OrderDate from Products P 
INNER JOIN OrderDetails OD on OD.ProductID = P.ProductID
INNER JOIN Orders O on OD.OrderID = O.OrderID
where O.OrderDate >= '1997-01-01' order by OrderDate;

-- 17.	Calcular los 15 productos mas caros 
Select * from Products order by Price desc
LIMIT 15;

-- 18.	Calcular los 5 productos mas baratos 
Select * from Products order by Price
LIMIT 5;

-- 19.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
Select P.*, C.CategoryName from Products P
INNER JOIN Categories C on C.CategoryID = P.CategoryID;

-- 20.	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
Select P.*, C.CategoryName from Products P
INNER JOIN Categories C on C.CategoryID = P.CategoryID
where P.ProductName not like 'p%';
 
-- 21.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
Select C.CategoryName, SUM(P.Stock) as 'Stock por Categoria' from Products P
INNER JOIN Categories C on P.CategoryID = C.CategoryID
group by C.CategoryID;

-- 22.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
Select O.OrderID, C.CustomerName, S.SupplierName, CONCAT(E.FirstName, '', E.LastName) as 'Nombre del Empleado', P.ProductName from OrderDetails OD 
INNER JOIN Orders O on O.OrderID = OD.OrderID
INNER JOIN Customers C on C.CustomerID = O.CustomerID
INNER JOIN Employees E on E.EmployeeID = O.EmployeeID
INNER JOIN Products P on P.ProductID = OD.ProductID
INNER JOIN Suppliers S on P.SupplierID = S.SupplierID
where O.OrderID = 10794;

-- Ejemplo donde si hay productos
Select O.OrderID, C.CustomerName, S.SupplierName, CONCAT(E.FirstName, '', E.LastName) as 'Nombre del Empleado', P.ProductName from OrderDetails OD 
INNER JOIN Orders O on O.OrderID = OD.OrderID
INNER JOIN Customers C on C.CustomerID = O.CustomerID
INNER JOIN Employees E on E.EmployeeID = O.EmployeeID
INNER JOIN Products P on P.ProductID = OD.ProductID
INNER JOIN Suppliers S on P.SupplierID = S.SupplierID
where O.OrderID = 10248;

-- 23.	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
Select CustomerID, YEAR(OrderDate), COUNT(*) from Orders group by CustomerID, YEAR(OrderDate) order by CustomerID, YEAR(OrderDate);

-- 24.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
Select COUNT(OrderID), YEAR(OrderDate), MONTH(OrderDate) from Orders group by YEAR(OrderDate), MONTH(OrderDate);

-- 25.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join 
Select C.Company, O.OrderID, O.OrderDate, P.ProductID, OD.Quantity, P.ProductName, S.SupplierName, S.City from OrderDetails OD 
INNER JOIN Orders O on O.OrderID = OD.OrderID
INNER JOIN Customers C on C.CustomerID = O.CustomerID
INNER JOIN Products P on P.ProductID = OD.ProductID
INNER JOIN Suppliers S on P.SupplierID = S.SupplierID;

-- 26. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187. 
Select C.Company, C.ContactName, O.OrderID, O.OrderDate, P.ProductID, OD.Quantity, P.ProductName, S.SupplierName from OrderDetails OD 
INNER JOIN Orders O on O.OrderID = OD.OrderID
INNER JOIN Customers C on C.CustomerID = O.CustomerID
INNER JOIN Products P on P.ProductID = OD.ProductID
INNER JOIN Suppliers S on P.SupplierID = S.SupplierID
where OD.Quantity >= 23 and OD.Quantity <= 187 and S.SupplierName RLIKE '^[a-g]';

 

