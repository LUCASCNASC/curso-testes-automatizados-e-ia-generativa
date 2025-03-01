describe('API Tests for /customers endpoint', () => {
    const baseUrl = 'http://localhost:3001/customers';
  
    it('should return customers with specified limit and page', () => {
      cy.request(`${baseUrl}?page=2&limit=10`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.customers).to.be.an('array').that.has.lengthOf(10);
        expect(response.body.pageInfo).to.have.property('currentPage', 2);
      });
    });
  
    it('should filter customers by size and industry', () => {
      cy.request(`${baseUrl}?size=Medium&industry=Technology`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.customers).to.be.an('array').that.is.not.empty;
        response.body.customers.forEach((customer) => {
          expect(customer).to.have.property('size', 'Medium');
          expect(customer).to.have.property('industry', 'Technology');
        });
      });
    });
  
    it('should return 400 Bad Request for invalid page parameter', () => {
      cy.request({
        url: `${baseUrl}?page=-1`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('should return 400 Bad Request for invalid limit parameter', () => {
      cy.request({
        url: `${baseUrl}?limit=abc`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('should return 400 Bad Request for unsupported size value', () => {
      cy.request({
        url: `${baseUrl}?size=Gigantic`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('should return 400 Bad Request for unsupported industry value', () => {
      cy.request({
        url: `${baseUrl}?industry=Space`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  
    it('should handle customers without contactInfo and address', () => {
      cy.request(`${baseUrl}?size=Small`).then((response) => {
        expect(response.status).to.eq(200);
        response.body.customers.forEach((customer) => {
          if (customer.contactInfo === null) {
            expect(customer).to.have.property('contactInfo', null);
          }
          if (customer.address === null) {
            expect(customer).to.have.property('address', null);
          }
        });
      });
    });
  });