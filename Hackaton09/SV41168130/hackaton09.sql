use northwind;

-- 1.	Seleccionar los clientes que viven en el país de "usa" 
Select * from Customers where country = 'USA'; 
 
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
 select * from suppliers where city = 'Berlin';
 
-- 3.	Seleccionar los empleados con código 3,5 y 8 
 select * from employees where employeesId in (3, 5, 8);
 
-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
 select * from product where unitsInStock >= 0 and suppliersId in (1, 3, 5);
 
-- 5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
 select * from product where unitPrice between 20 and 90;
 
-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
 select * from orders where orderdate between '1997-01-01 00:00:00' and '1997-07-15 00:00:00';
 
-- 7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
 select * from orders where year(orderDate) = 1997 and employeesId in (1, 3, 4, 8);
 
 -- 8.	Mostrar las ordenes hechas en el año 1996 
 select * from orders where year(orderDate) = 1996;
 
-- 9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
 select * from orders where year(orderDate) = 1997 and month(orderDate) = 4;
 
-- 10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
 select * from orders where orderDate = 1998 and day(orderDate) = 1;
 
-- 11.	Mostrar todos los clientes que no tienen fax 
 select * from customers where fax is null;
 
-- 12.	Mostrar todos los clientes que tienen fax 
 select * from customers where fax is not null;
 
-- 13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
 select pro.productName, pro.unitPrice, pro.unitsInStock, cat.categoryName from product as pro, category as cat
 where pro.categoryId = cat.categoryId;
 
-- 14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 
 select pro.productName as Producto, pro.unitPrice as Precio_Producto, pro.suppliersId as Proveedor_Id, sup.companyName as Proveedor from product as pro, suppliers as sup
 where pro.suppliersId = sup.suppliersId;
 
-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. 
 select ode.orderId, ode.productId, ode.unitPrice, ode.quantity, ode.unitPrice * ode.quantity as Total_Pagado 
 from orderdetails as ode, product as pro
 where ode.productId = pro.productId order by 1 desc;
 
-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
 select ord.orderId, ord.orderDate, ode.productId, ode.unitPrice, ord.employeesId, concat(emp.firstname, ' ', emp.lastname) as Empleado
 from orders as ord, orderdetails as ode, employees as emp
 where ord.orderId = ode.orderId and ord.employeesId = emp.employeesId;
 
-- 17.	Mostrar los 10 productos con menor stock 
 select * from product order by unitsInStock asc limit 10;
 
-- 18.	Mostrar los 10 productos con mayor stock 
 select * from product order by unitsInStock desc limit 10;
 
-- 19.	Mostrar los 10 productos con menor precio 
 select * from product order by unitPrice asc limit 10;
 
-- 20.	Mostrar los 10 productos con mayor precio 
 select * from product order by unitPrice desc limit 10;
  
-- 21.	Mostrar los 10 productos más baratos 
 select * from product order by unitPrice asc limit 10;
 
-- 22.	Mostrar los 10 productos más caros 
 select * from product order by unitPrice desc limit 10;
 
-- 23 Seleccionar todos los campos de la tabla clientes,ordenar por compania
select * from customers order by companyName asc;

-- 24 Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania
select * from customers where companyName like 'P%' and country = 'UK' order by companyName;

-- 25 Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria
select * from product where categoryId in (1, 3, 5) order by categoryId asc;

-- 26 Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
select * from product where unitPrice between 50 and 200 order by unitPrice asc;

-- 27 Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
select ord.orderId as Orden, cus.companyName as Cliente, cus.custId as Id_Cliente, ord.orderDate as Fecha, 
ode.unitPrice as Precio, ode.productId as Id_Producto 
from customers as cus, orders as ord, orderdetails as ode
where cus.custId = ord.custId and ord.orderId = ode.orderId;

-- 28 Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
select cat.categoryId, cat.categoryName, count(pro.categoryId) from product as pro, category as cat
where pro.categoryId = cat.categoryId group by cat.categoryId, pro.categoryId;

-- 29 Seleccionar los 5 productos mas vendidos
select ode.productId, sum(quantity) from orderdetails as ode
inner join product as pro on ode.productId = pro.productId group by ode.productId order by 2 desc limit 5;

-- 30 Seleccionar los jefes de los empleados
select * from employees where employeesId IN (select mgrId from employees group by 1);

-- 31 Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
select * from product where productName like 'M%' and unitPrice between 28 and 129;

-- 32 Obtener todos los clientes del Pais de USA,Francia y UK
select * from customers where country in ('USA', 'France', 'UK') order by country asc;

-- 33 Obtener todos los productos descontinuados o con stock cero.
select * from product where unitsInStock <= 0;

