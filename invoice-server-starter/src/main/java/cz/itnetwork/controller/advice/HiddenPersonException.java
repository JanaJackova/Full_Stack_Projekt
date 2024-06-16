package cz.itnetwork.controller.advice;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class HiddenPersonException extends RuntimeException {
    public HiddenPersonException(String message) {
        super(message);
    }

}
