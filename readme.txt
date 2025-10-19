Future Shop is looking to upgrade their existing customer management system to utilize new features of .NET.  
They are looking to create a UI application, using Angular JS, which will be used to search for existing customers and Create new customers.

Technologies:

Angular/React/MVC/.NET
JSON Data /In Memory Data Store / Mango DB / File Storage.
Visual Studio/VS Code
 
Sample Data :
  [{FirstName : ‘John ‘, Last Name : ‘Paul’ Emp ID :1 , Email: ‘john.paul@test.com’,  DOB: ’22-08-1981’,
phone :’000-000-111’},{FirstName : ‘John ‘, Last Name : ‘Ewards’ Emp ID :2 , Email: ‘john. ewards’ @test.com’,  DOD: ’23-07-1985’,
phone :’000-222-010’},
{FirstName : ‘Rachal ‘, Last Name : ‘Mary’ Emp ID :3 , Email: ‘Rachal. Mary’@test.com’,  DOB: ’01-02-1981’,
phone :123-869-111’},
{FirstName : ‘AisEmpF ‘, Last Name : ‘AisEmpL’ Emp ID :4 , Email: ‘AisEmpF. AisEmpL’ @test.com’, DOB: ’12-12-1982’, phone :890-120-111’}]

Instructions
Duration of the lab is 1.5 hours max.
If not otherwise specified, the approach to take for each task is left up to you – as long as technologies listed above can support them.
We will be evaluating coding style and quality of code in addition to implementing requirements.
If you sketch any diagrams, do pass them on to the interviewee for records.
You may use any resource available on the  laptop and research online.
Use the Sample Json to retrieve the Data and Save it is in memory Cache and Do Curd operations on it.
Please write unit Test cases.
 
Task 1 – Search Customer
As per the screenshot below, implement a Grid containing customer information.
By default for the first page load, all the customers in the Database should be displayed.
 
Thereafter based on any search criteria, corresponding result set should be displayed.
 
Grid should be sortable on the following all the fields
Last Name
Date of Birth
 
Clicking on Delete should delete the customer and only refresh the grid without refreshing the entire page