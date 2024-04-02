Seleccionar los clientes que viven en el país de "usa"
SELECT * FROM Customers WHERE country = 'USA';

Seleccionar los proveedores que viven en la ciudad de "BERLIN"
SELECT * FROM Suppliers WHERE city = 'BERLIN'; 

Seleccionar los empleados con código 3,5 y 8
SELECT * FROM Employees WHERE codigo IN (3, 5, 8);

Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5
SELECT * FROM Productos 
WHERE stock > 0 
AND proveedor_id IN (1, 3, 5);

Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90
SELECT * FROM Productos 
WHERE precio >= 20 
AND precio <= 90;

Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997

SELECT * FROM OrdenesCompra
WHERE fecha_orden BETWEEN '1997-01-01' AND '1997-07-15';

Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8
SELECT * 
FROM OrdenesCompra 
WHERE YEAR(fecha_orden) = 1997 
AND empleado_codigo IN (1, 3, 4, 8);

Mostrar las ordenes hechas en el año 1996
SELECT * 
FROM OrdenesCompra 
WHERE YEAR(fecha_orden) = 1996;

Mostrar las ordenes hechas en el año 1997 ,del mes de abril
SELECT * 
FROM OrdenesCompra 
WHERE YEAR(fecha_orden) = 1997 
AND MONTH(fecha_orden) = 4;

Mostrar las ordenes hechas el primero de todos los meses, del año 1998
SELECT * 
FROM OrdenesCompra 
WHERE YEAR(fecha_orden) = 1998 
AND DAY(fecha_orden) = 1;

Mostrar todos los clientes que no tienen fax

SELECT * 
FROM Customers 
WHERE fax IS NULL OR fax = '';

Mostrar todos los clientes que tienen fax
SELECT * 
FROM Customers 
WHERE fax IS NOT NULL AND fax != '';

Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece.

SELECT Productos.nombre AS Nombre_Producto, 
       Productos.precio AS Precio,
       Productos.stock AS Stock,
       Categorias.nombre AS Nombre_Categoria
FROM Productos
JOIN Categorias ON Productos.categoria_id = Categorias.id;

Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora.
SELECT Productos.nombre AS Nombre_Producto, 
       Productos.precio AS Precio,
       Productos.proveedor_id AS Codigo_Proveedor,
       Proveedores.nombre_compania AS Nombre_Compania
FROM Productos
JOIN Proveedores ON Productos.proveedor_id = Proveedores.id;

Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.
SELECT OrdenesCompra.numero_orden AS Numero_Orden,
       DetallesOrdenes.codigo_producto AS Codigo_Producto,
       Productos.precio AS Precio,
       DetallesOrdenes.cantidad AS Cantidad,
       (Productos.precio * DetallesOrdenes.cantidad) AS Total_Pagado
FROM OrdenesCompra
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto;

Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo.
SELECT OrdenesCompra.numero_orden AS Numero_Orden,
       OrdenesCompra.fecha AS Fecha,
       DetallesOrdenes.codigo_producto AS Codigo_Producto,
       Productos.precio AS Precio,
       OrdenesCompra.codigo_empleado AS Codigo_Empleado,
       CONCAT(Empleados.nombre, ' ', Empleados.apellido) AS Nombre_Completo_Empleado
FROM OrdenesCompra
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
JOIN Empleados ON OrdenesCompra.codigo_empleado = Empleados.codigo_empleado;

Mostrar los 10 productos con menor stock

SELECT *
FROM Productos
ORDER BY stock ASC
LIMIT 10;

Mostrar los 10 productos con mayor stock
SELECT *
FROM Productos
ORDER BY stock DESC
LIMIT 10;

Mostrar los 10 productos con menor precio

SELECT *
FROM Productos
ORDER BY precio ASC
LIMIT 10;
Mostrar los 10 productos con mayor precio
SELECT *
FROM Productos
ORDER BY precio DESC
LIMIT 10;

Mostrar los 10 productos más baratos

SELECT *
FROM Productos
ORDER BY precio ASC
LIMIT 10;
Mostrar los 10 productos más caros

SELECT *
FROM Productos
ORDER BY precio DESC
LIMIT 10;

Seleccionar todos los campos de la tabla clientes,ordenar por compania

SELECT *
FROM clientes
ORDER BY compania;

Seleccionar todos los campos de clientes,cuya compania empiece con la letra B y pertenezcan a UK ,ordenar por nombre de la compania

