-- DML Data Manipulation Language

-- Create
-- Read
-- Update
-- Delete

use Northwind;

insert into Employees(LastName, FirstName)
values('Pineda', 'Roberto');

select * from Employees ;

update Employees set BirthDate = '1983-08-28' where EmployeeID = 11;

delete from Employees where employeeId = 11;

select * from Employees where LastName = 'Davolio';



SELECT CustomerID, CustomerName, City FROM Customers;

SELECT DISTINCT Country FROM Customers;

SELECT * FROM Customers
WHERE Country='Mexico';

SELECT * FROM Products
ORDER BY Price desc;

SELECT * FROM Products
ORDER BY Price;

SELECT * FROM Products
ORDER BY ProductName desc;


SELECT * FROM Products
ORDER BY ProductName ;


SELECT * FROM Customers
ORDER BY Country, CustomerName;

SELECT * FROM Customers
ORDER BY Country desc, CustomerName;


SELECT *
FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'G%';

SELECT *
FROM Customers
WHERE Country = 'Spain' AND CustomerName LIKE 'W%';


SELECT *
FROM Customers
WHERE Country = 'Germany' OR Country = 'Spain';

SELECT * FROM Customers
WHERE City = 'Berlin' OR CustomerName LIKE 'G%' OR Country = 'Norway';


SELECT * FROM Customers
WHERE Country = 'Spain' AND (CustomerName LIKE 'G%' OR CustomerName LIKE 'R%');


SELECT * FROM Customers
WHERE NOT Country = 'Spain';

SELECT * FROM Customers
WHERE  Country <> 'Spain';


INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES
('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway'),
('Greasy Burger', 'Per Olsen', 'Gateveien 15', 'Sandnes', '4306', 'Norway'),
('Tasty Tee', 'Finn Egan', 'Streetroad 19B', 'Liverpool', 'L1 0AA', 'UK');

SELECT customerID, CustomerName, ContactName, Address
FROM Customers
WHERE Address IS  NULL;

SELECT customerID, CustomerName, ContactName, Address
FROM Customers
WHERE Address =  NULL;

update Customers set Address = null where customerID =8;

SELECT * FROM Customers
LIMIT 3;


SELECT * FROM Products
order by price asc
LIMIT 1;

SELECT MIN(Price)
FROM Products;

SELECT MAX(Price)
FROM Products;


SELECT COUNT(*)
FROM Products;


SELECT SUM(Quantity)
FROM OrderDetails;

SELECT AVG(Price)
FROM Products;


SELECT * FROM Customers
WHERE CustomerName like 'a%';

SELECT * FROM Customers
WHERE city LIKE 'L_nd__';

SELECT * FROM Customers
WHERE city LIKE '%L%';

SELECT * FROM Customers
WHERE CustomerName LIKE 'La%';

SELECT * FROM Customers
WHERE CustomerName LIKE 'a%' OR CustomerName LIKE 'b%';

SELECT * FROM Customers
WHERE CustomerName LIKE 'b%s';

SELECT * FROM Customers
WHERE CustomerName LIKE 'a__%';

SELECT * FROM Customers
WHERE CustomerName LIKE '_r%';

SELECT * FROM Customers
WHERE Country LIKE 'Spain';

SELECT * FROM Customers
WHERE CustomerName LIKE '[bsp]%';

SELECT * FROM Customers
WHERE CustomerName LIKE '[a-f]%';

SELECT * FROM Customers
WHERE Country IN ('Germany', 'France', 'UK');

SELECT * FROM Customers
WHERE CustomerID IN (SELECT CustomerID FROM Orders);

SELECT * FROM Customers
WHERE Country NOT IN ('Germany', 'France', 'UK');

SELECT * FROM Customers
WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders);

SELECT * FROM Products
WHERE Price BETWEEN 10 AND 20;


SELECT * FROM Orders
WHERE OrderDate BETWEEN '1996-07-01' AND '1996-07-31';


SELECT 
CustomerID as ID,
Address as Direccion,
PostalCode as 'Codigo Postal'
FROM Customers;


select * from orders;
select * from customers;

SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

SELECT O.OrderID, C.CustomerName, O.OrderDate
FROM Orders O
INNER JOIN Customers C ON O.CustomerID=C.CustomerID;

Select * from Products;
Select * from Categories;
select * from Suppliers;

Select 
	P.ProductName,
	c.CategoryName,
    S.SupplierName
from Products P 
inner join Categories C on P.CategoryID = C.CategoryID
inner join Suppliers S on P.SupplierID = S.SupplierID;


Select P.ProductName,
c.CategoryName
 from Products P 
inner join Categories C on P.CategoryID = C.CategoryID;


SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders ON Customers.CustomerID = Orders.CustomerID
ORDER BY Customers.CustomerName;


SELECT Orders.OrderID, Employees.LastName, Employees.FirstName
FROM Orders
RIGHT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
ORDER BY Orders.OrderID;


select * from Customers;

SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
full   JOIN Orders ON Customers.CustomerID=Orders.CustomerID
ORDER BY Customers.CustomerName;

SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID AND A.City = B.City
ORDER BY A.City;


SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City;


SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers
ORDER BY City;


SELECT City, Country FROM Customers
WHERE Country='Germany'
UNION
SELECT City, Country FROM Suppliers
WHERE Country='Germany'
ORDER BY City;

SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country;


SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
ORDER BY COUNT(CustomerID) DESC;


SELECT Shippers.ShipperName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders
LEFT JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
GROUP BY ShipperName;

SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5;

SELECT COUNT(CustomerID), Country
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) > 5
ORDER BY COUNT(CustomerID) DESC;

SELECT SupplierName
FROM Suppliers
WHERE EXISTS (SELECT ProductName FROM Products WHERE Products.SupplierID = Suppliers.supplierID AND Price < 20);