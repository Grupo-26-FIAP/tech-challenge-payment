Feature: Payment system

  Scenario: Verify checkout information
    Given the system is running
    When I access the route with orderId 123
    Then the system should return the checkout status with HTTP code 200
