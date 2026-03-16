package com.xerfio.wisdompet.web.rest;


import com.xerfio.wisdompet.services.CustomerService;
import com.xerfio.wisdompet.web.errors.BadRequestException;
import com.xerfio.wisdompet.web.models.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerRestController {

    private final CustomerService customerService;

    public CustomerRestController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getCustomers(@RequestParam(name = "email", required = false) String email) {
        return this.customerService.getAllCustomers(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Customer createCustomer(@RequestBody Customer customer) {
        return this.customerService.createOrUpdate(customer);
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Integer id) {
        return this.customerService.getCustomer(id);
    }

    @PutMapping("/id")
    public Customer updateCustomer(@PathVariable("id")long id, @RequestBody Customer customer) {
        if(id != customer.getCustomerId()) {
            throw new BadRequestException("customer id not match");
        }
        return this.customerService.createOrUpdate(customer);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.RESET_CONTENT)
    public void deleteCustomer(@PathVariable("id")long id) {
        this.customerService.deleteCustomer(id);
    }


}