SELECT *
FROM clientes
WHERE compania LIKE 'B%'
AND pais = 'UK'
ORDER BY compania;

Seleccionar todos los campos de productos de las categorias 1,3 y 5 ,ordenar por categoria

SELECT *
FROM productos
WHERE categoria IN (1, 3, 5)
ORDER BY categoria;

Seleccionar los productos cuyos precios unitarios estan entre 50 y 200
SELECT *
FROM productos
WHERE precio_unitario BETWEEN 50 AND 200;
Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden
SELECT Clientes.nombre_compania AS Nombre_Compania,
       Clientes.id_cliente AS ID_Compania,
       OrdenesCompra.fecha AS Fecha,
       DetallesOrdenes.precio_unitario AS Precio_Unitario,
       Productos.nombre_producto AS Nombre_Producto
FROM OrdenesCompra
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
JOIN Clientes ON OrdenesCompra.id_cliente = Clientes.id_cliente;

Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria.
SELECT Categorias.nombre AS Nombre_Categoria, COUNT(*) AS Numero_Productos
FROM Productos
JOIN Categorias ON Productos.id_categoria = Categorias.id
GROUP BY Categorias.nombre;

Seleccionar los 5 productos mas vendidos

SELECT codigo_producto, COUNT(*) AS total_ventas
FROM Ventas
GROUP BY codigo_producto
ORDER BY total_ventas DESC
LIMIT 5;

Seleccionar los jefes de los empleados

SELECT jefe.nombre AS Nombre_Jefe, empleado.nombre AS Nombre_Empleado
FROM Empleados empleado
JOIN Empleados jefe ON empleado.id_jefe = jefe.id;

Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129
SELECT *
FROM Productos
WHERE nombre_producto LIKE 'M%' AND precio BETWEEN 28 AND 129;

Obtener todos los clientes del Pais de USA,Francia y UK

SELECT *
FROM clientes
WHERE pais IN ('USA', 'Francia', 'UK');

Obtener todos los productos descontinuados o con stock cero.

SELECT *
FROM Productos
WHERE estado = 'descontinuado' OR stock = 0;

Obtener todas las ordenes hechas por el empleado King Robert

SELECT 99999999
FROM Empleados
WHERE nombre_empleado = 'King Robert';
SELECT *
FROM Ordenes
WHERE 99999999 = (SELECT 99999999 FROM Empleados WHERE nombre_empleado = 'King Robert');

Obtener todas las ordenes por el cliente cuya compania es "Que delicia"

SELECT 123456
FROM Clientes
WHERE nombre_compania = 'Que delicia';
SELECT *
FROM OrdenesCompra
WHERE 123456 = (SELECT 123456 FROM Clientes WHERE nombre_compania = 'Que delicia');

Obtener todas las ordenes hechas por el empleado King Robert,Davolio Nancy y Fuller Andrew
SELECT id_empleado
FROM Empleados
WHERE nombre_empleado IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew');
SELECT *
FROM OrdenesCompra
WHERE id_empleado IN (SELECT id_empleado FROM Empleados WHERE nombre_empleado IN ('King Robert', 'Davolio Nancy', 'Fuller Andrew'));

Obtener todos los productos(codigo,nombre,precio,stock) de la orden 10257
SELECT Productos.codigo_producto, Productos.nombre_producto, Productos.precio, DetallesOrdenes.stock
FROM DetallesOrdenes
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
WHERE DetallesOrdenes.numero_orden = 10257;

Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy.
SELECT Productos.codigo_producto, Productos.nombre_producto, Productos.precio, DetallesOrdenes.stock
FROM OrdenesCompra
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
WHERE OrdenesCompra.fecha >= '1997-01-01' AND OrdenesCompra.fecha <= CURDATE();

Calcular los 15 productos mas caros

SELECT *
FROM Productos
ORDER BY precio DESC
LIMIT 15;

Calcular los 5 productos mas baratos

SELECT *
FROM Productos
ORDER BY precio ASC
LIMIT 5;

Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock.}
SELECT Categorias.nombre AS Nombre_Categoria, Productos.nombre_producto AS Nombre_Producto, Productos.precio, DetallesOrdenes.stock
FROM Productos
JOIN Categorias ON Productos.id_categoria = Categorias.id_categoria
LEFT JOIN DetallesOrdenes ON Productos.codigo_producto = DetallesOrdenes.codigo_producto;

