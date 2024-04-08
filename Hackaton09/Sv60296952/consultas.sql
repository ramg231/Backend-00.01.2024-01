-- Ejercicios con Mysql


-- 1.	Seleccionar los clientes que viven en el país de "usa"
    Select * from Customers where country = 'USA';

-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
     select * from Suppliers where city = 'Berlin';

-- 3.	Seleccionar los empleados con código 3,5 y 8 
    select * from employees where EmployeeID in (3, 5, 8);

-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
    select * from products where Stock > 0 and SupplierID IN (1, 3, 5);

-- 5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
    select * from products where Price >= 20 and Price <= 90;  

-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
    select * from orders where OrderDate between '1997-01-01' and '1997-07-15';

-- 7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
    select * from orders where (OrderDate between '1997-01-01' and '1997-12-31') and (EmployeeID IN (1, 3, 4, 8));

-- 8.	Mostrar las ordenes hechas en el año 1996 
    select * from Orders where year(OrderDate) = '1996';

-- 9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
    select * from Orders where year(OrderDate) = '1997' and month(OrderDate) = '4';

-- 10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
    select * from Orders where day(OrderDate) = '1' and year(OrderDate) = '1998';

-- 11.	Mostrar todos los clientes que no tienen fax 
    select * from Customers where Fax IS NULL;

-- 12.	Mostrar todos los clientes que tienen fax 
    select * from Customers where Fax IS NOT NULL;

-- 13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
    select p.ProductName, p.Unit, p.Price, p.Stock, c.CategoryName from Products p inner join Categories c on c.CategoryID = p.CategoryID;

-- 14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 
    select Products.ProductName, Products.Unit, Products.Price, Suppliers.SupplierID, Suppliers.SupplierName from Products 
inner join Suppliers on Suppliers.SupplierID = Products.SupplierID;

-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. 
 select OrderDetails.OrderID, OrderDetails.ProductID, Products.Price, OrderDetails.Quantity, (Products.Price * OrderDetails.Quantity) as Total from `OrderDetails` 
inner join Products on OrderDetails.ProductID = Products.ProductID;

-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
 select O.OrderID, O.OrderDate, D.ProductID, P.Price, E.EmployeeID, CONCAT(E.LastName, ' ', E.FirstName) AS EmployeeName
from Orders as O
inner join `OrderDetails` as D on O.OrderID = D.OrderID
inner join Employees as E on E.EmployeeID = O.EmployeeID
inner join Products as P on D.ProductID = P.ProductID;

-- 17.	Mostrar los 10 productos con menor stock 
 select * from Products order by Stock
LIMIT 10;

-- 18.	Mostrar los 10 productos con mayor stock 
 select * from Products order by Stock DESC
LIMIT 10;

-- 19.	Mostrar los 10 productos con menor precio 
 select * from Products order by Price
LIMIT 10;

-- 20.	Mostrar los 10 productos con mayor precio 
 select * from Products order by Price DESC
LIMIT 10;

-- 21.	Mostrar los 10 productos más baratos 
 select * from Products order by Price
LIMIT 10;

-- 22.	Mostrar los 10 productos más caros 
select * from Products order by Price DESC
LIMIT 10;


----------------------------------------------------------------------------------------------------------------------------------------------------------------

-- 1.	Seleccionar todos los campos de la tabla clientes,ordenar por compania 
 select * from Customers order by CompanyName desc;
 
-- 2.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
 select * from Customers where CompanyName like 'B%' and Country = 'UK' order by CompanyName;

-- 3.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
 select * from Products where CategoryID in (1, 3, 5) order by CategoryID;

-- 4.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
 select * from Products where Price between 50 and 200;

-- 5.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
 SELECT O.OrderID, C.CompanyName, O.CustomerID, O.OrderDate, P.Price, P.ProductName
FROM Customers AS C
INNER JOIN Orders AS O ON C.CustomerID = O.CustomerID
INNER JOIN `OrderDetails` AS OD ON O.OrderID = OD.OrderID
INNER JOIN Products AS P ON OD.ProductID = P.ProductID;

-- 6.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
 SELECT C.CategoryName, COUNT(*) AS 'TOTAL PRODUCTOS'
FROM Categories AS C
INNER JOIN Products AS P ON C.CategoryID = P.CategoryID
GROUP BY C.CategoryName;

-- 7.	Seleccionar los 5 productos mas vendidos 
 SELECT ProductName, SUM(Quantity) AS TotalQuantity
FROM `OrderDetails` AS D
INNER JOIN Products AS P ON D.ProductID = P.ProductID
GROUP BY ProductName
ORDER BY TotalQuantity DESC
LIMIT 5;

-- 8.	Seleccionar los jefes de los empleados 
 SELECT JefesID, CONCAT(LastName, ' ', FirstName) AS NOMBRE FROM Employees where JefesID IS NOT NULL;

-- 9.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
 select * from Products where ProductName LIKE 'M%' and Price between 28 and 129;

-- 10.	Obtener todos los clientes del  Pais de USA,Francia y UK 
 select * from Customers where Country IN ('USA', 'France', 'UK');

-- 11.	Obtener todos los productos descontinuados o con stock cero. 
select * from Products
where Discontinued = 1 OR Stock = 0;

