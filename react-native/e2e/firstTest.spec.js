describe('Example', () => {
  it('should have account tab', async () => {
    await expect(element(by.id('STORIES_TAB'))).toBeVisible()
  })

  it('should have stories tab', async () => {
    await expect(element(by.id('STORIES_TAB'))).toBeVisible()
  })

  it('should have settings tab', async () => {
    await expect(element(by.id('SETTINGS_TAB'))).toBeVisible()
  })

  it('should have search tab', async () => {
    await expect(element(by.id('SEARCH_TAB'))).toBeVisible()
  })
})
