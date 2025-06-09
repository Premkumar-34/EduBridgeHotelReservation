package com.hotel.reservation.repository;

import com.hotel.reservation.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByRoomTypeContainingIgnoreCase(String roomType);
    List<Hotel> findByLocationContainingIgnoreCase(String location);
    List<Hotel> findByPriceLessThanEqual(double price);
}
