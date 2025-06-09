package com.hotel.reservation.controller;

import com.hotel.reservation.model.Hotel;
import com.hotel.reservation.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping("/add")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelService.addHotel(hotel);
    }

    @GetMapping("/all")
    public List<Hotel> getAll() {
        return hotelService.getAllHotels();
    }

    @PutMapping("/update/{id}")
    public Hotel updateHotel(@PathVariable Long id, @RequestBody Hotel hotel) {
        return hotelService.updateHotel(id, hotel);
    }

    @GetMapping("/filter")
    public List<Hotel> filter(@RequestParam(required = false) String roomType,
                              @RequestParam(required = false) String location,
                              @RequestParam(required = false) Double price) {
        return hotelService.filterHotels(roomType, location, price);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        hotelService.deleteHotel(id);
    }
}
