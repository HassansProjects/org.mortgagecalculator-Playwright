import { test, expect } from '@playwright/test';

test('Verify user can click on Mortgage calc and calculate the mortgage', async ({ page }) => {

    await page.goto('https://www.mortgagecalculator.org/');
        await expect(page.locator("//strong[text()='Your Mortgage Payment Information']")).toContainText('Your Mortgage Payment Information');
        await page.locator('//a[contains(text(),"Mortgage Calcs")]').hover();
        await page.locator('//a[contains(text(),"30 yr Fixed")]').click();
        await expect(page.locator('h1')).toContainText('How Much Will My Monthly Mortgage Payments Be?');
        await expect(page.locator('//label[text()="Calculator"]')).toBeVisible();
        
        //Property & Loan Amount
        await expect(page.locator('//td[text()="Home Value: "]')).toBeVisible();
        const HomeValue = page.locator('#HomeValue');
        await HomeValue.fill('400000');
        await expect(page.locator("//td[text()='Down Payment: ']")).toBeVisible();
        await page.locator("#Down").fill("12000")
        await expect (page.locator("//td[text()='Loan Amount: ']")).toContainText("Loan Amount:");
       // get and print loan amount which it get calculated automaticaly  when home value and down payment are filled.
        const inputSelector = ("#Amount");
        const loanAmount = await page.$eval(inputSelector, (input)=> input.value); 
        console.log ("The Loan Amount is : ",loanAmount)

        // Mortgage Stracture

        await expect(page.locator("//td[text()=' Loan Term: ']")).toContainText("Loan Term:")
        await page.locator("input[name='Length']").fill("30")
        //await expect(page.locator("Interest Rate:  ")).toContainText("Interest Rate:")
        await page.locator("input[name='Interest']").fill("4.5");
        await expect(page.locator("//td[text()='Annual PMI: ']")).toContainText("Annual PMI:")
        await page.locator("input[name='PMI']").fill("2")

        // Closing Cost
        await expect(page.locator("(//td[text()='Discount Points: '])[2]")).toContainText("Discount Points:")
        await page.locator("input[name='Points']").fill("2")
        await expect(page.locator("(//td[text()='Origination Points: '])[2]")).toContainText("Origination Points:")
        await page.locator("input[name='Points3']").fill("3")
        await expect(page.locator("(//td[text()='Other Closing Costs: '])[2]")).toContainText("Other Closing Costs:")
        await page.locator("input[name='Closing']").fill("10000")

        // Other Homeownership Expenses
        await expect(page.locator("//td[text()=' Annual Property Taxes: ']")).toContainText("Annual Property Taxes:")
        await page.locator("input[name='PropertyTaxes']").fill("4500")
        await expect(page.locator("//td[text()=' Annual Homeowners Insurance: ']")).toContainText("Annual Homeowners Insurance:")
        await page.locator("input[name='Insurance']").fill("2500")
        await expect(page.locator("//td[text()='Monthly HOA: ']")).toContainText("Monthly HOA:")
        await page.locator("input[name='Hoa']").fill("4")

        // Calculate
        await expect("(//table[@class='sortable']//strong)[2]").toBeVisible
        await page.locator("input[value='Calculate']").click

        // Showing the monthly mortgage . here we use "element" and not "input" we use "input" when its a field and
        // "element" when its a text.
        // and we need to use "textContant" instead of using "value"
        // here the example for "input" + "value" we used in line 21"
                    //const inputSelector = ("#Amount");
                    //const loanAmount = await page.$eval(inputSelector, (input)=> input.value); 
                    //console.log ("The Loan Amount is : ",loanAmount)

        // and below is the example of "element" + "textContent" combination
        const inputSelect = ("(//table[@class='sortable']//strong)[2]");
        const MonthlyMortgage = await page.$eval(inputSelect, (element)=> element.textContent); 
        console.log ("Total Monthly Payment is:",MonthlyMortgage)

 
  });
