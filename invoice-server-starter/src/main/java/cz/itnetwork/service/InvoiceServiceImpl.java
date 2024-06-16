package cz.itnetwork.service;


import cz.itnetwork.controller.advice.HiddenPersonException;
import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import java.time.LocalDate;
import java.util.List;


@Service
public class InvoiceServiceImpl implements InvoiceService{

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonService personService;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        validateAndSetSellerBuyer(invoiceDTO);

        InvoiceEntity invoiceEntity = invoiceMapper.toEntity(invoiceDTO);
        InvoiceEntity newInvoice = invoiceRepository.saveAndFlush(invoiceEntity);

        return invoiceMapper.toDTO(newInvoice);
    }

    // Filtrování faktur
    @Override
    public List<InvoiceDTO> getAllInvoices(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(i -> invoiceMapper.toDTO(i))
                .toList();
    }

    @Override
    public List<InvoiceDTO> getSalesPurchaseInvoices(String identificationNumber, boolean isSale) {
        InvoiceFilter filter = new InvoiceFilter();
        List<InvoiceDTO> allInvoices = getAllInvoices(filter); // Získání všech faktur

        // Filtrování faktur na přijaté a vystavené podle IČO
        return allInvoices.stream()
                .filter(invoice -> isSale
                        ? invoice.getSeller().getIdentificationNumber().equals(identificationNumber)
                        : invoice.getBuyer().getIdentificationNumber().equals(identificationNumber))
                .toList();
    }

    @Override
    public InvoiceDTO getInvoice(long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public InvoiceDTO editInvoice(long id, InvoiceDTO invoiceDTO) {
        InvoiceEntity invoice = fetchInvoiceById(id); // Zajistí, že faktura s daným ID existuje
        if (invoice.getSeller().getId() != invoiceDTO.getSeller().getId()|| invoice.getBuyer().getId() != invoiceDTO.getBuyer().getId()) {
            validateAndSetSellerBuyer(invoiceDTO); // Zajistí, že obě osoby existují v databázi (nejsou skryté)
        }

        InvoiceEntity updatedInvoice = invoiceMapper.toEntity(invoiceDTO);
        updatedInvoice.setId(id); // Nastavení na původní ID faktury (nelze změnit ID)
        InvoiceEntity saved = invoiceRepository.save(updatedInvoice);

        return invoiceMapper.toDTO(saved);
    }

    @Override
    public void removeInvoice(long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        invoiceRepository.delete(invoiceEntity);
    }

    // Statistika faktur - počet, celkové výnosy a výnosy za aktuální rok
    @Override
    public InvoiceStatisticsDTO getInvoiceStatistics() {
        List<InvoiceEntity> allInvoices = invoiceRepository.findAll();

        Long invoicesCount = (long) allInvoices.size();

        Long allTimeSum = allInvoices.stream()
                .mapToLong(InvoiceEntity::getPrice)
                .sum();

        Long currentYearSum = allInvoices.stream()
                .filter(invoice -> invoice.getIssued().getYear() == LocalDate.now().getYear())
                .mapToLong(InvoiceEntity::getPrice)
                .sum();

        return new InvoiceStatisticsDTO(currentYearSum, allTimeSum, invoicesCount);
    }

    // Načtení entity z databáze bez převodu na DTO - pro opakované použití
    private InvoiceEntity fetchInvoiceById(long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + "wasn´t found in the database."));
    }

    // Validace a nastavení osob dle ID pro seller a buyer
    private void validateAndSetSellerBuyer(InvoiceDTO invoiceDTO) {
        // Získání osob dle ID pro seller a buyer
        long sellerId = invoiceDTO.getSeller().getId();
        long buyerId = invoiceDTO.getBuyer().getId();

        if (personService.isPersonHidden(sellerId)) {
            throw new HiddenPersonException("Cannot assign hidden person as seller.");
        }

        if (personService.isPersonHidden(buyerId)) {
            throw new HiddenPersonException("Cannot assign hidden person as buyer.");
        }

        PersonDTO seller = personService.getPersonById(sellerId);
        PersonDTO buyer = personService.getPersonById(buyerId);

        invoiceDTO.setSeller(seller);
        invoiceDTO.setBuyer(buyer);
    }

}
