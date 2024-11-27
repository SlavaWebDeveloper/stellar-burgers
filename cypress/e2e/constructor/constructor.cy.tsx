import { deleteCookie, setCookie } from '../../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api';

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    setCookie(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmMzNzRhMDdjYzBiMDAxYzFkNTMxNCIsImlhdCI6MTczMjY3NjcwNywiZXhwIjoxNzMyNjc3OTA3fQ.4pvGw2zOWf7DgydchvNUpVsswTbhMwSAW7BxrDrEpVU'
    );
    localStorage.setItem(
      'refreshToken',
      'b7533a8d021b7e856cea09d0fc973c47c2c02a4942f56f2a63a5ccdf3df9359e8d2ef571f1c758ca'
    );

    cy.intercept('GET', `${URL}/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('GET', `${URL}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Добавление ингредиента в конструктор', () => {
    const burgerConstructor = '[data-cy="burger-constructor"]';
    const bunButton = '[data-cy="Булки"] button';
    const fillingButton = '[data-cy="Начинки"] button';

    cy.get(burgerConstructor)
      .find('.constructor-element')
      .should('have.length', 0);

    cy.get(bunButton).first().click();

    cy.get(burgerConstructor)
      .find('.constructor-element')
      .should('have.length', 2);

    cy.get(fillingButton).first().click();

    cy.get(burgerConstructor)
      .find('.constructor-element')
      .should('have.length', 3);
  });

  it('Тест открытия и закрытия модального окна ингредиента', () => {
    const modal = '[data-cy="modal"]';
    const ingredientItem = '[data-cy="ingredient-item"]';
    const closeModalButton = '[data-cy="close-modal"]';
    const modalOverlay = '[data-cy="modal-overlay"]';

    cy.get(ingredientItem).first().click();

    cy.get(modal).should('exist');

    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');

    cy.get(ingredientItem).first().click();
    cy.get(modal).should('exist');

    cy.get(modalOverlay).click('left', { force: true });
    cy.get(modal).should('not.exist');
  });

  it('Создания заказа и закрытие модального окна на крестик', () => {
    const burgerConstructor = '[data-cy="burger-constructor"]';
    const bunButton = '[data-cy="Булки"] button';
    const fillingButton = '[data-cy="Начинки"] button';
    const modal = '[data-cy="modal"]';
    const closeModalButton = '[data-cy="close-modal"]';
    const orderButton = '[data-cy="order-button"]';

    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as(
      'orderBurgerApi'
    );

    cy.get(bunButton).first().click();
    cy.get(fillingButton).first().click();

    cy.get(burgerConstructor).as('constructor');
    cy.get('@constructor').find(orderButton).click();

    cy.get(modal).as('modal').should('exist').and('contain', '60716');

    cy.get(closeModalButton).click();
    cy.get('@modal').should('not.exist');

    cy.get('@constructor')
      .find('.constructor-element')
      .should('have.length', 0);

    cy.wait('@orderBurgerApi');
  });

  it('Создание заказа и закрытие модального окна на оверлей', () => {
    const burgerConstructor = '[data-cy="burger-constructor"]';
    const bunButton = '[data-cy="Булки"] button';
    const fillingButton = '[data-cy="Начинки"] button';
    const modal = '[data-cy="modal"]';
    const modalOverlay = '[data-cy="modal-overlay"]';
    const orderButton = '[data-cy="order-button"]';

    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as(
      'orderBurgerApi'
    );

    cy.get(bunButton).first().click();
    cy.get(fillingButton).first().click();

    cy.get(burgerConstructor).as('constructor');
    cy.get('@constructor').find(orderButton).click();

    cy.get(modal).as('modal').should('exist').and('contain', '60716');

    cy.get(modalOverlay).click('left', { force: true });

    cy.get('@modal').should('not.exist');

    cy.get('@constructor')
      .find('.constructor-element')
      .should('have.length', 0);

    cy.wait('@orderBurgerApi');
  });
});
