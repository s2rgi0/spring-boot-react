package com.xerfio.wisdompet.data.repositories;


import com.xerfio.wisdompet.data.entities.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<ProductEntity, Long> {

}
