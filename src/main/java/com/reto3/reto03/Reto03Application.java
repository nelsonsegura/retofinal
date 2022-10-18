package com.reto3.reto03;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = {"com.reto3.reto03.entities"})
@SpringBootApplication
public class Reto03Application {

    public static void main(String[] args) {
        SpringApplication.run(Reto03Application.class, args);
    }

}
