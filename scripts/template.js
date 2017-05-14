'use strict'
class TodoTemplate {
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
              // save btn handler
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
              // remove btn handler
              on: {
                event: 'click',
                function: function _remove() {
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
            })
          }
        })
      }
    })
  }
}