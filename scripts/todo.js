'use strict'

class Todo {
  constructor(text, id) {
    this.text = text
    this.id = id
    // default todo template
    this.template = new Element({
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
            textContent: this.text
          },
          on: {
            event: 'click',
            function: function editMode() {
              let editInput = this.parentElement.children[1]
              let saveBtn = this.parentElement.children[2].children[0]
              let mainLabel = this.parentElement.children[0]

              this.classList.add('hidden')
              editInput.classList.toggle('hidden')
              saveBtn.classList.toggle('hidden')
              editInput.value = mainLabel.textContent
            }
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
              on: {
                event: 'click',
                function: function saveChanges() {
                  let parent = this.parentElement.parentElement
                  let mainLabel = parent.children[0]
                  let editInput = parent.children[1]
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
                  editInput.classList.toggle('hidden')
                  mainLabel.classList.toggle('hidden')
                }
              }
            }),
            // remove btn
            removeBtn: new Element({
              tag: 'button',
              attributes: {
                textContent: 'remove'
              },
              on: {
                event: 'click',
                function: function _remove() {
                  let parent = this.parentElement.parentElement
                  let index;

                  for (let i = 0; i < allTodos.length; i++) {
                    if (allTodos[i].id === parseInt(parent.id)) {
                      index = allTodos.indexOf(allTodos[i])

                      allTodos.splice(index, 1)
                      parent.remove(this)
                    }
                  }
                }
              }
            })
          }
        })
      }
    })
  }

  setText(text) {
    this.text = text
    this.template.children['mainLabel'].attributes.textContent = this.text
  }
}
