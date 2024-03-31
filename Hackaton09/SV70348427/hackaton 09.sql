/*1 Seleccionar los clientes que viven en el país de "usa"*/
SELECT * FROM Customers where country='USA';
/*2 Seleccionar los proveedores que viven en la ciudad de "BERLIN"*/
SELECT * FROM Suppliers where city='Berlin';
/*3 Seleccionar los empleados con código 3,5 y 8*/
SELECT * FROM Customers WHERE CustomerID in (3,5,8);
/*4 Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5*/
SELECT * FROM Products WHERE supplierID in(1,3,5) AND Stock > 0;
/*5 Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90*/
SELECT * FROM Products WHERE Price >=20 AND Price <=90;
/*6 Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997*/
SELECT * FROM Orders WHERE OrderDate between '1997/01/01' AND '1997/07/15';
/*7 Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8*/
SELECT * FROM Orders WHERE YEAR(OrderDate)=1997 AND EmployeeID IN(1,3,4,8);
/*8 Mostrar las ordenes hechas en el año 1996*/
SELECT * FROM Orders where YEAR(OrderDate)=1996;
/*9 Mostrar las ordenes hechas en el año 1997 ,del mes de abril*/
SELECT * FROM Orders WHERE YEAR(OrderDate)=1997 AND MONTH(OrderDate)=04;
/*10 Mostrar las ordenes hechas el primero de todos los meses, del año 1998*/
SELECT * FROM Orders WHERE day(OrderDate)=01 AND YEAR(OrderDate)=1998;
/*11 Mostrar todos los clientes que no tienen fax*/
SELECT * FROM Customers where fax=false;
/*12 Mostrar todos los clientes que tienen fax*/
SELECT * FROM Customers where fax=true;
/*13 Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.*/
SELECT p.Productname, p.Price, p.Stock, c.CategoryName FROM Products p INNER JOIN Categories c on p.categoryId=c.categoryId;
/*14*/
SELECT p.ProductName,p.Price,p.supplierID, s.SupplierName FROM Products p INNER JOIN Suppliers s on p.supplierID =s.supplierID;
/*15 Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto*/
SELECT o.OrderID,o.ProductID,p.Price, o.Quantity, p.price*o.Quantity as 'Total' FROM OrderDetails o INNER JOIN Products p ON o.ProductID=p.ProductID;
/*16 Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.*/
SELECT o.OrderID,o.OrderDate,d.ProductID, p.Price,e.EmployeeID,concat(e.Firstname,' ',e.lastname) as 'Nombre Empleado'
FROM orderdetails d INNER JOIN Orders o on d.OrderID=o.OrderID 
INNER JOIN Products p on d.ProductID=p.ProductID
INNER JOIN Employees e on o.EmployeeID=e.EmployeeID;
/*17*/
SELECT * FROM Products ORDER BY stock ASC LIMIT 10;
/*18*/
SELECT * FROM Products ORDER BY stock DESC LIMIT 10;
/*19*/
SELECT * FROM Products ORDER BY Price ASC LIMIT 10;
/*20*/
SELECT * FROM Products ORDER BY Price DESC LIMIT 10;
/*21*/
SELECT * FROM Products ORDER BY Price ASC LIMIT 10;
/*22*/
SELECT * FROM Products ORDER BY Price DESC LIMIT 10;
/*23*/
SELECT * FROM customers order by Company DESC;
/*24*/
SELECT * FROM Customers WHERE Company like 'M%' AND Country='UK'ORDER BY Company DESC;
/*25*/
SELECT * FROM products where categoryid in(1,3,5) ORDER BY categoryID ASC;
/*26*/
select * from products WHERE Price between 50 AND 200;
/*27 Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden*/
SELECT * FROM Customers;
/*28 Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.*/
SELECT c.Categoryname, count(p.productID) as 'Nro. productos' FROM Categories c inner join products p on c.categoryID=p.categoryID GROUP BY Categoryname;
/*29 Seleccionar los 5 productos mas vendidos*/
SELECT o.productid, o.quantity,p.productname FROM OrderDetails o inner join Products p on o.productid=p.productID ORDER BY Quantity desc limit 5;
/*30 Seleccionar los jefes de los empleados*/
select c.bossID,b.bossname from customers c inner join bosses b on c.bossID=b.bossID;
/*31 Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129*/
SELECT * FROM Products WHERE Productname LIKE 'M%' AND Price between 28 and 129;
/*32 Obtener todos los clientes del Pais de USA,Francia y UK*/
SELECT * FROM Customers WHERE Country in('USA','France','UK');
/*33 Obtener todos los productos descontinuados o con stock cero.*/
SELECT * FROM Products WHERE Stock=0;
/*34 Obtener todas las ordenes hechas por el empleado King Robert*/
SELECT e.lastname, e.firstname, o.orderid, o.orderdate, o.shipperid FROM Orders o inner join employees e on o.employeeid=e.employeeid WHERE e.employeeid=7;
/*35 Obtener todas las ordenes por el cliente cuya compania es "Que delicia"*/
SELECT * FROM ORDERS o INNER JOIN Customers c on o.customerid=c.customerid WHERE c.company="Que delicia";
/*36 Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew*/
SELECT * FROM orders WHERE employeeid in(1,2,7);
/*37 Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257*/
select p.productid,p.productname,p.price,p.stock,o.orderid from products p inner join orderdetails o on p.productid=o.productid where orderid=10257;

