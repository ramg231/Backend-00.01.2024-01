-- 1 Seleccionar los clientes que viven en el país de "usa" 
  Select * from Customers where country = 'USA';
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
select * from suppliers   where city = 'BERLIN';
-- 3.	Seleccionar los empleados con código 3,5 y 8 
select * from employees where  EmployeeID in (3,5,8);
-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
 Select 
 p.*,
 s.companyName,
ord.* 
from product p 
inner join suppliers s on p.suppliersId = s.suppliersID
inner join orderdetails ord on ord.productId = p.ProductId
where s.suppliersId in (1,3,5)
and ord.quantity>0;
-- select * from products  where stock>0 and SupplierID in (1,3,5)
-- 5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
 select * from products where price >= 20 and price <= 90;
-- 6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
select * from orders where OrderDate between '1997-01-01' and '1997-07-15';
-- 7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
	select * from  orders where YEAR(OrderDate) = '1997' and EmployeeID in (1,3,4,8);
-- 8.	Mostrar las ordenes hechas en el año 1996 
	select * from  orders where YEAR(OrderDate) = '1996';
-- 9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
	select * from  orders where DATE_FORMAT(OrderDate, '%Y-%m') = '1997-04';
-- 10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
	select * from  orders where YEAR(OrderDate) = 1998 AND DAYOFMONTH(OrderDate) = 1;
-- 11.	Mostrar todos los clientes que no tienen fax 
	select * from customers where fax IS NULL OR fax = '';
-- 12.	Mostrar todos los clientes que tienen fax 
		select * from customers	where fax IS NOT NULL AND fax <> '';
-- 13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
	select ProductName,price,Stock,cat.CategoryName from products  pr
    inner join categories cat on pr.CategoryID = cat.CategoryID;
-- 14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 
	select ProductName,Price,pr.SupplierID,sup.SupplierName from products pr 
    inner join suppliers sup  on pr.SupplierID = sup.SupplierID;
-- 15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. 
	select 
    od.OrderDetailID,
    od.ProductID,
    pr.Price,
    od.Quantity,
    pr.price * od.Quantity as TOTAL
    from orderdetails od
    inner join products pr on od.ProductID = pr.ProductID;
-- 16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
	select od.OrderID,
		   ords.OrderDate,
           od.ProductID ,
           od.ProductID,
           pr.Price,
           ords.EmployeeID,
			CONCAT(em.FirstName, ' ', em.LastName) AS NombreCompleto
    from orderdetails  od
    inner join orders ords on od.OrderID = ords.OrderID
	inner join products pr on od.ProductID = pr.ProductID
    inner join employees em on ords.EmployeeID = em.EmployeeID;
-- 17.	Mostrar los 10 productos con menor stock 
	select * from products 
    order by Stock asc  limit 10;
-- 18.	Mostrar los 10 productos con mayor stock 
	select * from products 
    order by Stock desc  limit 10;
-- 19.	Mostrar los 10 productos con menor precio 
	select * from products 
    order by price asc  limit 10;
-- 20.	Mostrar los 10 productos con mayor precio 
	select * from products 
    order by price desc  limit 10;
-- 21.	Mostrar los 10 productos más baratos 
	select * from products 
    order by price asc  limit 10;
-- 22.	Mostrar los 10 productos más caros 
	select * from products 
    order by price desc  limit 10;
-- 23.	Seleccionar todos los campos de la tabla clientes,ordenar por compania 
	select * from customers
    order by CustomerName; 
-- 24.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
	select * from customers
    where CustomerName like 'B%' and Country='UK';
-- 25	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
	select * from products where CategoryID in (1,3,5) 
    order by CategoryID;
-- 26	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
	select * from products where  price between 50 and 200
	order by price ;
-- 27 Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
	select 
    cus.CustomerID,
    cus.CustomerName,
    od.OrderDate,
    odd.ProductID,
    pr.Price
    
    from customers  cus
	inner join orders od on cus.CustomerID = od.CustomerID
    inner join orderdetails odd on od.OrderID = odd.OrderID
    inner join products pr on odd.ProductID = pr.ProductID;
    
--  28.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
		select cat.Description  ,
		   COUNT(pr.ProductID) AS NdeProductos
		from categories cat
		inner join products pr ON cat.CategoryID = pr.CategoryID
		group by cat.CategoryID, cat.Description;
-- 29.	Seleccionar los 5 productos mas vendidos 
	select 
		pr.ProductName,
        od.Quantity
		from orderdetails od
        inner join products pr on od.ProductID = pr.ProductID
     order by  od.Quantity desc 
     limit 5;
-- 30	Seleccionar los jefes de los empleados 
		 
-- 31	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
	select * 
    from products
    where ProductName like 'M%' and Price between 28 and 129;
	
-- 32	Obtener todos los clientes del  Pais de USA,Francia y UK 
	select * 
    from customers 
    where Country in ('USA','FRANCE','UK');
-- 33	Obtener todos los productos descontinuados o con stock cero. 
	select * 
    from products
    where Stock = 0 ; 
