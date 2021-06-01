package com.devsuperior.dsvendas.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.dto.SaleSuccessDTO;
import com.devsuperior.dsvendas.dto.SaleSumDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.erros.ExceptionTratados;
import com.devsuperior.dsvendas.service.SaleService;
import com.devsuperior.dsvendas.service.SellerService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService saleService;
	
	@Autowired
	private ExceptionTratados erroTratados;
	
	@Autowired
	private SellerService sellerService; 
	
	@GetMapping
	public ResponseEntity<Page<SaleDTO>> findAll(Pageable pageable) {
		Page<SaleDTO> list = saleService.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping(value = "/amount-by-seller")
	public ResponseEntity<List<SaleSumDTO>> amountGroupedBySeller() {
		List<SaleSumDTO> list = saleService.amountGroupedBySeller();
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/success-by-seller")
	public ResponseEntity<List<SaleSuccessDTO>> successGroupedBySeller() {
		List<SaleSuccessDTO> list = saleService.successGroupedBySeller();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/")
	public ResponseEntity<?> salvarVendedor(@RequestBody Sale sale) {	
				
		// Buscar pelo id_saler
		Seller seller;
		try {
			seller = sellerService.findID(sale.getValue());
		} catch (Exception e) {
			return erroTratados.NotFoundException("Vendedor não Localizado!", "sales/");
		}
		
		if (sale.getAmount() <= 0) {
			return erroTratados.NotFoundException("Valor não pode ser nulo ou menor ou igual a Zero!", "sales/");
		}
		
		if (sale.getVisited() <= 0 || sale.getVisited() == null) {
			return erroTratados.NotFoundException("Total de Visitas não pode ser nulo ou menor ou igual a Zero!", "sales/");
		}
		
		if (sale.getDeals() <= 0 || sale.getDeals() == null) {
			return erroTratados.NotFoundException("Total Negocios Fechados não pode ser nulo ou menor ou igual a Zero!", "sales/");
		}		
		
		sale.setDate(LocalDate.now());
		sale.setAmount(sale.getAmount());
		sale.setDeals(sale.getDeals());
		sale.setVisited(sale.getVisited());
		sale.setSeller(seller);
		
		try {		
			saleService.cadastro(sale);		
		} catch (Exception e) {
			return erroTratados.NotFoundException("Venda já Cadatrado!", "sales/");
		}
		
		return null;
		
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?> removerVendedor(@RequestBody @PathVariable(value = "id") Long id) {
		
		try {
			saleService.findID(id);
		} catch (Exception e) {
			return erroTratados.NotFoundException("Venda não Localizado!", "sales/remove/{id}");
		}
			
		try {		
			saleService.remover(id);	
		} catch (Exception e) {
			return erroTratados.NotFoundException("Erro ao remover a Venda!", "sales/remove/{id}");
		}
		
		return null;
		
	}
}
