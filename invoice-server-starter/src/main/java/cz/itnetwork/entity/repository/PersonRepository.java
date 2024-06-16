package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;


public interface PersonRepository extends JpaRepository<PersonEntity, Long>  {

    List<PersonEntity> findByHidden(boolean hidden);

    @Query(""" 
            SELECT new cz.itnetwork.dto.PersonStatisticsDTO(p.id, p.name, SUM(IFNULL(i.price,0)))
            FROM person p
            JOIN invoice i ON p.id = i.seller.id
            GROUP BY p.id
            """)
    List<PersonStatisticsDTO> getPersonStatistics();

    List<PersonEntity> findByIdentificationNumber(String identificationNumber);
}