Obtener el nombre de todas las categorias y los nombres de sus productos,solo los productos que su nombre no comience con la letra P

SELECT Categorias.nombre AS Nombre_Categoria, Productos.nombre_producto AS Nombre_Producto
FROM Productos
JOIN Categorias ON Productos.id_categoria = Categorias.id_categoria
WHERE Productos.nombre_producto NOT LIKE 'P%';

Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria.

SELECT Categorias.nombre AS Nombre_Categoria, SUM(Productos.stock) AS Stock_Por_Categoria
FROM Productos
JOIN Categorias ON Productos.id_categoria = Categorias.id_categoria
GROUP BY Categorias.nombre;

Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado y el nombre de los productos que estan en la orden 10794

SELECT Clientes.nombre AS Nombre_Cliente, Proveedores.nombre AS Nombre_Proveedor, Empleados.nombre AS Nombre_Empleado, Productos.nombre_producto AS Nombre_Producto
FROM OrdenesCompra
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Clientes ON OrdenesCompra.id_cliente = Clientes.id_cliente
JOIN Empleados ON OrdenesCompra.id_empleado = Empleados.id_empleado
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
JOIN Proveedores ON Productos.id_proveedor = Proveedores.id_proveedor
WHERE OrdenesCompra.numero_orden = 10794;

Mostrar el numero de ordenes de cada uno de los clientes por año,luego ordenar codigo del cliente y el año.

SELECT Clientes.codigo_cliente, YEAR(OrdenesCompra.fecha) AS Anio, COUNT(*) AS Numero_Ordenes
FROM OrdenesCompra
JOIN Clientes ON OrdenesCompra.id_cliente = Clientes.id_cliente
GROUP BY Clientes.codigo_cliente, Anio
ORDER BY Clientes.codigo_cliente, Anio;

Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes.

SELECT YEAR(fecha) AS Anio, MONTH(fecha) AS Mes, COUNT(*) AS Numero_Ordenes
FROM OrdenesCompra
GROUP BY YEAR(fecha), MONTH(fecha)
ORDER BY YEAR(fecha), MONTH(fecha);

Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,la fecha de la orden de compra, código del producto, cantidad pedida del producto,nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join

SELECT Clientes.nombre_compania AS Nombre_Compania_Cliente, OrdenesCompra.numero_orden AS Codigo_Orden_Compra, OrdenesCompra.fecha AS Fecha_Orden_Compra, 
       Productos.codigo_producto AS Codigo_Producto, DetallesOrdenes.cantidad AS Cantidad_Pedida, Productos.nombre_producto AS Nombre_Producto, 
       Proveedores.nombre_compania AS Nombre_Compania_Proveedor, Proveedores.ciudad AS Ciudad_Proveedor
FROM OrdenesCompra
JOIN Clientes ON OrdenesCompra.id_cliente = Clientes.id_cliente
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
JOIN Proveedores ON Productos.id_proveedor = Proveedores.id_proveedor;


Seleccionar el nombre de la compañía del cliente, nombre del contacto, el código de la orden de compra, la fecha de la orden de compra, el código del producto,cantidad pedida del producto, nombre del producto y el nombre de la compañía proveedora, usas JOIN.Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,además la cantidad pedida del producto debe estar entre 23 y 187.

SELECT Clientes.nombre_compania AS Nombre_Compania_Cliente, Clientes.nombre_contacto AS Nombre_Contacto, OrdenesCompra.numero_orden AS Codigo_Orden_Compra, 
       OrdenesCompra.fecha AS Fecha_Orden_Compra, DetallesOrdenes.codigo_producto AS Codigo_Producto, DetallesOrdenes.cantidad AS Cantidad_Pedida, 
       Productos.nombre_producto AS Nombre_Producto, Proveedores.nombre_compania AS Nombre_Compania_Proveedor
FROM OrdenesCompra
JOIN Clientes ON OrdenesCompra.id_cliente = Clientes.id_cliente
JOIN DetallesOrdenes ON OrdenesCompra.numero_orden = DetallesOrdenes.numero_orden
JOIN Productos ON DetallesOrdenes.codigo_producto = Productos.codigo_producto
JOIN Proveedores ON Productos.id_proveedor = Proveedores.id_proveedor
WHERE Proveedores.nombre_compania REGEXP '^[A-G]' AND DetallesOrdenes.cantidad BETWEEN 23 AND 187;






