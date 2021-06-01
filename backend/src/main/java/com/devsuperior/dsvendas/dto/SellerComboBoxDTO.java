package com.devsuperior.dsvendas.dto;

import java.io.Serializable;

import com.devsuperior.dsvendas.entities.Seller;

public class SellerComboBoxDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long value;
	private String label;
	
	public SellerComboBoxDTO() {
		
	}

	public SellerComboBoxDTO(Long value, String label) {
		this.value = value;
		this.label = label;
	}
	
	public SellerComboBoxDTO(Seller entity) {
		value = entity.getId();
		label = entity.getName();
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
