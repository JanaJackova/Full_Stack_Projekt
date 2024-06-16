package cz.itnetwork.controller;


import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/identification/{identificationNumber}")
public class SalesPurchaseController {

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/sales")
    public List<InvoiceDTO> getSalesInvoices(@PathVariable String identificationNumber) {
        return invoiceService.getSalesPurchaseInvoices(identificationNumber, true);
    }

    @GetMapping("/purchases")
    public List<InvoiceDTO> getPurchaseInvoices(@PathVariable String identificationNumber) {
        return invoiceService.getSalesPurchaseInvoices(identificationNumber, false);
    }
}
