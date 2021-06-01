package com.devsuperior.dsvendas.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SellerComboBox {
	
	@Id
	private Long value;
	private String label;
	
	
	public SellerComboBox() {
		// TODO Auto-generated constructor stub
	}


	public SellerComboBox(Long value, String label) {
		this.value = value;
		this.label = label;
	}


	public Long getValue() {
		return value;
	}


	public void setValue(Long value) {
		this.value = value;
	}


	public String getLabel() {
		return label;
	}


	public void setLabel(String label) {
		this.label = label;
	}

	
	
}
