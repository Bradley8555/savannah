from playwright.sync_api import sync_playwright

def test_search_functionality():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        # Navigate to the landing page
        page.goto('http://127.0.0.1:8000')

        # Click on 'Log in'
        page.click('text=Log in')
        
        # Click on 'Google'
        page.click('text=Google')

        # Click 'Continue' (adjust selector based on actual button text)
        page.click('text=Continue')

        # Simulate selecting the Google account (assuming a selection step)
        page.click("text=Your Google Account")  # Adjust the selector

        # Click 'Photos'
        page.click('text=Photos')

        # Enter search term 'qui' in the search box
        page.fill('input[placeholder="Search"]', 'qui')

        # Validate the search results contain the term 'qui'
        results = page.locator('.card').all_text_contents()
        assert all('qui' in result.lower() for result in results), "Not all search results contain 'qui'"

        # Close browser
        browser.close()

if __name__ == "__main__":
    test_search_functionality()
