'use strict'

class Element {
  constructor({tag:tag,
               attributes:attributes,
               children:children,
               on:on}) {
    this.tag = tag
    this.attributes = attributes
    this.children = children
    this.on = on
  }

  render() {
    if (!this.tag || typeof this.tag !== 'string') {
      return console.error('tag param!')
    }

    const newEl = document.createElement(this.tag);

    if (this.attributes && typeof this.attributes === 'object') {
      for (let i in this.attributes) {
        newEl[i] = this.attributes[i]
      }
    }

    if (this.children && typeof this.children === 'object') {

      for (let child in this.children) {
        newEl.appendChild(this.children[child].render())
      }
    }

    if (this.on) {
      newEl.addEventListener(this.on.event, this.on.function)
    }

    return newEl
  }
}
'use strict'

class viewtroller {
  constructor(text, id) {
    this.defaultTemplate = new Element({
      // todo container div
      tag: 'div',
      attributes: {
        className: 'todo',
        id: id
      },
      children: {
        // main-label
        mainLabel: new Element({
          tag: 'label',
          attributes: {
            textContent: text
          },
          // toggle editing state
          on: {
            event: 'click',
            function: this.editMode
          }
        }),
        // editMode input
        editInput: new Element({
          tag: 'input',
          attributes: {
            type: 'text',
            className: 'hidden'
          }
        }),
        // button container
        btnContainer: new Element({
          tag: 'div',
          attributes: {
            className: 'btn-container'
          },
          children: {
            // save btn
            saveBtn: new Element({
              tag: 'button',
              attributes: {
                textContent: 'save',
                type: 'submit',
                className: 'hidden'
              },
              // save btn handler
              on: {
                event: 'click',
                function: this.saveChanges
              }
            }),
            // complete btn
            completeBtn: new Element({
              tag: 'button',
              attributes: {
                textContent: 'complete',
                type: 'button',
              },
              // complete btn handler
              on: {
                event: 'click',
                function: this.todoComplete
              }
            }),
            // remove btn
            removeBtn: new Element({
              tag: 'button',
              attributes: {
                textContent: 'remove'
              },
              // remove btn handler
              on: {
                event: 'click',
                function: this._remove
              }
            })
          }
        })
      }
    })
  }

  editMode() {
    let editInput = this.parentElement.children[1]
    let saveBtn = this.parentElement.children[2].children[0]
    let completeBtn = this.parentElement.children[2].children[1]
    let mainLabel = this.parentElement.children[0]

    // update view
    this.classList.toggle('hidden')
    completeBtn.classList.add('hidden')
    editInput.classList.toggle('hidden')
    saveBtn.classList.toggle('hidden')
    editInput.value = mainLabel.textContent
  }

  saveChanges() {
    let parent = this.parentElement.parentElement
    let mainLabel = parent.children[0]
    let editInput = parent.children[1]
    let completeBtn = this.parentElement.children[1]
    let index;

    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].id === parseInt(parent.id)) {
        index = allTodos.indexOf(allTodos[i])

        // update data
        allTodos[index].setText(editInput.value)
        // update view
        mainLabel.textContent = allTodos[index].text
      }
    }

    this.classList.add('hidden')
    completeBtn.classList.toggle('hidden')
    editInput.classList.toggle('hidden')
    mainLabel.classList.toggle('hidden')
  }

  todoComplete() {
    let parent = this.parentElement.parentElement
    let index;

    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].id === parseInt(parent.id)) {
        index = allTodos.indexOf(allTodos[i])

        // update data
        if (!allTodos[index].complete || allTodos[index].complete === false) {
          allTodos[index].complete = true
        } else {
          allTodos[index].complete = false
        }
        // update view
        parent.classList.toggle('complete')

      }
    }
  }

  _remove() {
    let parent = this.parentElement.parentElement
    let index;

    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].id === parseInt(parent.id)) {
        index = allTodos.indexOf(allTodos[i])

        // update data
        allTodos.splice(index, 1)
        // update view
        parent.remove(this)
      }
    }
  }
}
'use strict'

class Todo {
  constructor(text, id) {
    this.text = text
    this.id = id
    // default todo template
    this.template = new viewtroller(this.text, this.id)
  }

  setText(text) {
    this.text = text
    this.template.defaultTemplate.children['mainLabel']
      .attributes.textContent = this.text
  }
}
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
