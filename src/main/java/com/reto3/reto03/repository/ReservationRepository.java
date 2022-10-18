package com.reto3.reto03.repository;

import com.reto3.reto03.entities.Client;
import com.reto3.reto03.entities.Reservation;
import com.reto3.reto03.entities.dto.CountClient;
import com.reto3.reto03.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;
    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }
    public Reservation save(Reservation p){
        return reservationCrudRepository.save(p);
    }
    public void delete(Reservation p){
        reservationCrudRepository.delete(p);
    }
    public List<CountClient> getTopClients(){
        List<CountClient> result = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();

        for (int i = 0; i < report.size() ; i++){
            result.add(new CountClient((long) report.get(i)[1], (Client) report.get(i)[0]));
        }
        return result;
    }
    public List<Reservation> getReservationByPeriod(Date init, Date end){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(init, end);
    }
    public List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
}
