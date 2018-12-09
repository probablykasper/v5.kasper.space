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
