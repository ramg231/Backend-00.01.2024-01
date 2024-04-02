-- 1.	Seleccionar los clientes que viven en el país de "usa" 
        Select * from Customers where country = 'USA';
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
        select * from Suppliers where city = 'Berlin';
-- 3.   Seleccionar los empleados con código 3,5 y 8 
        select * from employees where employeesID in(3,5,8);
---4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 
        select * from product 
        where suppliersId in(1,3,5) and unitsInStock>10;
--5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 
        select * from product
        where unitPrice between 20 and 90;
--6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 
        select * from orders
        where orderDate between '1997-01-01' and '1997-07-15';
--7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 
        select * from orders
        where year(orderDate)=1997 and employeesID in(1,3,4,8);
--8.	Mostrar las ordenes hechas en el año 1996 
        select * from orders
        where year(OrderDate)=1996;
--9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril 
        select * from orders
        where orderDate between '1997-04-01' and '1997-04-30';
--10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 
        select * from orders
        where YEAR(OrderDate) = 2008 AND DAY(OrderDate) = 1;
--11.	Mostrar todos los clientes que no tienen fax 
        select * from customers
        where fax is null;
--12.	Mostrar todos los clientes que tienen fax 
        select * from customers
        where fax is  not null;
--13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. 
        select product.productName, product.unitPrice, product.unitsInStock, category.categoryName 
        from product
        JOIN category ON Product.categoryId = Category.categoryId;
--14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. 
        select product.productName, product.unitPrice, suppliers.suppliersId, suppliers.companyName 
        from product
        JOIN suppliers ON Product.categoryId = suppliers.suppliersId;
--15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto. 
        SELECT OrderDetails.OrderId, OrderDetails.productID, product.unitPrice, OrderDetails.quantity, 
       (OrderDetails.unitPrice * OrderDetails.quantity) AS TotalPaid
        FROM OrderDetails
        JOIN product ON OrderDetails.productId = product.productId;
--16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. 
        SELECT Orders.OrderID, Orders.OrderDate, OrderDetails.ProductID, Product.UnitPrice,
        Employees.EmployeesID, Employees.FirstName, Employees.LastName
        from orders
        JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
        JOIN Product ON OrderDetails.ProductID = Product.ProductID
        JOIN Employees ON Orders.EmployeesID = Employees.EmployeesID;
--17.	Mostrar los 10 productos con menor stock 
        SELECT productId, productName, unitsInStock
        from product
        ORDER BY unitsInStock ASC LIMIT 10;
--18.	Mostrar los 10 productos con mayor stock 
        SELECT productId, productName, unitsInStock
        from product
        ORDER BY unitsInStock DESC LIMIT 10;
--19.	Mostrar los 10 productos con menor precio 
        select productId, productName, unitPrice 
        from product
        order by unitPrice asc limit 10;
--20.	Mostrar los 10 productos con mayor precio 
        select productId, productName, unitPrice 
        from product
        order by unitPrice desc limit 10;
--21.	Mostrar los 10 productos más baratos 
        select productId, productName, unitPrice 
        from product
        order by unitPrice asc limit 10;
--22.	Mostrar los 10 productos más caros 
        select productId, productName, unitPrice 
        from product
        order by unitPrice desc limit 10;
--1.	Seleccionar todos los campos de la tabla clientes,ordenar por compania 
        select * from customers
        order by companyName;
--2.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania 
        SELECT * FROM customers
        WHERE companyName LIKE 'customers B%' and country = 'UK'
        ORDER BY companyName;
--3.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria 
        select * from product
        where categoryId in (1,3,5)
        order by categoryId;
--4.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 
        select * from product 
        where unitPrice between 50 and 200;
--5.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden 
        SELECT Customers.CustId, Customers.CompanyName, Orders.OrderDate, 
        OrderDetails.UnitPrice, Product.ProductName
        FROM Customers
        JOIN Orders ON Customers.CustId = Orders.CustId
        JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
        JOIN Product ON OrderDetails.ProductID = Product.ProductID;       
--6.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. 
        select category.categoryName, COUNT(Product.ProductID) AS NumeroDeProductos
        FROM Category
        LEFT JOIN Product ON Category.CategoryID = Product.CategoryID
        GROUP BY Category.CategoryName;
--7.	Seleccionar los 5 productos mas vendidos 
        SELECT Product.ProductName, SUM(OrderDetails.Quantity) AS TotalVendido
        FROM Product
        JOIN OrderDetails ON Product.ProductID = OrderDetails.ProductID
        GROUP BY Product.ProductName
        ORDER BY TotalVendido DESC
        LIMIT 5;
--8.	Seleccionar los jefes de los empleados 
        
--9.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 
        select * from product
        where productName like 'Product M%' and unitPrice between 28 and 129;
--10.	Obtener todos los clientes del  Pais de USA,Francia y UK 
        select * from customers
        where country in ('USA','Francia','UK');
--11.	Obtener todos los productos descontinuados o con stock cero. 
        SELECT *
        FROM Product
        WHERE Discontinued = 1 OR UnitsInStock = 0;
--12.	Obtener todas las ordenes hechas por el empleado King Robert 
        SELECT EmployeesId
        FROM Employees
        WHERE FirstName like 'Robert' AND LastName like 'King';

        SELECT *        
        FROM orders
        WHERE EmployeesId = (SELECT EmployeesId FROM Employees WHERE FirstName = 'Robert' AND LastName = 'King');
--13.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" 
        select custId 
        from customers
        where companyName like 'Que delicia';

        select * 
        from orders
        where custId = (select custId from customers where companyName = 'Que delicia');
