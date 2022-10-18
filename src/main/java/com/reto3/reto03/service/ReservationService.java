package com.reto3.reto03.service;


import com.reto3.reto03.entities.Client;
import com.reto3.reto03.entities.Reservation;
import com.reto3.reto03.repository.ReservationRepository;
import com.reto3.reto03.service.dto.StatusAccount;
import com.reto3.reto03.service.dto.TopClients;
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
            return reservationRepository.save(p);
        }else {
            Optional<Reservation> e =reservationRepository.getReservation(p.getIdReservation());
            if (e.isPresent()){
                return p;
            }else {
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

    public List<Reservation> getReservationsByPeriod (String dateA,String dateB){

        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();
        try{
            a = parser.parse(dateA);
            b = parser.parse(dateB);
        }catch(ParseException e){
            e.printStackTrace();
        }
        if (a.before(b)){
            return reservationRepository.getDatesReport(a,b);
        }else{
            return new ArrayList<Reservation>();
        }
    }

    public StatusAccount getReportByStatus(){
        List<Reservation> completes = reservationRepository.getStatusReport("completed");
        List<Reservation> cancelled = reservationRepository.getStatusReport("cancelled");

        StatusAccount resultado = new StatusAccount(completes.size(), cancelled.size());
        return resultado;
    }
    public List<TopClients> getTopClients(){
        List<TopClients> tc = new ArrayList<>();
        List<Object[]> result = reservationRepository.getTopClients();

        for(int i=0; i<result.size(); i++){
            int total = Integer.parseInt(result.get(i)[1].toString());
            Client client = (Client) result.get(i)[0];
            TopClients topClients = new TopClients(total, client);
            tc.add(topClients);
        }
        return tc;
    }
}
