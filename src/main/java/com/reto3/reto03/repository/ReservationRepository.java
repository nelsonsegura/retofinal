package com.reto3.reto03.repository;

import com.reto3.reto03.entities.Reservation;
import com.reto3.reto03.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

    public List<Reservation> getDatesReport(Date inicio, Date fin){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(inicio, fin);
    }
    public List<Reservation> getStatusReport(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
    
    public List<Object[]> getTopClients(){
        return reservationCrudRepository.getTopClients();
    }


}