/*38 Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.*/
select p.productid,p.productname,p.price,p.stock,o.orderid,r.orderdate from products p 
inner join orderdetails o on p.productid=o.productid 
inner join orders r on o.orderid=r.orderid where year(r.orderdate) between 1997 and 2024;
/*39 Calcular los 15 productos mas caros*/
SELECT * FROM Products ORDER BY Price desc limit 15;
/*40 Calcular los 5 productos mas baratos*/
SELECT * FROM Products ORDER BY Price asc limit 15;
/*41 Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.*/
SELECT c.categoryname, p.productname, p.price, p.stock FROM Categories c inner join products p on c.categoryid=p.categoryid;
/*42 Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P*/
SELECT c.categoryname, p.productname, p.price, p.stock FROM Categories c inner join products p on c.categoryid=p.categoryid WHERE p.productname NOT LIKE 'P%'; 
/*43 Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.*/
SELECT c.categoryname,sum(p.stock) as 'stock total' FROM PRODUCTS p INNER JOIN categories c on p.categoryid=c.categoryid;
/*44 Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los
productos que estan en la orden 10794*/
SELECT c.customername, s.suppliername,e.lastname,e.firstname, p.productname,o.orderid FROM Customers c 
inner join orders o on c.customerid=o.customerid
inner join employees e on o.employeeid=e.employeeid
inner join orderdetails d on o.orderid=d.orderid
inner join products p on d.productid=p.productid
inner join suppliers s on p.supplierid=s.supplierid WHERE o.ORDERID=10294;

/*45 Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del
cliente y el año.*/
SELECT c.customerid, YEAR(o.orderdate) AS 'Año', COUNT(*) AS num_ordenes
FROM orders o
JOIN customers c ON o.customerid = c.customerid
GROUP BY c.customerid, YEAR(o.orderdate)
ORDER BY c.customerid, YEAR(o.orderdate);
/*46 Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por
año y por mes.*/
SELECT YEAR(orderdate) AS 'Año', MONTH(orderdate) AS 'Mes', COUNT(*) AS 'Nro Ordenes'
FROM orders
GROUP BY YEAR(orderdate), MONTH(orderdate)
ORDER BY YEAR(orderdate), MONTH(orderdate);

/*47 Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la
orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre
de la compañía proveedora y la ciudad del proveedor ,usar Join*/
SELECT c.company, o.orderid, o.orderdate, d.productid, d.quantity, p.productname, s.suppliername,s.city FROM Customers c
INNER JOIN orders o on o.customerid=c.customerid
inner join orderdetails d on o.orderid=d.orderid
inner join products p on d.productid=d.productid
inner join Suppliers s on p.supplierid=s.supplierid;

/*48 Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la 
orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del
producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las
compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad
pedida del producto debe estar entre 23 y 187.*/
SELECT c.company,c.contactname, o.orderdate, d.orderid, d.productid, d.quantity, p.productname, s.suppliername from customers c
INNER JOIN orders o on c.customerid=o.customerid
INNER JOIN orderdetails d on o.orderid=d.orderid
INNER JOIN products p on d.productid=p.productid
INNER JOIN suppliers s on p.supplierid=s.supplierid
where suppliername like 'A%' OR suppliername like 'B%' OR suppliername like 'C%' OR 
suppliername like 'D%' OR suppliername like 'E%' OR suppliername like 'F%' OR suppliername like 'G%' AND d.quantity between 23 and 187



