--Seleccionar los clientes que viven en el país de "usa"
select * from Customers where country = 'USA';


--Seleccionar los proveedores que viven en la ciudad de "BERLIN"
select * from suppliers where city = 'Berlin';


--Seleccionar los empleados con código 3,5 y 8
select * from employees where EmployeeID in (3,5,8);


--Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
select * from products where Stock > 0 and SupplierID in (1,3,5);


--Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
select * from products where Price between 20 and 90;


--Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997
select * from orders where OrderDate between '1997-01-01' and '1997-07-15';


--Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
select * from orders where year(OrderDate) = 1997 and EmployeeID in (1,3,4,8);


--Mostrar las ordenes hechas en el año 1996
select * from orders where year(OrderDate) = 1996;


--Mostrar las ordenes hechas en el año 1997 ,del mes de abril
select * from orders where year(OrderDate) = 1997 and month(OrderDate) = 4;


--Mostrar las ordenes hechas el primero de todos los meses, del año 1998
select * from orders where year(OrderDate) = 1998 and day(OrderDate) = 1;


--Mostrar todos los clientes que no tienen fax
select * from customers where fax is null;


--Mostrar todos los clientes que tienen fax
select * from customers where fax is not null;


--Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.
select p.ProductName, p.Price, p.Stock, c.CategoryName from products p join categories c on p.CategoryID = c.CategoryID;


--Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
select p.ProductName, p.Price, s.SupplierID, s.SupplierName from products p join suppliers s on p.SupplierID = s.SupplierID;


--Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.
select o.OrderDetailID, p.ProductID, p.Price, o.Quantity, p.Price * o.Quantity as SubTotal from orderdetails o join products p on o.ProductID = p.ProductID;


--Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
select o.OrderID, o.OrderDate, od.ProductID, p.Price, e.EmployeeID, concat(e.FirstName, " ", e.LastName) as Nombre from orders o join employees e on o.EmployeeID = e.EmployeeID join orderdetails od on o.OrderID = od.OrderID join products p on p.ProductID = od.ProductID;


--Mostrar los 10 productos con menor stock
select * from products order by stock asc limit 10;


--Mostrar los 10 productos con mayor stock
select * from products order by stock desc limit 10;


--Mostrar los 10 productos con menor precio
select * from products order by Price asc limit 10;


--Mostrar los 10 productos con mayor precio
select * from products order by Price desc limit 10;


--Mostrar los 10 productos más baratos
select * from products order by Price asc limit 10;


--Mostrar los 10 productos más caros
select * from products order by Price desc limit 10;


--Seleccionar todos los campos de la tabla clientes,ordenar por compania
select * from customers order by CustomerName;



--Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania
select * from customers where CustomerName like 'B%' and Country = 'UK' order by CustomerName;


--Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria
select * from products where CategoryID in (1,3,5) order by CategoryID;


--Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
select * from products where Price between 50 and 200;


--Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
select c.CustomerName, c.CustomerID, o.OrderDate, p.Price, p.ProductName from customers c join orders o on c.CustomerID = o.CustomerID join orderdetails od on od.OrderID = o.OrderID join products p on p.ProductID = od.ProductID; 


--Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
select c.CategoryName, sum(stock) as Stock from categories c join products p on c.CategoryID = p.CategoryID group by c.CategoryName;


--Seleccionar los 5 productos mas vendidos
select p.ProductName , sum(Quantity) as Cantidad_Vendida from orderdetails od join products p on od.ProductID = p.ProductID group by p.ProductID order by Cantidad_Vendida desc limit 5;


--Seleccionar los jefes de los empleados



--Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
select * from products where ProductName like 'M%' and Price between 28 and 129;


--Obtener todos los clientes del Pais de USA,Francia y UK
select * from customers where Country in ('USA', 'France', 'UK');


--Obtener todos los productos descontinuados o con stock cero.
select * from products where Stock = 0;


--Obtener todas las ordenes hechas por el empleado King Robert
select o.OrderID, concat(e.LastName, " ", e.FirstName) as Empleado from orders o join employees e on o.EmployeeID = e.EmployeeID where concat(e.LastName, " ", e.FirstName) = 'King Robert';


--Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
select * from orders o join customers c on o.CustomerID = c.CustomerID where c.CustomerName = 'Que delicia';


--Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
select o.OrderID, concat(e.LastName, " ", e.FirstName) as Empleado from orders o join employees e on o.EmployeeId = e.EmployeeID where e.EmployeeID in (select EmployeeID from Employees where concat(Employees.LastName, " ", Employees.FirstName) in ('King Robert', 'Davolio Nancy', 'Fuller Andrew'));


--Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
select p.ProductID, p.ProductName, p.Price, od.Quantity from orderdetails od join products p on od.ProductID = p.ProductID where od.OrderID = 10257;


--Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
select p.ProductID, p.ProductName, p.Price, od.Quantity from orders o join orderdetails od on o.OrderID = od.OrderID join products p on od.ProductID = p.ProductID where o.OrderDate > '1997-01-01';


--Calcular los 15 productos mas caros
select * from products order by Price desc limit 15;	


--Calcular los 5 productos mas baratos
select * from products order by Price asc limit 5;


--Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
select c.CategoryName, p.ProductName, p.Price, p.Stock from products p join categories c on p.CategoryID = c.CategoryID;


--Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P
select c.CategoryName, p.ProductName, p.Price, p.Stock from products p join categories c on p.CategoryID = c.CategoryID where p.ProductName not like 'P%';


--Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.
select c.CategoryName, sum(stock) as Stock from categories c join products p on c.CategoryID = p.CategoryID group by c.CategoryName;


--Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
select c.CustomerName, s.SupplierName, concat(e.FirstName, " ", e.LastName) as Empleado, p.ProductName  from customers c join orders o on c.CustomerID = o.CustomerID join orderdetails od on od.OrderID = o.OrderID join products p on p.ProductID = od.ProductID join suppliers s on s.SupplierID = p.SupplierID join employees e on e.EmployeeID = o.EmployeeID where o.OrderID = 10429;


--Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
select CustomerID ,count(OrderID) as Pedidos, year(OrderDate) as Año from orders group by CustomerID, year(OrderDate) order by CustomerID, year(OrderDate);


--Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
select month(OrderDate), year(OrderDate), count(OrderID) as Ordenes from orders group by year(OrderDate), month(OrderDate) order by year(OrderDate), month(OrderDate);


--Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join
select c.CustomerName, o.OrderID, o.OrderDate, p.ProductID, od.Quantity, p.ProductName, s.SupplierName, s.City from customers c join orders o on c.CustomerID = o.CustomerID join orderdetails od on o.OrderID = od.OrderID join products p on p.ProductID = od.ProductID join suppliers s on s.SupplierID = p.SupplierID;


--Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187.
select c.CustomerName, c.ContactName, o.OrderID, o.OrderDate, p.ProductID, od.Quantity, p.ProductName, s.SupplierName from customers c join orders o on c.CustomerID = o.CustomerID join orderdetails od on o.OrderID = od.OrderID join products p on p.ProductID = od.ProductID join suppliers s on s.SupplierID = p.SupplierID where s.SupplierName RLIKE '^[abcdefg]' and od.Quantity between 23 and 187;
