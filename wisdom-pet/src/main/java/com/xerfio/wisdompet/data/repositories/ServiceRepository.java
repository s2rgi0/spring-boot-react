package com.xerfio.wisdompet.data.repositories;


import com.xerfio.wisdompet.data.entities.ServiceEntity;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<ServiceEntity, Long> {

}
