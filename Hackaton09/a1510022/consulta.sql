use Northwind;

-- 1.	Seleccionar los clientes que viven en el país de "usa" 
SELECT *
FROM customers
WHERE country = 'USA';

-- 2. Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
SELECT *
FROM suppliers
WHERE city = 'BERLIN';

-- 3. Seleccionar los empleados con código 3,5 y 8 
SELECT *
FROM employees
WHERE employeeID IN (3, 5, 8);

-- 4. Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
SELECT *
FROM products
WHERE unit > 0
AND SupplierID IN (1, 3, 5);

-- 5. Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
SELECT *
FROM products 
where Price >= 20 and Price <= 90;

-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 

SELECT * 
FROM orders  
where OrderDate BETWEEN '1997-01-01' AND '1997-07-15';

-- 7.  Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 

SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1997
AND employeeID IN (1, 3, 4, 8);

-- 8.  Mostrar las ordenes hechas en el año 1996 
SELECT * 
FROM  orders
where year(OrderDate) = 1996;

-- 9. Mostrar las ordenes hechas en el año 1997 ,del mes de abril
SELECT * 
FROM  orders
where year(OrderDate) = 1997 
and month(OrderDate) = 4 ;

-- 10. Mostrar las ordenes hechas el primero de todos los meses, del año 1998 

SELECT *
FROM orders
WHERE YEAR(OrderDate) = 1998
AND DAY(OrderDate) = 1;

-- 11. Mostrar todos los clientes que no tienen fax
SELECT *
FROM customers
WHERE fax IS NULL OR fax = '';

-- 12 . Mostrar todos los clientes que tienen fax 
SELECT *
FROM customers
WHERE fax IS NOT NULL OR fax != '';

-- 13. 	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
SELECT Products.ProductName AS NombreProducto, Products.Price AS Precio, Products.Unit AS stock, Categories.CategoryName AS NombreCategoria
FROM Products
INNER JOIN Categories ON Products.CategoryID = Categories.CategoryID;

-- 14. Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 

SELECT Products.ProductName AS NombreProducto, Products.Price AS Precio, Products.SupplierID AS CodProveedor, Suppliers.SupplierName AS NombreProveedor
FROM Products
INNER JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID;

-- 15. Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.

SELECT OrderDetails.OrderID AS NumOrden, OrderDetails.ProductID AS CodigoProducto, 
       Products.Price AS Precio, OrderDetails.Quantity,
       (OrderDetails.Quantity * Products.Price) AS TotalPago
FROM OrderDetails
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID;


-- 16. Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 

SELECT Orders.OrderID AS NumOrder, Orders.OrderDate, 
       OrderDetails.ProductID AS CodigoProducto, Products.Price AS Precio, 
       Orders.EmployeeID AS CodEmpleado, CONCAT(Employees.FirstName, ' ', Employees.LastName) AS NombreEmpleado
FROM Orders
INNER JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID
INNER JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID;

-- 17  Mostrar los 10 productos con menor stock 
SELECT ProductID, ProductName, Unit
FROM Products
ORDER BY Unit ASC
LIMIT 10;

-- 18  Mostrar los 10 productos con mayor stock
SELECT ProductID, ProductName, Unit
FROM Products
ORDER BY Unit DESC
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

-- **************************************PARTE DOS*******************************************



-- 1.	Seleccionar todos los campos de la tabla clientes,ordenar por compania 
SELECT * FROM customers
order by CustomerName;
 
-- 2.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
 SELECT *
FROM customers
WHERE CustomerName LIKE 'B%' AND Country = 'UK'
ORDER BY CustomerName;
 
-- 3.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
 SELECT *
FROM products
WHERE categoryID IN (1, 3, 5)
ORDER BY categoryID;

-- 4.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
 SELECT *
FROM products
WHERE Price BETWEEN 50 AND 200;

-- 5.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 

 SELECT 
    c.CustomerID, c.CustomerName,
    o.OrderDate,
    p.Price,
    p.ProductName
FROM
    customers c
        INNER JOIN
    orders o ON c.CustomerID = o.CustomerID
        INNER JOIN
    orderdetails od ON o.OrderID = od.OrderID
        INNER JOIN
    products p ON od.ProductID = p.ProductID;
    
    select * from orders ;
    
-- 6.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
 
 SELECT 
    c.CategoryName,
    COUNT(p.ProductID) AS NumProducts
FROM
    categories c
        LEFT JOIN
    products p ON c.CategoryID = p.CategoryID
GROUP BY c.CategoryID, c.CategoryName
ORDER BY NumProducts DESC;
 
-- 7.	Seleccionar los 5 productos mas vendidos 
 SELECT 
    p.ProductID,
    p.ProductName,
    SUM(od.Quantity) AS CantidadVendido
FROM
    orderdetails od
    INNER JOIN products p ON od.ProductID = p.ProductID
GROUP BY p.ProductID, p.ProductName
ORDER BY CantidadVendido DESC
LIMIT 5;

-- 8.	Seleccionar los jefes de los empleados 

SELECT 
    E.EmployeeID AS CodigoEmpleado,
    E.LastName AS Apellido,
    E.FirstName AS Nombre,
    E.Title AS Cargo,
    E1.EmployeeID AS JefeID,
    E1.LastName AS ApellidoJefe,
    E1.FirstName AS NombreJefe
FROM
    Employees E
    INNER JOIN Employees E1 ON E.ReportsTo = E1.EmployeeID;
 
 
