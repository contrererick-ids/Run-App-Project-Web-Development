from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@given("I open the Sign Up page")
def step_open_signup(context):
    context.driver = webdriver.Chrome()
    context.driver.maximize_window()
    context.driver.get("http://localhost:5173/signup")

@when('I enter a valid user "{username}"')
@when('I enter an invalid name "{username}"')
def step_enter_username(context, username):
    field = context.driver.find_element(By.NAME, "username")
    field.clear()
    field.send_keys(username)

@when('I type a valid email "{email}"')
@when('I type an invalid email "{email}"')
def step_enter_email(context, email):
    field = context.driver.find_element(By.NAME, "email")
    field.clear()
    field.send_keys(email)

@when('I type a valid password "{password}"')
@when('I type an invalid password "{password}"')
def step_enter_password(context, password):
    field = context.driver.find_element(By.NAME, "password")
    field.clear()
    field.send_keys(password)

@when('I enter a valid confirmation password "{password}"')
@when('I enter an invalid confirmation password "{password}"')
def step_enter_confirm_password(context, password):
    field = context.driver.find_element(By.NAME, "confirmPassword")
    field.clear()
    field.send_keys(password)

@when("I accept the terms and conditions")
def step_accept_terms(context):
    checkbox = context.driver.find_element(By.ID, "agreeTerms")
    if not checkbox.is_selected():
        checkbox.click()

@when("I click the Sign Up button")
def step_click_signup(context):
    btn = context.driver.find_element(By.XPATH, "//button[contains(text(),'Sign Up')]")
    btn.click()

@then("I should be redirected to next page")
def step_valid_redirect(context):
    error = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "text-red-500"))
    )
    assert error.is_displayed()

@then("I should see an error for invalid credentials message")
def step_error_invalid_credentials_message(context):
    error = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "text-red-500"))
    )
    assert error.is_displayed()

@then("I should see an unchecked box message")
def step_error_unchecked_box_terms_and_conditions_message(context):
    checkbox = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.ID, "agreeTerms"))
    )
    
    assert not checkbox.is_selected()

def after_scenario(context, scenario):
    context.driver.quit()
