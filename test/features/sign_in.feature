Feature: Sign in page functionality
  As a user
  I want to log in to the RunApp application
  So that I can access my dashboard

  Background:
    Given I open the Sign In page

  Scenario: Successful login redirects to dashboard or setup
    When I enter a valid email "erick.alejandro16@outlook.com"
    And I enter a valid password "Password1234"
    And I click the Sign In button
    Then I should be redirected to a valid page

  Scenario: Login fails due to invalid credentials
    When I enter an invalid email "wrong@example.com"
    And I enter an invalid password "wrongpass"
    And I click the Sign In button
    Then I should see an error message

  Scenario: Remember me checkbox works
    When I enter a valid email "erick.alejandro16@outlook.com"
    And I enter a valid password "Password1234"
    And I check the Remember Me box
    And I click the Sign In button
    Then I should be redirected to a valid page


