package cz.itnetwork.controller;


import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("")
    public PersonDTO addPerson(@RequestBody PersonDTO personDTO) {
        return personService.addPerson(personDTO);
    }

    @GetMapping("")
    public List<PersonDTO> getPersons() {
        return personService.getVisiblePersons();
    }

    @DeleteMapping("/{personId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable Long personId) {
        personService.removePerson(personId);
    }

    @GetMapping("/{personId}")
    public PersonDTO getPersonById(@PathVariable long personId) {
        return personService.getPersonById(personId);
    }

    @PutMapping("/{personId}")
    public PersonDTO updatePerson(@PathVariable long personId, @RequestBody PersonDTO personDTO) {
        return personService.editPerson(personDTO, personId);
    }

    @GetMapping("/statistics")
    public List<PersonStatisticsDTO> getPersonStatistics() {
        return personService.getPersonStatistics();
    }

}

