//Конструктор бургера
const burgerConstructor = '[data-cy=burger-constructor]'
//Заказ
const orderButton = '[data-cy=order-button]'
const orderNumber = '[data-cy=order-number]'
//Ингредиенты
const ingredientsBuns = '[data-cy=ingredients-buns]'
const ingredientsMains = '[data-cy=ingredients-mains]'
const ingredientsSauces = '[data-cy=ingredients-sauces]'
//Модальное окно
const closeButton = '[data-cy=modal-close-button]'
const modalOverlay = '[data-cy=modal-overlay]'

describe('Конструктор бургера',() => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
    cy.visit('/')
    cy.wait('@getIngredients')
  });
  
  describe('Добавление ингредиентов',() => {
    it('Проверка добавления булки', ()=> {
      cy.get(burgerConstructor).contains('Краторная булка N-200i').should('not.exist')
      cy.get(ingredientsBuns).contains('Добавить').click(),
      cy.get(burgerConstructor).contains('Краторная булка N-200i').should('exist')
    })

    it('Проверка добавления начинки', ()=> {
      cy.get(burgerConstructor).contains('Биокотлета из марсианской Магнолии').should('not.exist')
      cy.get(ingredientsMains).contains('Добавить').click(),
      cy.get(burgerConstructor).contains('Биокотлета из марсианской Магнолии').should('exist')
    })

    it('Проверка добавления соуса', ()=> {
      cy.get(burgerConstructor).contains('Соус Spicy-X').should('not.exist')
      cy.get(ingredientsSauces).contains('Добавить').click(),
      cy.get(burgerConstructor).contains('Соус Spicy-X').should('exist')
    })
  })

  describe('Работа модальных окон',()=> {
    it('Проверка открытия модального окна', ()=> {
      cy.contains('Детали ингредиента').should('not.exist')
      cy.contains('Биокотлета из марсианской Магнолии').should('not.be.visible')
      cy.get(ingredientsMains).find('li').contains('Биокотлета из марсианской Магнолии').click()
      cy.contains('Детали ингредиента').should('exist')
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible')
    })

    it('Проверка закрытия модального окна через кнопку', ()=> {
      cy.contains('Детали ингредиента').should('not.exist')
      cy.get(ingredientsBuns).find('li').click()
      cy.contains('Детали ингредиента').should('exist')
      cy.get(closeButton).click()
      cy.contains('Детали ингредиента').should('not.exist')
    })

    it('Проверка закрытия модального окна через оверлэй', ()=> {
      cy.contains('Детали ингредиента').should('not.exist')
      cy.get(ingredientsBuns).find('li').click()
      cy.contains('Детали ингредиента').should('exist')
      cy.get(modalOverlay).click({force:true})
      cy.contains('Детали ингредиента').should('not.exist')
    })
  })

  describe('Создание заказа',()=> {
    it('Отправка заказа', ()=> {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('userAuth')
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder')
      cy.setCookie('accessToken', 'test-access-token')
      window.localStorage.setItem('refreshToken', 'test-refresh-token')
      cy.visit('/')

      cy.get(ingredientsBuns).contains('Добавить').click()
      cy.get(ingredientsMains).contains('Добавить').click()
      cy.get(ingredientsSauces).contains('Добавить').click()

      cy.get(orderButton).click()
      cy.get(orderNumber).contains('1').should('exist')

      cy.get(closeButton).click()
      cy.get(orderNumber).should('not.exist')

      cy.get(burgerConstructor).contains('Выберите булки').should('exist')
      cy.get(burgerConstructor).contains('Выберите начинку').should('exist')

      window.localStorage.clear()
      cy.clearCookies()
    })
  })
})
