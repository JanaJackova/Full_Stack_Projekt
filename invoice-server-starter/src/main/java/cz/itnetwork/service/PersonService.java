package cz.itnetwork.service;


import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import java.util.List;

public interface PersonService {

    PersonDTO addPerson(PersonDTO personDTO);

    void removePerson(long id);

    List<PersonDTO> getVisiblePersons();

    boolean isPersonHidden(long personId);

    PersonDTO getPersonById(long id);

    PersonDTO editPerson(PersonDTO person, long id);

    List<PersonStatisticsDTO> getPersonStatistics();

}