-- 9.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
 SELECT *
FROM Products
WHERE ProductName LIKE 'M%'
AND Price BETWEEN 28 AND 129;
 
-- 10.	Obtener todos los clientes del  Pais de USA,Francia y UK 
 SELECT *
FROM customers 
where COUNTRY IN ('USA','FRANCE','UK');
 
-- 11.	Obtener todos los productos descontinuados o con stock cero. 
 SELECT *
FROM Products
WHERE Discontinued = 1 OR Unit= 0;
 

-- 12.	Obtener todas las ordenes hechas por el empleado King Robert 

 SELECT *
FROM Orders
WHERE EmployeeID IN (SELECT EmployeeID FROM Employees WHERE FirstName = 'Robert' AND LastName = 'King');
 
 
-- 13.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
 
 SELECT *
FROM Orders
WHERE CustomerID IN (SELECT CustomerID FROM Customers WHERE CustomerName = 'Que delicia');
 
 
-- 14.	Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
 
 SELECT *
FROM Orders
WHERE EmployeeID IN (
    SELECT EmployeeID 
    FROM Employees
    WHERE CONCAT(LastName, ' ' ,FirstName)  IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew')
);


-- 15.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
 
 SELECT Products.ProductID AS Codigo,
       Products.ProductName AS Nombre,
       Products.Price AS Precio,
       OrderDetails.Quantity AS Stock
FROM OrderDetails
JOIN Products ON OrderDetails.ProductID = Products.ProductID
WHERE OrderDetails.OrderID = 10257;

select *from orderdetails;
-- 16.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
 
 SELECT DISTINCT Products.ProductID AS Codigo,
                Products.ProductName AS Nombre,
                Products.Price AS Precio,
                SUM(OrderDetails.Quantity) AS Stock
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON OrderDetails.ProductID = Products.ProductID
WHERE YEAR(Orders.OrderDate) >= 1997
GROUP BY Products.ProductID, Products.ProductName, Products.Price;

-- 17.	Calcular los 15 productos mas caros 
 	 SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price DESC
LIMIT 15;

-- 18.	Calcular los 5 productos mas baratos 
  SELECT ProductID, ProductName, Price
FROM Products
ORDER BY Price ASC
LIMIT 15;
 
-- 19.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
 
 SELECT 
    c.CategoryName AS Categoria,
    p.ProductName AS Producto,
    p.Price AS Precio,
    p.Unit AS Stock
FROM 
    Products p
JOIN 
    Categories c ON p.CategoryID = c.CategoryID
ORDER BY 
    Categoria, Producto;
    
-- 20.	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
 
 SELECT 
    c.CategoryName AS Categoria,
    p.ProductName AS Producto
FROM 
    Products p
JOIN 
    Categories c ON p.CategoryID = c.CategoryID
WHERE 
    p.ProductName NOT LIKE 'P%'
ORDER BY 
    Categoria, Producto;

-- 21.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
 SELECT 
    c.CategoryName AS Categoria,
    SUM(p.Unit) AS Stock
FROM 
    Products p
JOIN 
    Categories c ON p.CategoryID = c.CategoryID
GROUP BY 
    c.CategoryName;
 
-- 22.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
 SELECT 
    Customers.CustomerName AS NombreCliente,
    Suppliers.SupplierName AS NombreProveedor,
    Employees.FirstName  || ' ' || Employees.LastName AS NombreEmpleado,
    Products.ProductName AS NombreProducto
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
    Orders.OrderID = 10422;
    select * from employees;
    
-- 23.	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
 
 SELECT 
    Customers.CustomerID AS CodigoCliente,
    YEAR(Orders.OrderDate) AS Año,
    COUNT(Orders.OrderID) AS NumeroOrdenes
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY 
    Customers.CustomerID, YEAR(Orders.OrderDate)
ORDER BY 
    CodigoCliente, Año;
    
-- 24.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
 
 SELECT 
    YEAR(OrderDate) AS Año,
    MONTH(OrderDate) AS Mes,
    COUNT(*) AS NumeroOrdenes
FROM 
    Orders
GROUP BY 
    YEAR(OrderDate), MONTH(OrderDate)
ORDER BY 
    Año, Mes;
-- 25.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join 
 
 SELECT 
    Customers.CustomerName AS NombreCliente,
    Orders.OrderID AS CodigoOrdenCompra,
    Orders.OrderDate AS FechaOrdenCompra,
    Products.ProductID AS CodigoProducto,
    OrderDetails.Quantity AS CantidadPedida,
    Products.ProductName AS NombreProducto,
    Suppliers.SupplierName AS NombreCompaniaProveedor,
    Suppliers.City AS CiudadProveedor
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID;
 
-- 26. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187. 
 select
  Customers.CustomerName AS NombreCliente,
    Customers.ContactName AS NombreContacto,
    Orders.OrderID AS CodigoOrdenCompra,
    Orders.OrderDate AS FechaOrdenCompra,
    Products.ProductID AS CodigoProducto,
    OrderDetails.Quantity AS CantidadPedida,
    Products.ProductName AS NombreProducto,
    Suppliers.SupplierName AS NombreCompaniaProveedor
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID
JOIN 
    OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN 
    Products ON OrderDetails.ProductID = Products.ProductID
JOIN 
    Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE 
    Suppliers.SupplierName BETWEEN 'A' AND 'G'
    AND OrderDetails.Quantity BETWEEN 23 AND 187;

 
 

