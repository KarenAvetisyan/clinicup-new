"use strict";

class Accordion {
  constructor(root, { multiple = false } = {}) {
    this.root = root;
    this.multiple = multiple;
    this.links = root.querySelectorAll('._accordion-item__head');

    this.bindEvents();
  }

  bindEvents() {
    this.links.forEach(link => {
      link.addEventListener('click', e => this.toggle(e, link));
    });
  }

  toggle(e, link) {
    const content = link.nextElementSibling;
    if (!content) return;

    const isOpen = content.style.maxHeight;

    content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
    link.parentElement.classList.toggle('open', !isOpen);

    if (!this.multiple) this.closeOthers(content);
  }

  closeOthers(active) {
    this.links.forEach(link => {
      const panel = link.nextElementSibling;
      if (panel && panel !== active) {
        panel.style.maxHeight = null;
        link.parentElement.classList.remove('open');
      }
    });
  }
}

export function initAccordion({
  selector = '#accordion',
  multiple = false
} = {}) {

  const root = document.querySelector(selector);
  if (!root) return;

  return new Accordion(root, { multiple });
}
