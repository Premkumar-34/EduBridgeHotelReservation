package com.hotel.reservation.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long hotelId;

    private String roomType;
    private LocalDate checkIn;
    private LocalDate checkOut;
    @Column
    private String name;  // the user's name


    private String status; // PENDING / APPROVED / REJECTED
}
