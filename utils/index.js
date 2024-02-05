'use strict'

module.exports = {
  deleteDBUser: async db => {
    return db('user').where({
      email: 'john@doe.com',
      network: 'local'
    }).del()
  },

  confirmDBUserEmail: async db => {
    return db('user').update({
      email_verified: true
    }).where({
      email: 'john@doe.com',
      network: 'local'
    })
  },

  wait: async (ms = 5000) => {
    return new Promise(resolve =>
        setTimeout(() => resolve(), 2500))
  },

  choosePlan: async ({ plan = 'Free', planType = 'paid' }) => {
    const planSelectorItem = await page.waitForSelector(`plan-selector-item[name="${plan}"] paper-button[data-type="${planType}"]`)
    await planSelectorItem.click()
  },

  signUpThroughNavbar: async () => {
    const signUpButton = await page.waitForSelector(`nav-bar .links-container paper-button[tabindex="0"]`)
    await signUpButton.click()
  },

  switchToRegistrationTab: async () => {
    const registerTab = await page.waitForSelector('#auth-modal paper-tab[name="registration-page"]')
    await registerTab.click()

    const localButton = await page.waitForSelector(`#auth-modal registration-page paper-button[data-network="local"]`)
    localButton.click()
  },

  switchToLoginTab: async () => {
    const registerTab = await page.waitForSelector('#auth-modal paper-tab[name="login-page"]')
    await registerTab.click()

    const localButton = await page.waitForSelector(`#auth-modal login-page paper-button[data-network="local"]`)
    localButton.click()
  },

  fillAndSubmitRegistrationForm: async () => {
    const nameInput = await page.waitForSelector(`#auth-modal registration-page paper-input[label="Name"] input`)
    await nameInput.type('John Doe')

    const emailInput = await page.waitForSelector(`#auth-modal registration-page paper-input[label="Email"] input`)
    await emailInput.type('john@doe.com')

    const passwordInput = await page.waitForSelector(`#auth-modal registration-page paper-input[label="Password"] input`)
    await passwordInput.type('johndoeE1!')

    const confirmPasswordInput = await page.waitForSelector(`#auth-modal registration-page paper-input[label="Confirm Password"] input`)
    await confirmPasswordInput.type('johndoeE1!')

    const submitButton = await page.waitForSelector(`#auth-modal local-registration-form .buttons paper-button.primary`)
    await submitButton.click()

    await page.waitForNetworkIdle()

    const confirmEmailButton = await page.waitForSelector(`#auth-modal registration-page confirm-email-page paper-button`)
    await confirmEmailButton.click()
  },

  fillInAndSubmitLoginForm: async () => {
    const emailInput = await page.waitForSelector(`local-login-form paper-input[type="email"] input`)
    const passwordInput = await page.waitForSelector(`local-login-form paper-input[type="password"] input`)

    await emailInput.type('john@doe.com')
    await passwordInput.type('johndoeE1!')

    const submitButton = await page.waitForSelector(`local-login-form .buttons paper-button[type="submit"]`)

    await submitButton.click()
  }
}
