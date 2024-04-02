-- 1.	Seleccionar los clientes que viven en el país de "usa" 
    Select * from Customers where country = 'USA';
-- 2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" 
    select * from Suppliers where city = 'Berlin';
-- 3.	Seleccionar los empleados con código 3,5 y 8
    SELECT *  FROM Employees  WHERE EmployeeID IN (3, 5, 8);
-- 4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
     SELECT * FROM products  WHERE unit > 0  AND SupplierID IN (1, 3, 5);
-- 5.	Seleccione los productos con precio mayor o igual a 20 y menor o igual a 90
    SELECT * FROM products where Price >= 20 AND Price <= 90;
 -- 6.   Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997
    SELECT * FROM orders where OrderDate BETWEEN '1997-01-01' AND '1997-07-05';
-- 7. Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
	 SELECT * FROM orders  WHERE YEAR(OrderDate) = 1997  AND EmployeeID IN (1, 3, 4, 8);
-- 8. Mostrar las órdenes hechas en el año 1996
	 SELECT * FROM orders WHERE YEAR(OrderDate) = 1996;
-- 9 . Mostrar las órdenes hechas en el año 1997, del mes de abril.
	 SELECT * FROM orders WHERE YEAR(OrderDate) = 1997 AND MONTH(OrderDate) = 04; 
-- 10 . Mostrar las órdenes hechas el primero de todos los meses, del año 1998
	SELECT * FROM orders WHERE YEAR(OrderDate) = 1998 AND DAY(OrderDate) = 1;      
-- 11 . Mostrar todos los clientes que no tienen fax
	ALTER TABLE Customers ADD COLUMN fax VARCHAR(20);
	SELECT * FROM Customers WHERE fax IS NULL;
-- 12 . Mostrar todos los clientes que tienen fax
	SELECT * FROM Customers WHERE fax IS NOT NULL;

-- 13 . Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.
		SELECT 
			p.productName, 
			p.price, 
			p.unit, 
			c.categoryName
		FROM 
			Products p
		JOIN 
			Categories c ON p.categoryId = c.categoryId;
            
-- 14 . Mostrar el nombre del producto, el precio del producto, el código del proveedor y el nombre de la compañía proveedora.

		SELECT 
			p.productName, 
			p.price, 
			p.supplierID, 
			s.companyName
		FROM 
			Products p
		JOIN 
			Suppliers s ON p.supplierID = s.supplierID;
            
            
-- 15 . Mostrar el número de pedido, el código del producto, el precio, la cantidad y el total pagado por producto.

		SELECT 
			od.orderID,
			od.productID,
			od.price,
			od.quantity,
			(od.price * od.quantity) AS total_pagado
		FROM 
			OrderDetails od;
            
-- 16 . Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
		SELECT 
			o.order,
			o.order_date,
			od.productID,
			od.price,
			o.employee_id,
			CONCAT(e.first_name, ' ', e.last_name) AS employee_name
		FROM 
			Orders o
		JOIN 
			OrderDetails od ON o.orderID = od.orderID
		JOIN 
			Employees e ON o.employeeID = e.employeeID;
			   
-- 17 . Mostrar los 10 productos con menor stock
		SELECT * FROM products ORDER BY unit LIMIT 5;    
      
-- 18 . Mostrar los 10 productos con mayor stock
		SELECT * FROM products ORDER BY unit LIMIT 100;
        
-- 19 . Mostrar los 10 productos con menor precio
		SELECT * FROM products ORDER BY Price ASC LIMIT 10;

-- 20 . Mostrar los 10 productos con mayor precio
		SELECT * FROM Products ORDER BY price DESC LIMIT 10;
        
-- 21 . Mostrar los 10 productos más baratos
		SELECT * FROM Products ORDER BY Price ASC LIMIT 10;
        
-- 22 . Mostrar los 10 productos más caros
		SELECT * FROM Products ORDER BY Price DESC LIMIT 10;
        
-- 23 . Seleccionar todos los campos de la tabla clientes,ordenar por compania
		SELECT *  FROM clientes ORDER BY compania;
        
-- 24. Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania

	SELECT * FROM clientes WHERE compania LIKE 'B%' AND country = 'UK' ORDER BY compania;
    
-- 25 . Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria
		SELECT *
		FROM productos
		WHERE categoria_id IN (1, 3, 5)
		ORDER BY categoria_id;
-- 26 . Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
		SELECT *
		FROM productos
		WHERE precio_unitario BETWEEN 50 AND 200;
-- 27 . Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
		SELECT clientes.nombre AS nombre_cliente, clientes.id_compania, ordenes.fecha, detalles_orden.precio_unitario, productos.nombre AS nombre_producto
		FROM clientes
		JOIN ordenes ON clientes.id_cliente = ordenes.id_cliente
		JOIN detalles_orden ON ordenes.id_orden = detalles_orden.id_orden
		JOIN productos ON detalles_orden.id_producto = productos.id_producto;
-- 28 . Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
		SELECT categorias.nombre AS nombre_categoria, COUNT(*) AS numero_productos
		FROM productos
		JOIN categorias ON productos.categoria_id = categorias.id_categoria
		GROUP BY categorias.nombre;
-- 29 . Seleccionar los 5 productos mas vendidos
		SELECT *
		FROM productos
		ORDER BY ventas DESC
		LIMIT 5;
-- 30 . Seleccionar los jefes de los empleados
		SELECT jefe
		FROM empleados;
-- 31 . Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 -- 32 . 
		SELECT *
		FROM productos
		WHERE nombre_producto LIKE 'M%' AND precio BETWEEN 28 AND 129;
