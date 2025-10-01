using CustomerSearch.Api.Models;

namespace CustomerSearch.Api.Repositories
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetCustomersAsync(string? search, string? sortBy, string? sortOrder);
        Task<Customer?> GetCustomerAsync(int id);
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<Customer> UpdateCustomerAsync(Customer customer);
        Task DeleteCustomerAsync(int id);
    }
}
