package cz.itnetwork.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticsDTO {

    @JsonProperty("personId")
    private long id;

    @JsonProperty("personName")
    private String name;

    @JsonProperty("revenue")
    private Long price;

}
