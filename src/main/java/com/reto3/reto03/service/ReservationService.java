package com.reto3.reto03.service;


import com.reto3.reto03.entities.Reservation;
import com.reto3.reto03.entities.dto.CountClient;
import com.reto3.reto03.entities.dto.StatusAmount;
import com.reto3.reto03.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }
    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation p){
        if (p.getIdReservation()==null){
            p.setStatus("created");
            return reservationRepository.save(p);
        }else {
            Optional<Reservation> e =reservationRepository.getReservation(p.getIdReservation());
            if (e.isPresent()){
                return p;
            }else {
                p.setStatus("created");
                return reservationRepository.save(p);
            }
        }
    }
    public Reservation update(Reservation p){
        if (p.getIdReservation()!=null){
            Optional<Reservation> q =reservationRepository.getReservation(p.getIdReservation());
            if (q.isPresent()){
                if (p.getIdReservation()!=null){
                    q.get().setIdReservation(p.getIdReservation());
                }
                if (p.getComputer()!=null){
                    q.get().setComputer(p.getComputer());
                }
                if (p.getClient()!=null){
                    q.get().setClient(p.getClient());
                }
                if (p.getStartDate()!=null){
                    q.get().setStartDate(p.getStartDate());
                }
                if (p.getDevolutionDate()!=null){
                    q.get().setDevolutionDate(p.getDevolutionDate());
                }
                if (p.getStatus()!=null){
                    q.get().setStatus(p.getStatus());
                }
                if (p.getScore()!=null){
                    q.get().setScore(p.getScore());
                }
                reservationRepository.save(q.get());
                return q.get();
            }else {
                return p;
            }
        }else {
            return p;
        }
    }
    public boolean delete(int id){
        Boolean success = reservationRepository.getReservation(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
                }).orElse(false);
        return success;
    }
    public List<CountClient> getTopClient(){
        return reservationRepository.getTopClients();
    }
    public StatusAmount getReservationByStatus(){
        List<Reservation> completed = reservationRepository.getReservationByStatus("completed");
        List<Reservation> cancelled = reservationRepository.getReservationByStatus("cancelled");
        return new StatusAmount(cancelled.size(), completed.size());
    }
    public List<Reservation> getReservationByPeriod(String init, String end){
        SimpleDateFormat parseDate = new SimpleDateFormat("yyyy-MM-dd");
        Date initDate = new Date();
        Date endDate = new Date();
        try {
            initDate = parseDate.parse(init);
            endDate = parseDate.parse(end);
        }catch (ParseException e){
            e.fillInStackTrace();
        }
        if (initDate.before(endDate)){
            return reservationRepository.getReservationByPeriod(initDate, endDate);
        }else {
            return new ArrayList<>();
        }
    }
}
