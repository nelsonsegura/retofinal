package com.reto3.reto03.repository;

import com.reto3.reto03.entities.Message;
import com.reto3.reto03.repository.crudRepository.MessageCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public class MessageRepository {

    @Autowired
    private MessageCrudRepository messageCrudRepository;
    public List<Message> getAll(){
        return (List<Message>) messageCrudRepository.findAll();
    }
    public Optional<Message> getMessage(int id){ return messageCrudRepository.findById(id);}
    public Message save(Message m){
        return messageCrudRepository.save(m);
    }
    public void delete(Message m){
        messageCrudRepository.delete(m);
    }
}
