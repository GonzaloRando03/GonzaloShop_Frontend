describe('Preparación del usuario', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/')
    })

    it('Creación de usuario para interacción', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('#nameInput').type('nombre1')
        cy.get('#lastNameInput').type('apellido1')
        cy.get('#emailInput').type('correo@prueba.es')
        cy.get('#bankInput').type('12121212121212121212')
        cy.get('#usernameInput').type('usuarioPrueba1')
        cy.get('#password1').type('12345')
        cy.get('#password2').type('12345')
        cy.get('#createUserButton').click()
        cy.contains('creado con éxito')
    })

    it('Login de usuario y añadir dinero', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
        cy.wait(6000)
        cy.get('#userMenu').click()
        cy.get('#50').click()
        cy.contains('Añadido correctamente')
    })

})

describe('Interacción con productos', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/product/63e2923e6154ac65cc7dc003')
    })

    it('Añadir valoración error', () => {
        cy.get('#addValorationButton').click()
        cy.get('#sendValoratión').click()
        cy.contains('Necesitas estar registrado')
    })

    it('Añadir valoración correctamente', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
        cy.wait(6000)
        cy.get('#addValorationButton').click()
        cy.get('#sendValoratión').click()
        cy.contains('añadida correctamente')
    })

    it('Añadir producto al carrito', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
        cy.wait(6000)
        cy.get('#addToCartButton').click()
        cy.contains('añadido')
    })

    it('Comprar producto', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
        cy.wait(6000)
        cy.visit('http://localhost:3000/cart')
        cy.get('#direction').type('dirección falsa para prueba')
        cy.get('#confirmBuy').click()
        cy.contains('Compra realizada')
    })

    it('Ver estado de envío', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
        cy.wait(6000)
        cy.visit('http://localhost:3000/compras')
        cy.contains('1')
    })
  
    it('Eliminar usuario', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.wait(6000)
        cy.get('#userMenu').click()
        cy.get('#delUserButton').click()
        cy.get('#confirmDelUser').click()
        cy.contains('Usuario eliminado')
    })
})
  