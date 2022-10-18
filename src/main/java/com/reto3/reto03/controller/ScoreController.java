package com.reto3.reto03.controller;

import com.reto3.reto03.entities.Score;
import com.reto3.reto03.service.ScoreServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Score")
@CrossOrigin(origins = "*", methods ={RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class ScoreController {
    @Autowired
    private ScoreServices scoreService;

    @GetMapping("/all")
    public List<Score> getAll() {
        return scoreService.getScores();
    }
    @GetMapping("/{id}")
    public Optional<Score> getScore(@PathVariable("id") int scoreId) {
        return scoreService.getScore(scoreId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score save(@RequestBody Score p) {
        return scoreService.save(p);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Score updateScore(@RequestBody Score score) {
        return scoreService.update(score);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int scoreId) {
        return scoreService.delete(scoreId);
    }
}
