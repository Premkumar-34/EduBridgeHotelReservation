package com.hotel.reservation.controller;

import com.hotel.reservation.model.Booking;
import com.hotel.reservation.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public Booking book(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/all")
    public List<Booking> all() {
        return bookingService.getAllBookings();
    }

    @PutMapping("/update/{id}")
    public Booking update(@PathVariable Long id, @RequestParam String status) {
        return bookingService.updateStatus(id, status);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> byUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}
