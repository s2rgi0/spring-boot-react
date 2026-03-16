package com.xerfio.wisdompet.web.rest;


import com.xerfio.wisdompet.services.ServiceService;
import com.xerfio.wisdompet.web.errors.BadRequestException;
import com.xerfio.wisdompet.web.models.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceRestController {

 private final ServiceService serviceService;

  public ServiceRestController(ServiceService serviceService) {
    this.serviceService = serviceService;
  }

  @GetMapping
  public List<Service> getServices(){
    return this.serviceService.getAllServices();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Service addService(@RequestBody Service model){
    return this.serviceService.createOrUpdateService(model);
  }

  @GetMapping("/{id}")
  public Service getService(@PathVariable("id")long id){
    return this.serviceService.getService(id);
  }

  @PutMapping("/{id}")
  public Service updateService(@PathVariable("id") Long id, @RequestBody Service model){
    if (id != model.getServiceId()){
      throw new BadRequestException("incoming id doesn't match path");
    }
    return this.serviceService.createOrUpdateService(model);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.RESET_CONTENT)
  public void deleteService(@PathVariable("id")long id){
    this.serviceService.deleteService(id);
  }
}
