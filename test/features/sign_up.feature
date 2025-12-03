Feature: Sign up page functionality
  As a new user
  I want to create an account in RunApp
  So that I can access my dashboard

  Background:
    Given I open the Sign Up page

  Scenario: Successful sign up redirects to dashboard or setup
    When I enter a valid user "Franco33"
    And I enter a valid email "test@example.com"
    And I enter a valid password "123456"
    And I enter a valid confirmation password "123456"
    And I accept the terms and conditions
    And I click the Sign Up button
    Then I should be redirected to a valid page

  Scenario: Sign up fails due to invalid credentials
    When I enter an invalid name "shbvhs,bvcwbbckwabhcbwkebvwyebhvbwlevbwhkebvkjw,evb"
    And I enter an invalid email "wrong@example.com"
    And I enter an invalid password "wrongpass"
    And I enter an invalid confirmation password "wrongpass"
    And I accept the terms and conditions
    And I click the Sign Up button
    Then I should see an error message

  Scenario: Terms checkbox validation
    When I enter a valid user "Franco33"
    And I enter a valid email "test@example.com"
    And I enter a valid password "123456"
    And I enter a valid confirmation password "123456"
    And I click the Sign Up button
    Then I should see an error message
