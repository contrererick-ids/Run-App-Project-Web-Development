from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time

@given("I open the Sign In page")
def step_open_signin(context):
    context.driver = webdriver.Chrome()
    context.driver.maximize_window()
    context.driver.get("http://localhost:5173/signin")

@when('I enter a valid email "{email}"')
def step_enter_valid_email(context, email):
    email_input = context.driver.find_element(By.NAME, "email")
    email_input.clear()
    email_input.send_keys(email)

@when('I enter a valid password "{password}"')
def step_enter_valid_password(context, password):
    password_input = context.driver.find_element(By.NAME, "password")
    password_input.clear()
    password_input.send_keys(password)

@when('I enter an invalid email "{email}"')
def step_enter_invalid_email(context, email):
    context.driver.find_element(By.NAME, "email").send_keys(email)

@when('I enter an invalid password "{password}"')
def step_enter_invalid_password(context, password):
    context.driver.find_element(By.NAME, "password").send_keys(password)

@when("I click the Sign In button")
def step_click_signin(context):
    button = context.driver.find_element(By.XPATH, "//button[contains(text(),'Sign In')]")
    button.click()

@when("I check the Remember Me box")
def step_check_remember(context):
    checkbox = context.driver.find_element(By.ID, "rememberMe")
    if not checkbox.is_selected():
        checkbox.click()

@then("I should be redirected to a valid page")
def step_redirect(context):
    WebDriverWait(context.driver, 10).until(
        lambda driver: driver.current_url.endswith("/") or driver.current_url.endswith("/userSetUp")
    )
    assert True

@then("I should see an error message")
def step_error_message(context):
    error = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "text-red-500"))
    )
    assert error.is_displayed()

def after_scenario(context, scenario):
    context.driver.quit()
