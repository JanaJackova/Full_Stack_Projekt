package cz.itnetwork.service;


import cz.itnetwork.controller.advice.DuplicateIdentificationNumberException;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import java.util.List;


@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private PersonRepository personRepository;


    public PersonDTO addPerson(PersonDTO personDTO) {
        checkIdentificationNumbersUniqueness(personDTO.getIdentificationNumber()); // Kontrola,zda IČO odpovídá existující osobě
        PersonEntity person = personMapper.toEntity(personDTO);

        person = personRepository.save(person);

        return personMapper.toDTO(person);
    }

    //Vymazání osoby, resp. nastavení osoby jako skryté a ponecháno v databázi
    @Override
    public void removePerson(long personId) {
        PersonEntity person = fetchPersonById(personId);
        person.setHidden(true);  //nastavení osoby jako skryté

        personRepository.save(person); //uložení osoby jako skryté
    }

    // Načtení všech aktivních osob, nebere v potaz skryté osoby
    @Override
    public List<PersonDTO> getVisiblePersons() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .toList();
    }

    // Zjištění, zda je osoba neaktivní (skrytá)
    @Override
    public boolean isPersonHidden(long personId) {
        PersonEntity person = fetchPersonById(personId);
        return person.isHidden();
    }

    @Override
    public PersonDTO getPersonById(long id) {
        PersonEntity person = fetchPersonById(id);

        return personMapper.toDTO(person);
    }

    @Override
    public PersonDTO editPerson(PersonDTO person, long id) {
        PersonEntity existingPerson = fetchPersonById(id);
        String existingIdentificationNumber = existingPerson.getIdentificationNumber();

        // Pokud se IČO změní, provede se kontrola na jedinečnost
        if (!person.getIdentificationNumber().equals(existingIdentificationNumber)) {
            checkIdentificationNumbersUniqueness(person.getIdentificationNumber());
        }

        existingPerson.setHidden(true);

        PersonEntity updatedPerson = personMapper.toEntity(person);
        updatedPerson.setId(0); // Nastavení nového ID při uložení změny
        personRepository.save(updatedPerson);
        return personMapper.toDTO(updatedPerson);
    }

    @Override
    public List<PersonStatisticsDTO> getPersonStatistics() {
        return personRepository.getPersonStatistics();
    }

    // Načtení entity z databáze bez převodu na DTO - pro opakované použití
    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

    // Kontrola jedinečnosti IČO
    private void checkIdentificationNumbersUniqueness(String identificationNumber) {
        List<PersonEntity> existingPerson = personRepository.findByIdentificationNumber(identificationNumber);
        if (!existingPerson.isEmpty()) {
            throw new DuplicateIdentificationNumberException("The identification number is already in the system");
        }
    }

}
