window.THREE = require('./three.min.js')
require('./canvas-renderer-and-projector.min.js')
require('./bg.js')

// pages
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-item')) {
    document.querySelector('.current-page').classList.remove('current-page')
    e.target.classList.add('current-page')
  }
})
if (location.href.includes('/work')) {
  document.querySelector('.nav-item.work').classList.add('current-page')
} else if (location.href.includes('/for-sale')) {
  document.querySelector('.nav-item.for-sale').classList.add('current-page')
} else if (location.href.includes('/contact')) {
  document.querySelector('.nav-item.contact').classList.add('current-page')
}

// social media popups
document.addEventListener('click', function (e) {
  function hideAllPopups () {
    var popups = document.querySelectorAll('a.has-popup .popup')
    for (var i = 0; i < popups.length; i++) {
      popups[i].classList.add('hidden')
    }
  }
  if (e.target.classList.contains('has-popup')) {
    var popup = e.target.querySelector('.popup')
    if (e.target.classList.contains('popup')) popup = e.target
    var clickedPopup = e.target.classList.contains('popup')
    var popupIsHidden = popup.classList.contains('hidden')
    if (popupIsHidden) {
      hideAllPopups()
      var selection = window.getSelection()
      selection.removeAllRanges()
      var range = document.createRange()
      range.selectNodeContents(popup)
      selection.addRange(range)
      popup.classList.remove('hidden')
    } else if (!clickedPopup) {
      popup.classList.add('hidden')
    }
  } else if (!e.target.classList.contains('popup')) {
    // clicked anywhere
    hideAllPopups()
  }
})
