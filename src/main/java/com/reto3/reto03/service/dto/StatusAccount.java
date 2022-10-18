package com.reto3.reto03.service.dto;

public class StatusAccount {

    Integer completed;
    Integer cancelled;

    public StatusAccount (int completed, int cancelled){
        this.cancelled = cancelled;
        this.completed = completed;
    }

    public Integer getCompleted() {
        return completed;
    }

    public void setCompleted(Integer completed) {
        this.completed = completed;
    }

    public Integer getCancelled() {
        return cancelled;
    }

    public void setCancelled(Integer cancelled) {
        this.cancelled = cancelled;
    }
}
