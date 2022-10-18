package com.reto3.reto03.controller;

import com.reto3.reto03.entities.Admin;
import com.reto3.reto03.entities.Reservation;
import com.reto3.reto03.entities.dto.CountClient;
import com.reto3.reto03.entities.dto.StatusAmount;
import com.reto3.reto03.service.AdminService;
import com.reto3.reto03.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin(origins = "*", methods ={RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }
    @GetMapping("/{id}")
    public Optional<Reservation> getReservation(@PathVariable("id") int reservationId) {
        return reservationService.getReservation(reservationId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save(@RequestBody Reservation p){
        return reservationService.save(p);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation updateReservation(@RequestBody Reservation reservation) {
        return reservationService.update(reservation);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int reservationId) {
        return reservationService.delete(reservationId);
    }

    @GetMapping("/report-clients")
    public List<CountClient> getReservationsReport(){
        return reservationService.getTopClient();
    }
    @GetMapping("/report-status")
    public StatusAmount getReservationsStatus(){
        return reservationService.getReservationByStatus();
    }
    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationPeriod(@PathVariable("dateOne") String dateOne,@PathVariable("dateTwo") String dateTwo ){
        return reservationService.getReservationByPeriod(dateOne, dateTwo);
    }
}
