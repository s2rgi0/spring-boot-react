package com.xerfio.wisdompet.data.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name="VENDORS")
@Data
@ToString
public class VendorEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="VENDOR_ID")
  private long id;

  @Column(name="NAME")
  private String name;

  @Column(name="CONTACT")
  private String contact;

  @Column(name="EMAIL")
  private String email;

  @Column(name="PHONE")
  private String phone;

  @Column(name="ADDRESS")
  private String address;
}
