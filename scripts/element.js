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
