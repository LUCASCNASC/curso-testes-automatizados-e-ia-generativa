describe('API Tests', () => {
  
  const apiUrl = Cypress.env('apiUrl')

  it('Testa o status 200 e valida as propriedades da resposta', () => {
    cy.request('GET', `${apiUrl}/endpoint?queryString=value&anotherQueryString=value`).then((response) => {
      const { status, body } = response
      expect(status).to.eq(200)
      const { property1, property2 } = body
      expect(property1).to.exist
      expect(property2).to.be.a('string')
    })
  })

  it('Testa o status 400 quando a requisição é inválida', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/endpoint?invalidQueryString=value`,
      failOnStatusCode: false
    }).then((response) => {
      const { status, body } = response
      expect(status).to.eq(400)
      const { error } = body
      expect(error).to.exist
    })
  })
})