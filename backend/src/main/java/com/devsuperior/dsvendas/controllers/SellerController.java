package com.devsuperior.dsvendas.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsvendas.dto.SellerComboBoxDTO;
import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.erros.ExceptionTratados;
import com.devsuperior.dsvendas.service.SellerService;

@RestController
@RequestMapping(value = "/sellers")
public class SellerController {
	
	@Autowired
	private SellerService sellerService; 
	
	@Autowired
	private ExceptionTratados erroTratados;
		
	@GetMapping
	public ResponseEntity<Page<SellerDTO>> findAll(Pageable pageable) {
		Page<SellerDTO> list = sellerService.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/combobox")
	public ResponseEntity<List<SellerComboBoxDTO>> ComboboxfindAll() {
		List<SellerComboBoxDTO> list = sellerService.ComboboxfindAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/")
	public ResponseEntity<?> salvarVendedor(@RequestBody Seller seller) {	
		
		System.out.println(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN);
		
		if (seller.getName() == "") {
			return erroTratados.NotFoundException("O Campo Nome não pode ser nulo!", "sales/");
		}
		
		if (seller.getName().length() > 20) {
			return erroTratados.NotFoundException("O Campo Nome não pode ter mais que 20 caracteres!", "sellers/");
		}
		
		seller.setName(seller.getName());
		
		try {		
			sellerService.cadastro(seller);		
		} catch (Exception e) {
			return erroTratados.NotFoundException("Nome já Cadatrado!", "sellers/");
		}
		
		return null;
		
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?> removerVendedor(@RequestBody @PathVariable(value = "id") Long id) {
		
		try {
			sellerService.findID(id);
		} catch (Exception e) {
			return erroTratados.NotFoundException("Vendedor não Localizado!", "sellers/remove/{id}");
		}
			
		try {		
			sellerService.remover(id);	
		} catch (Exception e) {
			return erroTratados.NotFoundException("Vendedor possui vendas em seu Nome!", "sellers/remove/{id}");
		}
		
		return null;
		
	}	

}
