package com.minervain.aou.controller;

import com.minervain.aou.model.Users;
import com.minervain.aou.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @CrossOrigin(origins = "http://localhost:3000")

    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        return userService.saveUser(user);
    }


    @CrossOrigin(origins = "http://localhost:3000")

    @PostMapping("/login")
    public String loginUser(@RequestBody Users user) {
     return userService.loginUser(user);
}}