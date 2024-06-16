package cz.itnetwork.dto.mapper;


import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.PersonEntity;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface PersonMapper {

    PersonEntity toEntity(PersonDTO source);

    PersonDTO toDTO(PersonEntity source);

    PersonStatisticsDTO toStatisticsDTO(PersonEntity source);

}
