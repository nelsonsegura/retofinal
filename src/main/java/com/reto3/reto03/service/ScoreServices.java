package com.reto3.reto03.service;

import com.reto3.reto03.entities.Score;
import com.reto3.reto03.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreServices {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getScores(){ return scoreRepository.getAll();}

    public Optional<Score> getScore(int id){ return scoreRepository.getScore(id);}

    public Score save(Score score){
        if (score.getIdScore() == null){
            return scoreRepository.save(score);
        }else{
            Optional<Score> temp =scoreRepository.getScore(score.getIdScore());
            if (temp.isEmpty()) {
                return scoreRepository.save(score);
            }else{
                return score;
            }
        }
    }

    public Score update(Score score){
        if (score.getIdScore()!=null){
            Optional<Score> q = scoreRepository.getScore(score.getIdScore());
            if (q.isPresent()){
                if (score.getScore()!=null){
                    q.get().setScore(score.getScore());
                }
                scoreRepository.save(q.get());
                return q.get();
            }else {
                return score;
            }
        }else {
            return score;
        }
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<Score>p= scoreRepository.getScore(id);
        if ((p.isPresent())){
            scoreRepository.delete(p.get());
            flag=true;
        }
        return flag;
    }

}
