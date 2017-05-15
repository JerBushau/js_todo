'use strict'

class viewtroller {
  constructor(text, id) {
    this.defaultTemplate = new Element({
      // container div
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
