1
select * from Production.Product
ORDER by Name;
2
select Name as Наименование, ProductNumber as Номер, Listprice as Цена from Production.Product;
ORDER by Name;
3
select Name as Наименование, ProductNumber as Номер, Listprice as Цена from Production.Product where DaysToManufacture <= 4 and ProductLine[0] = 'R';
ORDER by Name;
4
select DISTINCT JobTitle from HumanResources.Employee
ORDER by JobTitle;
5
select SalesOrderID,LineTotal from Sales.SalesOrderDetail
GROUP by SalesOrderID
ORDER by SalesOrderID;
6
select AVG(UnitPrice), sum(LineTotal) from Sales.SalesOrderDetail
GROUP by ProductID, SpecialOfferID;
7
select Name as Наименование, ProductNumber as Номер, Listprice as Цена from Production.Product WHere Listprice  > 1000;
ORDER by Name;
8
select ProductModelID avg(Listprice) from Production.Product WHere Listprice  > 1000;
GROUP by ProductModelID
ORDER by ProductModelID;
9
select AVG(OrderQty), avg(OrderQty * UnitPrice) from Sales.SalesOrderDetail
GROUP by OrderQty * UnitPrice DESC;
10
select ProductID, avg(OrderQty * UnitPrice) from Sales.SalesOrderDetail where OrderQty > 10
GROUP by ProductID
ORDER by ProductID;
11
select ProductID from Sales.SalesOrderDetail where avg(OrderQty) > 5
GROUP by ProductID
ORDER by ProductID;
12
select * from Production.Product where Name LIKE '%ball%'
ORDER by Name;
13
select * from Person.PersonPhone where Name LIKE '415%';
14
select * from Person.Person where FirstName = 'Cheryl' or FirstName = 'Sheryl'
ORDER by LastName;
15
select * from Person.Person where LastName = 'Zheng' or LastName = 'Zhang'
ORDER by LastName,FirstName;
16
select count(*) from Person.Person where LastName = 'Zheng' or LastName = 'Zhang';
17
select * from Production.Product where Name in ('Blade','Crown Race','Spokes');