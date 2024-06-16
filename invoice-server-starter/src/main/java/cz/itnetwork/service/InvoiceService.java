package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;
import java.util.List;

public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter);

    List<InvoiceDTO> getSalesPurchaseInvoices(String identificationNumber, boolean isSale);

    InvoiceDTO getInvoice(long id);

    InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO);

    void removeInvoice(long id);

    InvoiceStatisticsDTO getInvoiceStatistics();

}
