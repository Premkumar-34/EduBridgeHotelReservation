package com.hotel.reservation.controller;

import com.hotel.reservation.DTO.UserDto;
import com.hotel.reservation.model.User;
import com.hotel.reservation.repository.UserRepository;
import com.hotel.reservation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setRole("USER");
        return userService.saveUser(user);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }


   



    @PostMapping("/login")
    public User login(@RequestBody User user) {
        // Hardcoded admin check
        if ("pk1534007@gmail.com".equalsIgnoreCase(user.getEmail()) &&
                "1234".equals(user.getPassword())) {
            User adminUser = new User();
            adminUser.setId(0L); // Dummy ID (not used)
            adminUser.setName("Admin");
            adminUser.setEmail(user.getEmail());
            adminUser.setPassword("1234");
            adminUser.setRole("ADMIN");
            return adminUser;
        }

        // Check regular user
        Optional<User> existing = userService.findByEmail(user.getEmail());
        if (existing.isPresent() && existing.get().getPassword().equals(user.getPassword())) {
            return existing.get();
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