-- 32 . Obtener todos los clientes del Pais de USA,Francia y UK
		SELECT *
		FROM clientes
		WHERE country IN ('USA', 'France', 'UK');
-- 33 . Obtener todos los productos descontinuados o con stock cero.
		SELECT *
		FROM productos
		WHERE descontinuado = 1 OR stock = 0;
-- 34 . Obtener todas las ordenes hechas por el empleado King Robert
		SELECT *
		FROM ordenes
		JOIN empleados ON ordenes.id_empleado = empleados.id_empleado
		WHERE empleados.nombre_empleado = 'King Robert';
-- 35 . Obtener todas las ordenes por el cliente cuya compania es "Que delicia"
		SELECT *
		FROM ordenes
		JOIN clientes ON ordenes.id_cliente = clientes.id_cliente
		WHERE clientes.compania = 'Que delicia';
-- 36 . Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
		SELECT *
		FROM ordenes
		JOIN empleados ON ordenes.id_empleado = empleados.id_empleado
		WHERE empleados.nombre_empleado IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew');
-- 37 . Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
		SELECT productos.codigo_producto, productos.nombre_producto, detalles_orden.precio_unitario, detalles_orden.cantidad AS stock
		FROM ordenes
		JOIN detalles_orden ON ordenes.numero_orden = detalles_orden.numero_orden
		JOIN productos ON detalles_orden.codigo_producto = productos.codigo_producto
		WHERE ordenes.numero_orden = 10257;
-- 38 . Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
		SELECT productos.codigo_producto, productos.nombre_producto, detalles_orden.precio_unitario, detalles_orden.cantidad AS stock
		FROM ordenes
		JOIN detalles_orden ON ordenes.numero_orden = detalles_orden.numero_orden
		JOIN productos ON detalles_orden.codigo_producto = productos.codigo_producto
		WHERE ordenes.fecha_orden >= '1997-01-01' AND ordenes.fecha_orden <= CURDATE();
-- 39 . Calcular los 15 productos mas caros
		SELECT *
		FROM productos
		ORDER BY precio DESC
		LIMIT 15;
-- 40 . Calcular los 5 productos mas baratos
		SELECT *
		FROM productos
		ORDER BY precio
		LIMIT 5;
-- 41 . Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. 
		SELECT c.nombre_categoria, p.nombre_producto, p.precio, p.stock
		FROM categorias c
		JOIN productos p ON c.id_categoria = p.id_categoria;
-- 42 . Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P
		SELECT c.nombre_categoria, p.nombre_producto, p.precio, p.stock
		FROM categorias c
		JOIN productos p ON c.id_categoria = p.id_categoria
		WHERE p.nombre_producto NOT LIKE 'P%';
-- 43 . Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.
		SELECT c.nombre_categoria, SUM(p.stock) AS stock_por_categoria
		FROM categorias c
		JOIN productos p ON c.id_categoria = p.id_categoria
		GROUP BY c.nombre_categoria;
-- 44 . Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794
		SELECT c.nombre_cliente, p.nombre_producto, e.nombre_empleado, prov.nombre_proveedor
		FROM ordenes o
		JOIN detalles_orden do ON o.numero_orden = do.numero_orden
		JOIN clientes c ON o.id_cliente = c.id_cliente
		JOIN productos p ON do.codigo_producto = p.codigo_producto
		JOIN proveedores prov ON p.id_proveedor = prov.id_proveedor
		JOIN empleados e ON o.id_empleado = e.id_empleado
		WHERE o.numero_orden = 10794;
-- 45 . Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.
		SELECT c.codigo_cliente, YEAR(o.fecha_orden) AS año, COUNT(*) AS numero_ordenes
		FROM ordenes o
		JOIN clientes c ON o.id_cliente = c.id_cliente
		GROUP BY c.codigo_cliente, YEAR(o.fecha_orden)
		ORDER BY c.codigo_cliente, YEAR(o.fecha_orden);
-- 46 . Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.
		SELECT YEAR(fecha_orden) AS año, MONTH(fecha_orden) AS mes, COUNT(*) AS numero_ordenes
		FROM ordenes
		GROUP BY YEAR(fecha_orden), MONTH(fecha_orden)
		ORDER BY YEAR(fecha_orden), MONTH(fecha_orden);
-- 47 . Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra,código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y  la ciudad del proveedor ,usar Join
		SELECT c.nombre_compañia AS nombre_cliente, o.codigo_orden_compra, o.fecha_orden_compra, 
		p.codigo_producto, do.cantidad_pedida, p.nombre_producto, pr.nombre_compañia AS nombre_proveedor, pr.ciudad_proveedor
		FROM ordenes o
		JOIN detalles_orden do ON o.codigo_orden_compra = do.codigo_orden_compra
		JOIN clientes c ON o.id_cliente = c.id_cliente
		JOIN productos p ON do.codigo_producto = p.codigo_producto
		JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor;
-- 48 . Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fechade la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre dela compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta a letra G,además la cantidad pedida del producto debe estar entre 23 y 187.
		SELECT c.nombre_compañia AS nombre_cliente, c.nombre_contacto, o.codigo_orden_compra, o.fecha_orden_compra, 
		p.codigo_producto, do.cantidad_pedida, p.nombre_producto, pr.nombre_compañia AS nombre_proveedor
		FROM ordenes o
		JOIN detalles_orden do ON o.codigo_orden_compra = do.codigo_orden_compra
		JOIN clientes c ON o.id_cliente = c.id_cliente
		JOIN productos p ON do.codigo_producto = p.codigo_producto
		JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
		WHERE pr.nombre_compañia BETWEEN 'A' AND 'G' AND do.cantidad_pedida BETWEEN 23 AND 187;