-- 34 Obtener todas las ordenes hechas por el empleado King Robert
update employees set firstname = 'Robert' where employeesid = 7; 
select ord.orderId, concat(emp.lastName, ' ', emp.firstName) as Empleado from orders as ord, employees as emp
where ord.employeesId = emp.employeesId and concat(emp.lastName, ' ', emp.firstName) = 'King Robert';

-- 35 Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
update customers set companyName = 'Que delicia' where custId = 91; 
select ord.orderId, cus.custId, cus.companyName from orders as ord, customers as cus 
where ord.custId = cus.custId and cus.companyName = 'Que delicia';

-- 36 Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
select ord.orderId as Orden, concat(emp.lastname, ' ', emp.firstname) as Empleado 
from orders as ord, employees as emp where ord.employeesId = emp.employeesId and concat(emp.lastname,' ', emp.firstname) in ('King Robert', 'Davolio Nancy', 'Fuller Andrew', 'Lew Judy');

-- 37 Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
select pro.productId, pro.productName, pro.unitPrice, pro.unitsInStock from product as pro, orderdetails as ode 
where ode.productId = pro.productId and ode.orderId in (10257);

-- 38 Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
select pro.productId, pro.productName, pro.unitPrice, pro.unitsInStock, year(ord.orderDate) from product as pro, orders as ord, orderdetails as ode 
where ord.orderId = ode.orderId and ode.productId = pro.productId and year(ord.orderDate) >= 1997 order by ord.orderDate asc; 

-- 39 Calcular los 15 productos mas caros
select productId, productName, unitPrice from product order by unitPrice desc limit 5;

-- 40 Calcular los 5 productos mas baratos
select productId, productName, unitPrice from product order by unitPrice asc limit 5;

-- 41 Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.
select cat.categoryName, pro.productName, pro.unitPrice, pro.unitsInStock from category as cat, product as pro
where cat.categoryId = pro.categoryId;

-- 42 Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P
select cat.categoryName, pro.productName from category as cat, product as pro where cat.categoryId = pro.categoryId 
and pro.productName NOT REGEXP '^[P]';

-- 43 Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.
select categoryName, count(unitsInStock) as stock_real, FLOOR( RAND() * 100 + 100) as stock_dummy  from category as cat, product as pro 
where cat.categoryId = pro.categoryId group by categoryName;

-- 44 Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
select cus.companyName as Cliente, sup.companyName as Proveedor, concat(emp.firstName, ' ', emp.lastName) as Empleado, pro.productName
from orders as ord, orderdetails as ode, customers as cus, suppliers as sup, employees as emp, product as pro 
where ord.OrderID = 10794 and ord.OrderID = ode.OrderID and ord.custID = cus.custID 
and ode.ProductID = pro.ProductID and ord.employeesId = emp.employeesId and pro.suppliersId = sup.suppliersId;

-- 45 Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
select custId, year(OrderDate), count(*) from Orders group by custId, year(OrderDate) order by 1,2;

-- 46 Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
select year(OrderDate), month(OrderDate), count(OrderDate) from orders group by year(OrderDate), month(OrderDate);

/* 47 Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra
	, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora 
    y la ciudad del proveedor ,usar Join */

	select cus.companyName, ord.OrderID, ord.OrderDate, ode.ProductID, ode.Quantity, 
    pro.ProductName, sup.companyName, sup.City
    from ((((customers as cus
    inner join orders as ord on cus.custId = ord.custId)
    inner join orderdetails as ode on ord.OrderID = ode.OrderID)
    inner join product as pro on ode.ProductID = pro.ProductID)
    inner join suppliers as sup on pro.SuppliersID = sup.SuppliersID)
    order by ord.OrderID;
    
/* 48 Seleccionar el nombre de la compañía del cliente, nombre del contacto, 
   el código de la orden de compra, la fecha de la orden de compra, 
   el código del producto,cantidad pedida del producto, nombre del producto 
   y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras 
   que comienzan con la letra de la A hasta la letra G,además la cantidad 
   pedida del producto debe estar entre 23 y 187. */
   
   select cus.CompanyName as Nombre_cliente, cus.ContactName as Nombre_contacto, ord.OrderID, ord.OrderDate, 
   ode.ProductID, ode.quantity as Cantidad, pro.ProductName as Nombre_Producto, sup.contactName as Contacto_Proveedor
   from ((((customers as cus 
   inner join orders as ord on cus.custId = ord.custId)
   inner join orderdetails as ode on ord.orderID = ode.orderID)
   inner join product as pro on ode.productID = pro.productID)
   inner join suppliers as sup on pro.suppliersId = sup.suppliersId)
   where sup.contactName REGEXP '^[A-G]' and ode.quantity between 23 and 187
   order by ord.OrderID;
   