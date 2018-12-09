// window.THREE = require('./three.min.js')
// require('./canvas-renderer-and-projector.min.js')
// require('./bg.js')

console.log(location.href.includes('/synctan'))

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
