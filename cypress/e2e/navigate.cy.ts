describe('Testing del home', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3001')
  })

  it('El home carga correctamente', () => {
    cy.contains('GonzaloShop')
  })

  it('Aparece el apartado de productos', () => {
    cy.contains('Ofertas')
  })
})

describe('Testing de los productos', () => {
  beforeEach(function() {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
    cy.visit('http://localhost:3001/products/')
  })

  it('Aparecen los productos', () => {
    cy.wait(1000)
    cy.contains('Sudadera')
  })

  it('Aparecen los filtros', () => {
    cy.contains('Filtros')
  })

  it('Funcionan los filtros', () => {
    cy.get('#category').select('Ropa')
    cy.get('#applyFilters').click()
    cy.wait(1000)
    cy.contains('Sudadera')
  })

  it('Funciona el buscador', () => {
    cy.get('#searchInput').type('disco')
    cy.get('#searchButton').click()
    cy.wait(1000)
    cy.contains('Disco')
  })

  it('Filtrar por disco', () => {
    cy.visit('http://localhost:3001/products/disco')
    cy.wait(1000)
    cy.contains('Kingston')
  })

  it('Entrar en un producto', () => {
    cy.visit('http://localhost:3001/product/6447b73c262de0cf3a66166e')
    cy.wait(1000)
    cy.contains('Kingston')
    cy.contains('Capacidad')
    cy.contains('Valoraciones')
  })

  it('Error al intentar comprar un producto sin estar logueado', () => {
    cy.visit('http://localhost:3001/product/6447b73c262de0cf3a66166e')
    cy.wait(1000)
    cy.contains('Kingston')
    cy.get('#addToCartButton').click()
    cy.contains('Necesitas estar')
  })

})
