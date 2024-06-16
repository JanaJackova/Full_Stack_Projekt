package cz.itnetwork.entity.filter;


import lombok.Data;


@Data
public class InvoiceFilter {

    private Long buyerID;

    private Long sellerID;

    private String product;

    private Long minPrice;

    private Long maxPrice;

    private Integer limit = 100;

    private String role;

}
