package com.hotel.reservation.service;

import com.hotel.reservation.model.Hotel;
import com.hotel.reservation.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepo;

    public Hotel addHotel(Hotel hotel) {
        return hotelRepo.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepo.findAll();
    }

    public void deleteHotel(Long id) {
        hotelRepo.deleteById(id);
    }

    public Hotel updateHotel(Long id, Hotel updated) {
        Hotel h = hotelRepo.findById(id).orElseThrow();
        h.setName(updated.getName());
        h.setLocation(updated.getLocation());
        h.setImageUrl(updated.getImageUrl());
        h.setTotalRooms(updated.getTotalRooms());
        h.setRoomType(updated.getRoomType());
        h.setPrice(updated.getPrice());
        return hotelRepo.save(h);
    }

    public List<Hotel> filterHotels(String roomType, String location, Double price) {
        List<Hotel> all = hotelRepo.findAll();

        return all.stream()
                .filter(hotel -> roomType == null || hotel.getRoomType().toLowerCase().contains(roomType.toLowerCase()))
                .filter(hotel -> location == null || hotel.getLocation().toLowerCase().contains(location.toLowerCase()))
                .filter(hotel -> price == null || hotel.getPrice() <= price)
                .toList();
    }

}
