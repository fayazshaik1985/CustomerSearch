using Microsoft.AspNetCore.Mvc;
using CustomerSearch.Api.Models;
using CustomerSearch.Api.Repositories;

namespace CustomerSearch.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerRepository _customerRepository;

    public CustomersController(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    // GET: api/Customers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers(
        [FromQuery] string? search = null,
        [FromQuery] string? sortBy = null,
        [FromQuery] string? sortOrder = "asc")
    {
        IEnumerable<Customer> customers = await _customerRepository.GetCustomersAsync(search, sortBy, sortOrder);
        return Ok(customers);
    }

    // GET: api/Customers/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetCustomer(int id)
    {
        var customer = await _customerRepository.GetCustomerAsync(id);

        if (customer == null)
        {
            return NotFound();
        }

        return customer;
    }

    // POST: api/Customers
    [HttpPost]
    public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
    {
        var data = await _customerRepository.AddCustomerAsync(customer);

        return data;
    }

    // PUT: api/Customers/5
    [HttpPut("{id}")]
    public async Task<ActionResult<Customer>> PutCustomer(int id, Customer customer)
    {
        var data = await _customerRepository.UpdateCustomerAsync(customer);

        return data;
    }

    // DELETE: api/Customers/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        await _customerRepository.DeleteCustomerAsync(id);

        return NoContent();
    }
}
