Feature: User Login
  As a registered user
  I want to log into the RunApp application
  So that I can access my dashboard or complete my setup

  Background:
    Given I am on the Login page

  Scenario: Successful login with valid credentials
    When I type the email "test@example.com"
    And I type the password "123456"
    And I press the Login button
    Then I should be redirected to the dashboard or user setup

  Scenario: Login fails due to incorrect credentials
    When I type the email "wrong@example.com"
    And I type the password "badpassword"
    And I press the Login button
    Then an error message should be displayed

  Scenario: Remember me checkbox functions correctly
    When I type the email "test@example.com"
    And I type the password "123456"
    And I enable the Remember Me option
    And I press the Login button
    Then I should be redirected to the dashboard or user setup
