package com.reto3.reto03.entities.dto;

import com.reto3.reto03.entities.Client;

public class CountClient {

    private Long total;
    private Client client;
    public CountClient(Long total, Client client){
        this.total = total;
        this.client = client;
    }
    public Long getTotal(){
        return total;
    }
    public void setTotal(long total){
        this.total = total;
    }
    public Client getClient(){
        return client;
    }
    public  void setClient(Client client){
        this.client = client;
    }
}