-- 34	Obtener todas las ordenes hechas por el empleado King Robert 
	select 
    ord.OrderID,
    em.EmployeeID,
    CONCAT(em.FirstName, ' ', em.LastName) AS NombreCompleto
    from orders ord
    inner join  employees em on ord.EmployeeID = em.EmployeeID 
    where em.FirstName = 'Robert' and em.LastName='King';
     
-- 35	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
	select 
    ods.OrderID,
    cus.CustomerName
    from orders  ods
    inner join  customers cus on ods.CustomerID = cus.CustomerID
    where cus.CustomerName = 'Que delicia';
    
-- 36	Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
	select ord.OrderID,
       em.EmployeeID,
       CONCAT(em.FirstName, ' ', em.LastName) AS NombreCompleto
		from orders ord
		inner join employees em on ord.EmployeeID = em.EmployeeID
		where (em.FirstName = 'Robert' and em.LastName = 'King')
		or (em.FirstName = 'Nancy' and em.LastName = 'Davolio')
		or (em.FirstName = 'Andrew' and em.LastName = 'Fuller');
-- 37	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
	select 
    pr.ProductID,
    pr.ProductName,
    pr.Price,
    pr.Stock
    from orderdetails ordd
    inner join products pr on ordd.ProductID = pr.ProductID
     where OrderID=10257;
    
-- 38	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
		select 
        pr.ProductID,
		pr.ProductName,
		pr.Price,
		pr.Stock,
        ord.OrderDate
		from orderdetails ordd
        inner join orders ord on ordd.OrderID = ord.OrderID
        inner join products pr on ordd.ProductID = pr.ProductID
        where   YEAR(ord.OrderDate) between '1997' and '2024';
-- 39	Calcular los 15 productos mas caros 
		select * 
        from products 
        order by price desc
        limit 15;
	
-- 40	Calcular los 5 productos mas baratos 
		select * 
        from products 
        order by price asc
        limit 5;
-- 41	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
		select 
		cat.CategoryName,
        pr.ProductName,
        pr.Price,
        pr.Stock
        from categories cat
        inner join products pr on cat.CategoryID = pr.CategoryID;
-- 42	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
	select 
		cat.CategoryName,
        pr.ProductName,
        pr.Price,
        pr.Stock
        from categories cat
        inner join products pr on cat.CategoryID = pr.CategoryID
       where  pr.ProductName NOT LIKE 'P%';
-- 43	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
	select 
    cat.CategoryName,
    sum(pr.Stock)
    from categories cat 
    inner join products pr on cat.CategoryID = pr.CategoryID
    group by cat.CategoryName ;
-- 44	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
	select 
    ords.OrderID,
    cus.CustomerName,
    supp.SupplierName,
	em.FirstName,
    pr.ProductName
	from products pr
    inner join  suppliers  supp on pr.SupplierID = supp.SupplierID
    inner join orderdetails ordd on pr.ProductID = ordd.ProductID
    inner join orders ords on ordd.OrderID = ords.OrderID
    inner join customers cus on ords.CustomerID = cus.CustomerID
    inner join employees em on ords.EmployeeID = em.EmployeeID
    where ords.OrderID = 10794;
    
-- 45	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
		select 
        CustomerID,
        year(OrderDate)
        from orders
        order by CustomerID,OrderDate;

-- 46.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
		select 
        year(OrderDate) as Año,
        month(OrderDate) as Mes,
        count(*) as 'Cantidad de Ordenes'
        from orders
        group by year(OrderDate), month(OrderDate);
      
        
-- 47	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, 
-- código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor 
-- ,usar Join 
	select 
    cus.CustomerName,
	ords.OrderID,
    ords.OrderDate,
    pr.ProductID,
	ordd.Quantity,
    pr.ProductName,
    supp.SupplierName,
    supp.City
	from products pr
    inner join  suppliers  supp on pr.SupplierID = supp.SupplierID
    inner join orderdetails ordd on pr.ProductID = ordd.ProductID
    inner join orders ords on ordd.OrderID = ords.OrderID
    inner join customers cus on ords.CustomerID = cus.CustomerID
    inner join employees em on ords.EmployeeID = em.EmployeeID;

-- 48 Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, 
-- la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora,
 -- usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe 
 -- estar entre 23 y 187 
 select 
    cus.CustomerName,
	cus.ContactName,
    ords.OrderID,
    ords.OrderDate,
    pr.ProductID,
	ordd.Quantity,
    pr.ProductName,
    supp.SupplierName,
    supp.City
	from products pr
    inner join  suppliers  supp on pr.SupplierID = supp.SupplierID
    inner join orderdetails ordd on pr.ProductID = ordd.ProductID
    inner join orders ords on ordd.OrderID = ords.OrderID
    inner join customers cus on ords.CustomerID = cus.CustomerID
    inner join employees em on ords.EmployeeID = em.EmployeeID
    where   
     SUBSTRING(supp.SupplierName, 1, 1) BETWEEN 'A' AND 'G' and 
    ordd.Quantity between 23 and 187