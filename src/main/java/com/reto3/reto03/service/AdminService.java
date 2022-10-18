package com.reto3.reto03.service;

import com.reto3.reto03.entities.Admin;
import com.reto3.reto03.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> getAll(){ return adminRepository.getAll();}
    public Optional<Admin> getAdmin(int adminId){
        return adminRepository.getAdmin(adminId);
    }

    public Admin save(Admin admin){
        if (admin.getIdAdmin()==null){
            return adminRepository.save(admin);
        }else {
            Optional<Admin> admin1 = adminRepository.getAdmin(admin.getIdAdmin());
            if (admin1.isEmpty()){
                return  adminRepository.save(admin);
            }else {
                return admin;
            }
        }
    }
    /* //Condicionales para Administradores (probar)
    public Admin save(Admin admin){
        if (admin.getIdAdmin()==null){

            Admin q = new Admin();

            q.setName(admin.getName());

            if (admin.getPassword() != null && admin.getPassword().length() < 45) {
                q.setPassword(admin.getPassword());
            }
            if (admin.getEmail() != null && admin.getEmail().length() < 45){
                q.setEmail(admin.getEmail());
            }
            return adminRepository.save(admin);
        }else {
            Optional<Admin> admin1 = adminRepository.getAdmin(admin.getIdAdmin());
            if (admin1.isEmpty()){
                return  adminRepository.save(admin);
            }else {
                return admin;
            }
        }
    }
     */
    public Admin updateAdmin(Admin admin){
        if (admin.getIdAdmin()!=null) {
            Optional<Admin> q = adminRepository.getAdmin(admin.getIdAdmin());
            if (!q.isEmpty()) {
                if (admin.getPassword() != null && admin.getPassword().length() < 45) {
                    q.get().setPassword(admin.getPassword());
                }
                if (admin.getEmail() != null && admin.getEmail().length() < 45){
                    q.get().setEmail(admin.getEmail());
                }
                if (admin.getName() != null) {
                    q.get().setName(admin.getName());
                }
                return adminRepository.save(q.get());
            }
        }
         return admin;
    }

    public boolean delete(int id){
        boolean flag=false;
        Optional<Admin>p= adminRepository.getAdmin(id);
        if (p.isPresent()){
            adminRepository.delete(p.get());
            flag=true;
        }
        return flag;
    }
}
