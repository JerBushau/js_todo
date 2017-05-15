'use strict'

const formWrap = document.getElementById('form-wrap')
const todoContainer = document.getElementById('todo-container')

let n = 0
let allTodos = [
  new Todo('hi, i\'m seed data', -1),
  new Todo('Just some more seed data', -2),
  new Todo('yo, strange code. but building it was pretty fun.', -3)
]

allTodos.forEach(todo => {
  todoContainer.insertAdjacentElement(
    'beforeend',
    todo.template.defaultTemplate.render()
  )
})

const todoInputForm = new Element({
  // form element
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
  // form submit handler
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
        todoContainer.insertAdjacentElement(
          'beforeend',
          i.template.defaultTemplate.render()
        )
      })

      this.children[0].value = ''
    }
  }
})

formWrap.appendChild(todoInputForm.render())
