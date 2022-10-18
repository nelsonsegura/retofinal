package com.reto3.reto03.repository.crudRepository;

import com.reto3.reto03.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message,Integer> {


}
