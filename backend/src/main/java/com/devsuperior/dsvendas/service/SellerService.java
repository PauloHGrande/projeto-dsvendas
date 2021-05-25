package com.devsuperior.dsvendas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SellerService {
	
	@Autowired
	private SellerRepository sellerRepository;
	
	@Transactional(readOnly = true)
	public Page<SellerDTO> findAll(Pageable pageable) {
		// Antes sem paginação
		//List<Seller> result = sellerRepository.findAll();
		//return result.stream().map(x -> new SellerDTO(x)).collect(Collectors.toList());

		Page<Seller> result = sellerRepository.findAll(pageable);
		return result.map(x -> new SellerDTO(x));
	}
	
	@Transactional(readOnly = true)
	public Seller findID(Long id) {
		return sellerRepository.findById(id).get();
	}	
	
	@Transactional(readOnly = true)
	public void cadastro(Seller seller) {
		sellerRepository.saveAndFlush(seller);
	}
	
	//@Transactional(readOnly = true)
	public void remover(Long id) {
		sellerRepository.deleteById(id);
	}

}
