package com.devsuperior.dsvendas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository saleRepository;
	
	@Autowired
	private SellerRepository sellerRepository;
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable) {
		// Feito desta forma porque estava fazendo a consulta 5 vezes no banco
		// devido ter 5 vendedores cadastrado. desta forma o JPA ira buscar uma vez so e guardar em memoria.		
		sellerRepository.findAll(); 

		Page<Sale> result = saleRepository.findAll(pageable);
		return result.map(x -> new SaleDTO(x));
	}
	
	@Transactional(readOnly = true)
	public List<SaleSumDTO> amountGroupedBySeller() {
		return saleRepository.amountGroupedBySeller();
	}
	
	@Transactional(readOnly = true)
	public List<SaleSuccessDTO> successGroupedBySeller() {
		return saleRepository.successGroupedBySeller();
	}
	
	@Transactional(readOnly = true)
	public Sale findID(Long id) {
		return saleRepository.findById(id).get();
	}	
	
	//@Transactional(readOnly = true)
	public void cadastro(Sale sale) {
		saleRepository.saveAndFlush(sale);
	}
	
	//@Transactional(readOnly = true)
	public void remover(Long id) {
		saleRepository.deleteById(id);
	}	

}
