package com.example.canteen.canteenInterface;

import com.example.canteen.model.OrderEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
public interface OrderInterface {

    /**
     * This method is used to add new order detail to the database.
     *
     * @return String indicating the status of the operation.
     */
    @PostMapping("/order")
    public String addNewOrderDetail(@RequestBody OrderEntity orderEntity);

    /**
     * This method is used to get all order details from the database.
     *
     * @return List of OrderEntity objects containing the order details.
     */
    @GetMapping("/get/orders")
    public List<OrderEntity> getAllOrderDetails();

    /**
     * This method is used to get order details for a particular user.
     *
     * @return List of OrderEntity objects containing the order details for the user.
     */
    @GetMapping("/order/{userEmailId}")
    public List<OrderEntity> getOrderDetailsForUser(@PathVariable String userEmailId);
}
