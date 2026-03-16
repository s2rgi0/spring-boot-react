package com.xerfio.wisdompet.data.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;

@Entity
@Table(name="SERVICES")
@Data
@ToString
public class ServiceEntity {

  @Id
  @Column(name="SERVICE_ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name="NAME")
  private String name;

  @Column(name="PRICE")
  private BigDecimal price;
}
