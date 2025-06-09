package com.hotel.reservation.service;

import com.hotel.reservation.model.Booking;
import com.hotel.reservation.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    public Booking createBooking(Booking booking) {
        booking.setStatus("PENDING");
        return bookingRepo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepo.findById(id).orElseThrow();
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepo.findByUserId(userId);
    }
}
