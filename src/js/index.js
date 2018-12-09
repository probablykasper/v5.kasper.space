window.THREE = require('./three.min.js')
require('./canvas-renderer-and-projector.min.js')
require('./bg.js')

// pages
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-item')) {
    document.querySelector('.current-page').classList.remove('current-page')
    e.target.classList.add('current-page')
    window.history.pushState({page:e.target.dataset.page}, 'KH - '+e.target.innerHTML, '/'+e.target.dataset.page)
  }
})

// menu
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('menu-item')) {
    const menuItems = e.target.parentElement.children
    let loopedPast = false
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('left')
      menuItems[i].classList.remove('right')
      menuItems[i].classList.remove('current')
      if (loopedPast) {
        menuItems[i].classList.add('right')
      } else if (menuItems[i] === e.target) {
        menuItems[i].classList.add('current')
        loopedPast = true
      } else {
        menuItems[i].classList.add('left')
      }
    }
    const current = e.target.parentElement.querySelector('.current')
    if (current) current.classList.remove('current')
    e.target.classList.add('current')
    // window.history.pushState({page:e.target.dataset.page}, 'KH - '+e.target.innerHTML, '/'+e.target.dataset.page)
  }
})
