'use strict'

const formWrap = document.getElementById('form-wrap')
const todoContainer = document.getElementById('todo-container')

let allTodos = [
  new Todo('hi, i\'m seed data', -1),
  new Todo('Just some more seed data', -2),
  new Todo('yo, strange looking code. but building it was fun.', -3)
]

allTodos.forEach((i) => {
  todoContainer.insertAdjacentElement('beforeend', i.template.render())
})

let n = 0

const todoInputForm = new Element({
  // form
  tag: 'form',
  children: {
    // form input
    formInput: new Element({
      tag: 'input',
      attributes: {
        type: 'text',
        name: 'todoInput'
      }
    }),
    // form submit button
    formSubmitBtn: new Element({
      tag: 'button',
      attributes: {
        type: 'submit',
        className: 'submitBtn',
        textContent: 'add'
      }
    })
  },
  on: {
    event: 'submit',
    function: function addTodo(e) {
      let newVal = this.children[0].value
      e.preventDefault()

      if (newVal === '') {
        return
      }

      let todo = new Todo(newVal, n)

      n++
      allTodos.push(todo)
      todoContainer.innerHTML= ''

      allTodos.forEach(i => {
        todoContainer.insertAdjacentElement('beforeend', i.template.render())
      })

      this.children[0].value = ''
    }
  }
})

formWrap.appendChild(todoInputForm.render())

