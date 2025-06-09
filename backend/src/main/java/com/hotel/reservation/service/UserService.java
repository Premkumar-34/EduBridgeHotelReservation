package com.hotel.reservation.service;

import com.hotel.reservation.model.User;
import com.hotel.reservation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepo.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }

    public Optional<User> adminLogin(String email, String password) {
        if ("edwinkumar11@admin.com".equalsIgnoreCase(email) && "1234".equals(password)) {
            User admin = new User();
            admin.setId(0L);
            admin.setName("Admin");
            admin.setEmail(email);
            admin.setPhone("N/A");
            admin.setAddress("N/A");
            admin.setPassword(password);
            admin.setRole("ADMIN");
            return Optional.of(admin);
        }
        return Optional.empty();
    }
}
