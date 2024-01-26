package com.minervain.aou.service;

import com.minervain.aou.model.Users;
import com.minervain.aou.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.regex.Pattern.matches;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Users saveUser(Users user) {
        return userRepository.save(user);
    }
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    public String loginUser(Users user) {
        Users existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            // Kullanıcı adı doğrulaması
            if (existingUser.getUsername().equals(user.getUsername())) {
                // Şifre doğrulaması
                System.out.println("asdsa");
                if (matches(user.getPassword(), existingUser.getPassword())) {
                    return "Login success!";
                }
            }
        }
        return "Login failed!";
    }
    }
