package com.devsuperior.dsvendas.erros;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ExceptionTratados extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErroMessage> NotFoundException(String message, String request) {
		ErroMessage erro = new ErroMessage();
		
		erro.setTimestamp(Instant.now());
		erro.setStatus(HttpStatus.BAD_GATEWAY.value());
		erro.setError("Erro Tratado");
		erro.setMessage(message);
		erro.setPath(request);
		
		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(erro);
	}
}