--14.	Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew 
        SELECT *
        FROM Employees
        WHERE CONCAT(LastName, ' ', FirstName) IN ('King Roberto', 'Davolio Nancy', 'Fuller Andrew');


        SELECT *
        FROM Orders
        WHERE EmployeesId IN (
        SELECT EmployeesId
        FROM Employees
        WHERE CONCAT(LastName, ' ', FirstName) IN ('King Roberto', 'Davolio Nancy', 'Fuller Andrew')
        );
--15.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257 
        SELECT 
        p.ProductID AS Codigo,
        p.ProductName AS Nombre,
        p.UnitPrice AS Precio,
        od.Quantity AS Stock
        FROM 
        OrderDetails od
        JOIN 
        Product p ON od.ProductID = p.ProductID
        WHERE 
        od.OrderID = 10257;
--16.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. 
        SELECT 
        p.ProductID AS Codigo,
        p.ProductName AS Nombre,
        p.UnitPrice AS Precio,
        SUM(od.Quantity) AS Stock
        FROM 
        Orders o
        JOIN 
        OrderDetails od ON o.OrderID = od.OrderID
        JOIN 
        Product p ON od.ProductID = p.ProductID
        WHERE 
        o.OrderDate BETWEEN '1997-01-01' AND CURDATE()
        GROUP BY 
        p.ProductID, p.ProductName, p.UnitPrice;
--17.	Calcular los 15 productos mas caros 
        SELECT ProductID, ProductName, UnitPrice
        FROM Product
        ORDER BY UnitPrice DESC
        LIMIT 15;
--18.	Calcular los 5 productos mas baratos 
        select productName, unitPrice 
        from product
        order by unitPrice asc limit 5;
--19.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
        SELECT 
        c.CategoryName AS Categoria,
        p.ProductName AS NombreProducto,
        p.UnitPrice AS Precio,
        SUM(od.Quantity) AS Stock
        FROM 
        Category c
        JOIN 
        Product p ON c.CategoryID = p.CategoryID
        LEFT JOIN 
        OrderDetails od ON p.ProductID = od.ProductID
        GROUP BY 
        c.CategoryName, p.ProductName, p.UnitPrice;
--20.	Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P 
        SELECT 
        c.CategoryName AS Categoria,
        p.ProductName AS NombreProducto
        FROM 
        Category c
        JOIN 
        Product p ON c.CategoryID = p.CategoryID
        WHERE 
        p.ProductName NOT LIKE 'Product P%'
        ORDER BY 
        c.CategoryName, p.ProductName;
--21.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. 
        SELECT 
        c.CategoryName AS Categoria,
        SUM(p.UnitsInStock) AS StockPorCategoria
        FROM 
        Category c
        JOIN 
        Product p ON c.CategoryID = p.CategoryID
        GROUP BY 
        c.CategoryName;
--22.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794 
        SELECT 
        c.CompanyName AS NombreCliente,
        s.CompanyName AS NombreProveedor,
        CONCAT(e.FirstName, ' ', e.LastName) AS NombreEmpleado,
        p.ProductName AS NombreProducto
        FROM 
        Orders o
        JOIN 
        Customers c ON o.CustID = c.CustID
        JOIN 
        Employees e ON o.EmployeesID = e.EmployeesID
        JOIN 
        OrderDetails od ON o.OrderID = od.OrderID
        JOIN 
        Product p ON od.ProductID = p.ProductID
        JOIN 
        Suppliers s ON p.SuppliersID = s.SuppliersID
        WHERE 
        o.OrderID = 10794;
--23.	Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año. 
        SELECT 
        CustID,
        YEAR(OrderDate) AS Año,
        COUNT(*) AS NumOrdenes
        FROM 
        Orders
        GROUP BY 
        CustID, YEAR(OrderDate)
        ORDER BY 
        CustID, Año;
--24.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. 
        SELECT 
        YEAR(OrderDate) AS Año,
        MONTH(OrderDate) AS Mes,
        COUNT(*) AS NumOrdenes
        FROM 
        Orders
        GROUP BY 
        YEAR(OrderDate), MONTH(OrderDate)
        ORDER BY 
        YEAR(OrderDate), MONTH(OrderDate);
--25.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join 
        SELECT 
        c.CompanyName AS NombreCliente,
        o.OrderID AS CodigoOrdenCompra,
        o.OrderDate AS FechaOrdenCompra,
        od.ProductID AS CodigoProducto,
        od.Quantity AS CantidadPedida,
        p.ProductName AS NombreProducto,
        s.CompanyName AS NombreProveedor,
        s.City AS CiudadProveedor
        FROM 
        Customers c
        JOIN 
        Orders o ON c.CustID = o.CustID
        JOIN 
        OrderDetails od ON o.OrderID = od.OrderID
        JOIN 
        Product p ON od.ProductID = p.ProductID
        JOIN 
        Suppliers s ON p.SuppliersID = s.SuppliersID;
--26. Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, 
        --el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.
        --Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto 
        --debe estar entre 23 y 187. 

        SELECT 
        c.CompanyName AS NombreCliente,
        c.ContactName AS NombreContacto,
        o.OrderID AS CodigoOrdenCompra,
        o.OrderDate AS FechaOrdenCompra,
        od.ProductID AS CodigoProducto,
        od.Quantity AS CantidadPedida,
        p.ProductName AS NombreProducto,
        s.CompanyName AS NombreProveedor
        FROM 
        Customers c
        JOIN 
        Orders o ON c.CustID = o.CustID
        JOIN 
        OrderDetails od ON o.OrderID = od.OrderID
        JOIN 
        Product p ON od.ProductID = p.ProductID
        JOIN 
        Suppliers s ON p.SuppliersID = s.SuppliersID
        WHERE 
        s.CompanyName BETWEEN 'A' AND 'G'
        AND od.Quantity BETWEEN 23 AND 187;