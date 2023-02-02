describe('Testing create user', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/register')
    })
  
    it('El menú nologin funciona correctamente', () => {
        cy.visit('http://localhost:3000')
        cy.wait(6000)
        cy.get('#identify').click()
        cy.contains('Inicia')
    })
  
    it('Aparece el formulario de registro', () => {
        cy.contains('Crear cuenta')
    })

    it('Error campos sin rellenar', () => {
        cy.get('#createUserButton').click()
        cy.contains('Todos los campos son obligatorios')
    })

    it('Error contraseñas diferentes', () => {
        cy.get('#password1').type('contraseña1')
        cy.get('#password2').type('contraseña2')
        cy.contains('Las contraseñas no coinciden')
    })

    it('Error usuario en uso', () => {
        cy.get('#nameInput').type('gonzalo')
        cy.get('#lastNameInput').type('apellido1')
        cy.get('#emailInput').type('correo@prueba.es')
        cy.get('#bankInput').type('12121212121212121212')
        cy.get('#usernameInput').type('gonzalo')
        cy.get('#password1').type('12345')
        cy.get('#password2').type('12345')
        cy.get('#createUserButton').click()
        cy.contains('El nombre de usuario está en uso')
    })

    it('Creación correcta de usuario', () => {
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

})

describe('Testing login', () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/')
        cy.wait(6000)
    })
  
    it('Error contraseña incorrecta', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('contraseñafalsa')
        cy.get('#loginButton').click()
        cy.contains('Las contraseñas no coinciden')
    })
  
    it('Error usuario incorrecto', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioFalso')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Usuario no existente')
    })
    
    it('Login correcto', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.contains('Sesión iniciada con éxito')
    })

    it('Deslogueo correcto', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.wait(4000)
        cy.get('#userMenu').click()
        cy.get('#unlogButton').click()
        cy.contains('Sesión cerrada correctamente')
    })

    it('Eliminar usuario', () => {
        cy.get('#identify').click()
        cy.contains('Inicia')
        cy.get('#usernameLogin').type('usuarioPrueba1')
        cy.get('#passwordLogin').type('12345')
        cy.get('#loginButton').click()
        cy.wait(4000)
        cy.get('#userMenu').click()
        cy.get('#delUserButton').click()
        cy.get('#confirmDelUser').click()
        cy.contains('Usuario eliminado')
    })
})
  