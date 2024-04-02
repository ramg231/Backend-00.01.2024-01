/*1.	Seleccionar los clientes que viven en el país de "usa" */
select * from customers where Country = 'USA';

/*2.	Seleccionar los proveedores que viven en la ciudad de "BERLIN" */
select * from suppliers where Country = 'BERLIN';

/*3.	Seleccionar los empleados con código 3,5 y 8 */
select * from employees where EmployeesID in (3,5,8);

/*4.	Seleccionar los productos que tienen stock mayor que cero y son del proveedor 1,3 y 5 */
select * from products where SuppliersID in (1,3,5);

/*5.	Seleccionar los productos con precio mayor o igual a 20 y menor o igual a 90 */
select * from products where unitPrice between 20 and 90;

/*6.	Mostrar las órdenes de compra entre las fechas 01/01/1997 al 15/07/1997 */
select * from orders where OrderDate between '1997-01-01' and '1997-07-15';

/*7.	Mostrar las órdenes de compra hechas en el año 1997, que pertenecen a los empleados con códigos 1 ,3 ,4 ,8 */
select * from orders where year(OrderDate) = 1997 and EmployeesID in (1,3,4,8);

/*8.	Mostrar las ordenes hechas en el año 1996 */
select * from orders where year(OrderDate) = 1996;

/*9.	Mostrar las ordenes hechas en el año 1997 ,del mes de abril */
select * from orders where year(OrderDate) = 1997 and month(OrderDate) = 4;

/*10.	Mostrar las ordenes hechas el primero de todos los meses, del año 1998 */
select * from orders where year(OrderDate) = 1998 and day(OrderDate) = 1;

/*11.	Mostrar todos los clientes que no tienen fax */
select * from customers where fax is null;

/*12.	Mostrar todos los clientes que tienen fax */
select * from customers where fax is not null;

/*13.	Mostrar el nombre del producto, el precio, el stock y el nombre de la categoría a la que pertenece. */
select p.ProductsName, p.unitPrice, p.unitsInStock, c.CategorysName
from products p
inner join categorys c on c.CategorysId = p.CategorysId;

/*14.	Mostrar el nombre del producto, el precio producto, el código del proveedor y el nombre de la compañía proveedora. */
select p.ProductsName, p.unitPrice, p.suppliersId, s.companyName
from products p
inner join suppliers s on s.suppliersId = p.suppliersId;

/*15.	Mostrar el número de orden, el código del producto, el precio, la cantidad y el total pagado por producto.*/
select od.orderId, od.ProductsId, od.unitPrice, od.quantity, od.unitPrice * od.quantity 'total'
from orderdetails od
inner join products p on p.ProductsId = od.ProductsId;

/*16.	Mostrar el número de la orden, fecha, código del producto, precio, código del empleado y su nombre completo. */
select od.orderId, o.orderDate, od.ProductsId, od.unitPrice, o.employeesId, concat(e.firstname,' ',e.lastname) 'nombrecompleto'
from orderdetails od
inner join orders o on o.orderId = od.orderId
inner join employees e on e.employeesId = o.employeesId;

/*17.	Mostrar los 10 productos con menor stock */
select * from products
order by unitsInStock
limit 10;

/*18.	Mostrar los 10 productos con mayor stock */
select * from products
order by unitsInStock desc
limit 10;

/*19.	Mostrar los 10 productos con menor precio */
select * from products
order by unitPrice
limit 10;

/*20.	Mostrar los 10 productos con mayor precio */
select * from products
order by unitPrice desc
limit 10;

/*21.	Mostrar los 10 productos más baratos */
select * from products
order by unitPrice
limit 10;

/*22.	Mostrar los 10 productos más caros */
select * from products
order by unitPrice desc
limit 10;

/*1.	Seleccionar todos los campos de la tabla clientes,ordenar por compania */
select *
from customers
order by companyName;

/*2.	Seleccionar todos los campos de clientes,cuya compania empiece con la letra B 
y pertenezcan a UK ,ordenar por nombre de la compania */
select *
from customers
where companyName like 'B%' and country = 'UK'
order by companyName;

/*3.	Seleccionar todos los campos de productos de las categorias 1,3 y 5 
,ordenar por categoria */
select * 
from products p
inner join categorys c on c.CategorysId = p.CategorysId
where p.CategorysId in (1,3,5)
order by c.CategorysName;

/*4.	Seleccionar los productos cuyos precios unitarios estan entre 50 y 200 */
select * from products where unitPrice between 50 and 200;

/*5.	Visualizar el nombre y el id de la compania del cliente,fecha,precio unitario y producto de la orden */
select c.companyName, c.custId, o.orderDate, od.unitPrice, p.ProductsName
from orderdetails od
inner join products p on p.productsId = od.productsId
inner join orders o on o.orderId = od.orderId
inner join customers c on c.custId = o.custId;

/*6.	Visualizar el nombre de la categoria y el numero de productos que hay por cada categoria. */
select c.CategorysName, count(*)
from categorys c
inner join products p on p.CategorysId = c.CategorysId
group by c.CategorysName;

/*7.	Seleccionar los 5 productos mas vendidos */
select distinct p.ProductsName
from orderdetails od
inner join products p on p.ProductsId = od.ProductsId
limit 5;

/*8.	Seleccionar los jefes de los empleados */

/*9.	Obtener todos los productos cuyo nombre comienzan con M y tienen un precio comprendido entre 28 y 129 */
select *
from products
where ProductsName like 'M%' and unitPrice between 28 and 129;

