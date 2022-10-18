package com.reto3.reto03.repository.crudRepository;

import com.reto3.reto03.entities.Reservation;
import org.hibernate.sql.Select;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;
import java.util.List;

public interface ReservationCrudRepository extends CrudRepository<Reservation,Integer> {

    //Select idClient, count(*) from Reservation group by idClient order by desc;
    @Query("SELECT c.client, COUNT(c.client) FROM Reservation AS c GROUP BY c.client ORDER BY COUNT (c.client) DESC")
    public List<Object[]> getTopClients();
    public List<Reservation> findAllByStartDateAfterAndStartDateBefore (Date d1, Date d2);

    //Es como decir: SELECT * FROM RESERVATION WHERE STATUS LIKE "status";
    public List<Reservation> findAllByStatus (String status);


}
