window.THREE = require('./three.min.js')
require('./canvas-renderer-and-projector.min.js')
require('./bg.js')

// pages
function openPage(newPage, title) {
  if (title) document.title = title
  const currentPageEl = document.querySelector('.page.visible')
  if (currentPageEl) currentPageEl.classList.remove('visible')
  const pageEl = document.querySelector(`.page[data-page='${newPage}']`)
  pageEl.classList.add('visible')
}

let pathname = location.pathname
if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0,-1)
history.replaceState({page:pathname}, document.title)
document.addEventListener('click', (e) => {
  let el = e.target
  while (el.parentElement && el.tagName !== 'A') el = el.parentElement
  
  if (el.tagName === 'A' && history.pushState) {
    e.preventDefault()
    // deselect current page from nav bar
    const navItems = document.querySelectorAll('.nav-bar .current')
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].classList.remove('current')
    }
    // select new page in nav bar
    newPage = el.getAttribute('href')
    navBarItem = document.querySelector(`.nav-bar a[href='${newPage}']`)
    if (navBarItem) {
      navBarItem.classList.add('current')
      let title = el.innerText+' | KH'
      if (el.classList.contains('in-submenu')) {
        const parentNavItem = el.parentElement.parentElement
        parentNavItem.classList.add('current')
        const parentText = parentNavItem.children[0].innerText
        title = el.innerText+' - '+el.parentElement.parentElement.innerText+' | KH'
      }
      console.log(newPage)
      window.history.pushState({page:newPage}, title, newPage)
      openPage(newPage, title)
    } else {
      const title = 'KH'
      history.pushState({page:newPage}, title, newPage)
      openPage(newPage, title)
    }
  }

})
// window.addEventListener('onpopstate', (e) => {
//   console.log(e)
//   openPage(e.state.page)
// })
window.addEventListener('popstate', function(event) {
  console.log(event.state);
  openPage(event.state.page);
});