/*10.	Obtener todos los clientes del  Pais de USA,Francia y UK */
select * from customers where country in ('USA','Francia','UK');

/*11.	Obtener todos los productos descontinuados o con stock cero. */
select * from products where discontinued = 0 or unitsInStock = 0;

/*12.	Obtener todas las ordenes hechas por el empleado King Robert */
select o.*
from employees e
inner join orders o on o.employeesId = e.employeesId
where concat(e.firstname,' ',e.lastname) = 'King Robert';

/*13.	Obtener todas las ordenes por el cliente cuya compania es "Que delicia" */
select o.*
from customers c
inner join orders o on o.custId = c.custId
where c.companyName = 'Que delicia';

/*14.	Obtener todas las ordenes hechas por el empleado King 
Robert,Davolio Nancy y Fuller Andrew */
select o.*
from employees e
inner join orders o on o.employeesId = e.employeesId
where concat(e.firstname,' ',e.lastname) in ('King Robert','Davolio Nancy','Fuller Andrew');

/*15.	Obtener todos los productos(codigo,nombre,precio,stock) de la orden 
10257 */
select p.ProductsId, p.ProductsName, od.unitPrice, p.unitsInStock
from orderdetails od
inner join products p on p.ProductsId = od.ProductsId
where od.orderId = 10257;

/*16.	Obtener todos los productos(codigo,nombre,precio,stock) de las ordenes hechas desde 1997 hasta la fecha de hoy. */
select p.ProductsId, p.ProductsName, od.unitPrice, p.unitsInStock
from orders o
inner join orderdetails od on od.orderId = o.orderId
inner join products p on p.ProductsId = od.ProductsId
where year(o.orderDate) between 1997 and 2024;

/*17.	Calcular los 15 productos mas caros */
select * from products
order by unitPrice desc
limit 15;

/*18.	Calcular los 5 productos mas baratos */
select * from products
order by unitPrice
limit 5;

/*19.	Obtener el nombre de todas las categorias y los nombres de sus productos,precio y stock. */
select c.CategorysName, p.ProductsName, p.unitPrice, p.unitsInStock
from products p
inner join categorys c on c.CategorysId = p.CategorysId;

/*20.	Obtener el nombre de todas las categorias y los nombres de sus productos,
solo los productos que su nombre no comience con la letra P*/
select c.CategorysName, p.ProductsName, p.unitPrice, p.unitsInStock
from products p
inner join categorys c on c.CategorysId = p.CategorysId
where p.ProductsName not like 'P%';

/*21.	Calcular el stock de productos por cada categoria.Mostrar el nombre de la categoria y el stock por categoria. */
select c.CategorysName, sum(p.unitsInStock)
from categorys c
inner join products p on p.CategorysId = c.CategorysId
group by c.CategorysName;

/*22.	Obtener el Nombre del cliente,Nombre del Proveedor,Nombre del empleado 
y el nombre de los productos que estan en la orden 10794 */
select c.companyName, s.companyName, concat(e.firstname,' ',e.lastname), p.ProductsName
from orders o
inner join orderdetails od on od.orderId = o.orderId
inner join products p on p.ProductsId = od.ProductsId
inner join suppliers s on s.suppliersId = p.suppliersId
inner join customers c on c.custId = o.custId
inner join employees e on e.employeesId = o.employeesId
where o.orderId = 10794;

/*23.	Mostrar el numero de ordenes de cada uno de los clientes por año,
luego ordenar codigo del cliente y el año. */
select t.anio, t.nombrecliente, t.cantidad
from (select year(o.orderDate) 'anio', c.custId 'codcliente', c.companyName 'nombrecliente', count(*) 'cantidad'
from customers c
inner join orders o on o.custId = c.custId
group by year(o.orderDate), c.custId, c.companyName
order by c.custId, year(o.orderDate)) t;

/*24.	Contar el numero de ordenes que se han realizado por años y meses ,luego debe ser ordenado por año y por mes. */
select year(orderDate), month(orderDate), count(*)
from orders
group by year(orderDate), month(orderDate);

/*25.	Seleccionar el nombre de la compañía del cliente,él código de la orden de compra,
la fecha de la orden de compra, código del producto, cantidad pedida del producto,
nombre del producto, el nombre de la compañía proveedora y la ciudad del proveedor ,usar Join */
select c.companyName, o.orderId, o.orderDate, od.ProductsId, od.quantity,
p.ProductsName, s.companyName, s.city
from orders o
inner join orderdetails od on od.orderId = o.orderId
inner join products p on p.ProductsId = od.ProductsId
inner join suppliers s on s.suppliersId = p.suppliersId
inner join customers c on c.custId = o.custId;

/*26. Seleccionar el nombre de la compañía del cliente, 
nombre del contacto, el código de la orden de compra, 
la fecha de la orden de compra, el código del producto,
cantidad pedida del producto, nombre del producto y 
el nombre de la compañía proveedora, usas JOIN.
Solamente las compañías proveedoras que comienzan con la letra de la A hasta la letra G,
además la cantidad pedida del producto debe estar entre 23 y 187. */
select c.companyName, o.orderId, o.orderDate, od.ProductsId, od.quantity,
p.ProductsName, s.companyName, s.city
from orders o
inner join orderdetails od on od.orderId = o.orderId
inner join products p on p.ProductsId = od.ProductsId
inner join suppliers s on s.suppliersId = p.suppliersId
inner join customers c on c.custId = o.custId
where s.companyName regexp '^[a-g].*$' and od.quantity between 23 and 187;




