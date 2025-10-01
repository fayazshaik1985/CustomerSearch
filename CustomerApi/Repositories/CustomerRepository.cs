using CustomerSearch.Api.Models;
using System.Globalization;

namespace CustomerSearch.Api.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly List<Customer> _customers;

        public CustomerRepository()
        {
            _customers = new List<Customer>
            {
                new Customer { Id = 1111, FirstName = "John", LastName = "Paul", Email = "john.paul@gmail.com", DateOfBirth = new DateTime(1981, 8, 22), Phone = "3346543210" },
                new Customer { Id = 2257, FirstName = "John", LastName = "Ewards", Email = "john.ewards@yahoo.com", DateOfBirth = new DateTime(2025, 7, 23), Phone = "1234567890" },
                new Customer { Id = 2221, FirstName = "Rachal", LastName = "Mary", Email = "rachal.mary@test.com", DateOfBirth = new DateTime(1981, 2, 1), Phone = "5587654321" },
                new Customer { Id = 3331, FirstName = "AisEmpF", LastName = "AisEmpL", Email = "aisempf.aisempl@gmail.com", DateOfBirth = new DateTime(2010, 12, 12), Phone = "9987654321" }
            };
        }

        public async Task<List<Customer>> GetCustomersAsync(string? search, string? sortBy, string? sortOrder)
        {
            try
            {
                IEnumerable<Customer> customers = _customers;

                if (!string.IsNullOrEmpty(search))
                {
                    customers = customers.Where(c => c.Id.ToString().Contains(search) ||
                                                     c.FirstName!.Contains(search) || c.LastName!.Contains(search) || 
                                                     c.Email!.Contains(search) || c.Phone!.Contains(search) ||
                                                     c.DateOfBirth!.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture).Contains(search)
                                                     );
                }

                if (!string.IsNullOrEmpty(sortBy))
                {
                    switch (sortBy.ToLower())
                    {
                        case "id":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.Id) : customers.OrderByDescending(c => c.Id);
                            break;
                        case "firstname":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.FirstName) : customers.OrderByDescending(c => c.FirstName);
                            break;
                        case "lastname":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.LastName) : customers.OrderByDescending(c => c.LastName);
                            break;
                        case "dateofbirth":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.DateOfBirth) : customers.OrderByDescending(c => c.DateOfBirth);
                            break;
                        case "email":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.Email) : customers.OrderByDescending(c => c.Email);
                            break;
                        case "phone":
                            customers = sortOrder!.ToLower() == "asc" ? customers.OrderBy(c => c.Phone) : customers.OrderByDescending(c => c.Phone);
                            break;
                        default:
                            customers = customers.OrderBy(c => c.Id); // Default sort
                            break;
                    }
                }
                else
                {
                    customers = customers.OrderBy(c => c.Id); // Default sort if no sortBy is specified
                }

                var data = customers.ToList();
                return await Task.FromResult(data);
            }
            catch (Exception ex)
            {
                // Log the exception (you can use a logging framework here)
                Console.WriteLine($"An error occurred while retrieving customers: {ex.Message}");
                throw; // Re-throw the exception after logging it
            }
        }

        public async Task<Customer> GetCustomerAsync(int id)
        {
            Customer customer = _customers.FirstOrDefault(c => c.Id == id);
            return await Task.FromResult(customer);
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            customer.Id = _customers.Max(c => c.Id) + 1;
            _customers.Add(customer);

            return await Task.FromResult(customer);
        }

        public async Task<Customer> UpdateCustomerAsync(Customer customer)
        {
            var existingCustomer = _customers.FirstOrDefault(c => c.Id == customer.Id);
            if (existingCustomer != null)
            {
                existingCustomer.FirstName = customer.FirstName;
                existingCustomer.LastName = customer.LastName;
                existingCustomer.DateOfBirth = customer.DateOfBirth;
                existingCustomer.Email = customer.Email;
                existingCustomer.Phone = customer.Phone;
            }

            return await Task.FromResult(existingCustomer);
        }

        public async Task DeleteCustomerAsync(int id)
        {
            //_customers.RemoveAll(c => c.Id == id);
            var customer = _customers.FirstOrDefault(c => c.Id == id);
            if (customer != null)
            {
                _customers.Remove(customer);
            }

            await Task.FromResult(true);
        }
    }
}
