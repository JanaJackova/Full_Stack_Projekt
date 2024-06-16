package cz.itnetwork.controller.advice;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateIdentificationNumberException extends RuntimeException {
    public DuplicateIdentificationNumberException(String message) {
        super(message);
    }
}
