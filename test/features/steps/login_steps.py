from behave import given, when, then
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@given("I am on the Login page")
def step_open_login(context):
    context.driver = webdriver.Chrome()
    context.driver.maximize_window()
    context.driver.get("http://localhost:5173/signin")  # AJUSTA si tu ruta es distinta

@when('I type the email "{email}"')
def step_type_email(context, email):
    email_input = context.driver.find_element(By.NAME, "email")
    email_input.clear()
    email_input.send_keys(email)

@when('I type the password "{password}"')
def step_type_password(context, password):
    password_input = context.driver.find_element(By.NAME, "password")
    password_input.clear()
    password_input.send_keys(password)

@when("I press the Login button")
def step_press_login(context):
    button = context.driver.find_element(By.XPATH, "//button[contains(text(),'Sign In')]")
    button.click()

@when("I enable the Remember Me option")
def step_enable_remember(context):
    checkbox = context.driver.find_element(By.ID, "rememberMe")
    if not checkbox.is_selected():
        checkbox.click()

@then("I should be redirected to the dashboard or user setup")
def step_validate_redirect(context):
    WebDriverWait(context.driver, 10).until(
        lambda driver:
        driver.current_url.endswith("/") or driver.current_url.endswith("/userSetUp")
    )
    assert True

@then("an error message should be displayed")
def step_error_message(context):
    error = WebDriverWait(context.driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "text-red-500"))
    )
    assert error.is_displayed()

def after_scenario(context, scenario):
    if hasattr(context, "driver"):
        context.driver.quit()
