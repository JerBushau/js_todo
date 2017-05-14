'use strict'

class Todo {
  constructor(text, id) {
    this.text = text
    this.id = id
    // default todo template
    this.template = new TodoTemplate(this.text, this.id)
  }

  setText(text) {
    this.text = text
    this.template.defaultTemplate.children['mainLabel']
      .attributes.textContent = this.text
  }
}
