'use strict'

const utils = require('./utils')

const registerMe = async () => {
  await utils.signUpThroughNavbar()
  await utils.switchToRegistrationTab()
  await utils.fillAndSubmitRegistrationForm()
}

beforeAll(async () => {
  await page.goto(`${URL}/pricing`, { waitUntil: 'domcontentloaded' })
})

afterAll(async () => {
  await DB.destroy()
})

beforeEach(async () => {
  utils.deleteDBUser(DB)
})

afterEach(async () => {
  utils.deleteDBUser(DB)
})

describe('Unregistered user registers, logins and subscribes to free', () => {
  test('sample test', async () => {
    utils.deleteDBUser(DB)

    await page.goto(`${URL}/pricing`, { waitUntil: 'domcontentloaded' })

    await registerMe()
    await utils.confirmDBUserEmail(DB)
    await utils.fillInAndSubmitLoginForm()

    await utils.choosePlan({ plan: 'Free', type: 'paid' })
    await page.waitForNetworkIdle()

    const planSelectorItem = await page.waitForSelector('general-layout plan-selector-item[name="Free"] paper-button[data-type="paid"] span')
    const text = await page.evaluate(el => el.textContent.trim(), planSelectorItem)
    expect(text).toBe('Subscribed')
  })
})