-- 12.	Obtener todas las ordenes hechas por el empleado King Robert 
 SELECT O.OrderID, O.EmployeeID, CONCAT(E.lastname, ' ', E.FirstName) AS NOMBRE_Y_APELLIDO_DEL_EMPLEADO
FROM Orders AS O
INNER JOIN Employees AS E ON O.EmployeeID = E.EmployeeID
WHERE CONCAT(E.lastname, ' ', E.FirstName) = 'King Robert';

-- 13.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
 SELECT O.OrderID, O.CustomerID, C.CompanyName
FROM Orders AS O
INNER JOIN Customers AS C ON O.CustomerID = C.CustomerID
WHERE O.CustomerID = 'QUE DELICIA';

-- 14.	Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
 SELECT O.OrderID, O.EmployeeID, CONCAT(E.lastname, ' ', E.FirstName) AS NOMBRE_Y_APELLIDO_DEL_EMPLEADO
FROM Orders AS O
INNER JOIN Employees AS E ON O.EmployeeID = E.EmployeeID
WHERE CONCAT(E.lastname, ' ', E.FirstName) IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew');

-- 15.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
 SELECT O.OrderID, OD.ProductID, P.ProductName, P.Price, P.Stock
FROM Products AS P
INNER JOIN `OrderDetails` AS OD ON P.ProductID = OD.ProductID
INNER JOIN Orders AS O ON O.OrderID = OD.OrderID
WHERE O.OrderID = 10257;

-- 16.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
 SELECT O.OrderDate, OD.ProductID, P.ProductName, P.Price, P.Stock
FROM Products AS P
INNER JOIN `OrderDetails` AS OD ON P.ProductID = OD.ProductID
INNER JOIN Orders AS O ON O.OrderID = OD.OrderID
WHERE YEAR(O.OrderDate) BETWEEN 1997 AND 2013;

-- 17.	Calcular los 15 productos mas caros 
 	 SELECT * 
FROM Products  
ORDER BY Price DESC
LIMIT 15;

-- 18.	Calcular los 5 productos mas baratos 
 SELECT *
FROM Products
ORDER BY Price
LIMIT 5;

-- 19.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
  SELECT C.CategoryName, P.ProductName, P.Price, P.Stock
FROM Categories AS C
INNER JOIN Products AS P ON C.CategoryID = P.CategoryID;

-- 20.	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
 SELECT C.CategoryName, P.ProductName
FROM Categories AS C
INNER JOIN Products AS P ON C.CategoryID = P.CategoryID
WHERE P.ProductName NOT LIKE 'P%'
ORDER BY C.CategoryName, P.ProductName;

-- 21.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
 SELECT C.CategoryName, P.Stock
FROM Products AS P
INNER JOIN Categories AS C ON P.CategoryID = C.CategoryID;

-- 22.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
 SELECT O.OrderID, C.CompanyName AS CustomerCompanyName, S.CompanyName AS SupplierCompanyName, E.FirstName, P.ProductName
FROM Customers AS C
INNER JOIN Orders AS O ON C.CustomerID = O.CustomerID
INNER JOIN Employees AS E ON O.EmployeeID = E.EmployeeID
INNER JOIN `OrderDetails` AS OD ON O.OrderID = OD.OrderID
INNER JOIN Products AS P ON OD.ProductID = P.ProductID
INNER JOIN Suppliers AS S ON P.SupplierID = S.SupplierID
WHERE O.OrderID = 10794;

-- 23.	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
 SELECT CustomerID, YEAR(OrderDate) AS OrderYear, COUNT(*) AS TotalOrders
FROM Orders
GROUP BY CustomerID, YEAR(OrderDate)
ORDER BY CustomerID, YEAR(OrderDate);

-- 24.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
 SELECT YEAR(OrderDate) AS Year, MONTH(OrderDate) AS Month, COUNT(*) AS TotalOrders
FROM Orders
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY YEAR(OrderDate), MONTH(OrderDate);

--25.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto,
 --cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join 
 SELECT C.CompanyName, O.OrderID, O.OrderDate,
       P.ProductID, OD.Quantity, P.ProductName,
       S.CompanyName AS SupplierName, S.City
FROM Customers AS C
INNER JOIN Orders AS O ON C.CustomerID = O.CustomerID
INNER JOIN `OrderDetails` AS OD ON O.OrderID = OD.OrderID
INNER JOIN Products AS P ON OD.ProductID = P.ProductID
INNER JOIN Suppliers AS S ON P.SupplierID = S.SupplierID;

--26. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra,
 --el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.
 --Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187. 
SELECT C.CompanyName, C.ContactName, O.OrderID, O.OrderDate,
       P.ProductID, OD.Quantity, P.ProductName, S.CompanyName AS SupplierName
FROM Customers AS C
INNER JOIN Orders AS O ON C.CustomerID = O.CustomerID
INNER JOIN `OrderDetails` AS OD ON OD.OrderID = O.OrderID
INNER JOIN Products AS P ON P.ProductID = OD.ProductID
INNER JOIN Suppliers AS S ON S.SupplierID = P.SupplierID
WHERE LEFT(S.CompanyName, 1) BETWEEN 'A' AND 'G'
  AND OD.Quantity BETWEEN 23 AND 187;
  -- -------- ---- -- - -- - - - --------------------------------------------------------------------------------------------------------------------------------------