/// <reference types="cypress" />

context("Tests for todo form", () => {
	before(() => {
		cy.writeFile("src/utils/db/todos.json", {
			todos: [],
		});
	});
	beforeEach(() => {
		cy.visit("/");
	});
	describe("Todo form", () => {
		it("should open the form modal", () => {
			cy.get("#add-todo").click();
			cy.get("#todo-form").should("be.visible");
		});
		it("should add a new task", () => {
			cy.get("#add-todo").click();
			cy.get("#todo-form").should("be.visible");
			cy.get("#description").type("Test task");
			cy.get('button[type="submit"]').click();
			cy.get("#close-todo-form-button").click();
			cy.get("#todo-list-table")
				.find("tbody tr:last")
				.find("td:first")
				.next()
				.should("contain", "Test task");
		});
		it("should update a task status and description", () => {
			cy.get("#todo-list-table")
				.find("tbody tr:last")
				.find("td:last")
				.find("#edit-task-button")
				.click();
			cy.get("#todo-form #description").clear().type("Test task updated");
			cy.get("#todo-form #status")
				.select("completed")
				.should("have.value", "completed");
			cy.get("button[type='submit']").click();
			cy.get("#todo-list-table")
				.find("tbody tr:last")
				.find("td:first")
				.next()
				.should("contain", "Test task updated")
				.next()
				.should("contain", "completed");
		});
		it("should delete a task", () => {
			cy.get("#todo-list-table")
				.find("tbody tr:last")
				.find("td:last")
				.find("#delete-task-button")
				.click();
			cy.get("[data-test-id='delete-warning-dialog']").should("be.visible");
			cy.get(
				"[data-test-id='delete-warning-dialog'] #confirm-delete-button"
			).click();
			cy.get("#todo-list-table")
				.find("tbody tr:last")
				.find("td")
				.should(($div) => {
					expect($div).to.have.text("No tasks found");
				});
		});
	});
});
