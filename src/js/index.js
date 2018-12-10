window.THREE = require('./three.min.js')
require('./canvas-renderer-and-projector.min.js')
require('./bg.js')

// pages
function openPage(newPage, title) {
  document.title = title
  const currentPageEl = document.querySelector('.page.visible')
  if (currentPageEl) currentPageEl.classList.remove('visible')
  const pageEl = document.querySelector(`.page[data-page='${newPage}']`)
  pageEl.classList.add('visible')
}

document.addEventListener('click', (e) => {
  let el = e.target
  while (el.parentElement && el.tagName !== 'A') el = el.parentElement
  
  if (el.tagName === 'A') {
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
        console.log(parentText)
        let title = el.innerText+' - '+el.parentElement.parentElement.innerText+' | KH'
      }
      window.history.pushState({page:newPage}, title, newPage)
      openPage(newPage, title)
    } else {
      const title = 'KH'
      window.history.pushState({page:newPage}, title, newPage)
      openPage(newPage, title)
    }
  }

  
  // let el = e.target
  // if (el.parentElement.classList.contains('nav-item')) el = el.parentElement
  // if (el.classList.contains('nav-item')) {
  //   const navItems = document.querySelectorAll('.nav-item.current')
  //   for (let i = 0; i < navItems.length; i++) {
  //     navItems[i].classList.remove('current')
  //   }
  //   el.classList.add('current')
  //   let title = e.target.innerText.trim()+' | KH'
  //   if (el.classList.contains('in-submenu')) {
  //     el.parentElement.parentElement.classList.add('current')
  //     title = el.innerHTML+' - '+el.parentElement.parentElement.innerHTML+' | '+title
  //   }
  //   const newPage = el.dataset.page
  //   window.history.pushState({page:newPage}, title, newPage)
  //   openPage(newPage, title)
  // } else if (el.classList.contains('kh-logo')) {
  //   const newPage = e.target.dataset.page
  //   const title = 'KH'
  //   window.history.pushState({page:newPage}, title, newPage)
  //   openPage(newPage, title)
  // }



}, false)
window.onpopstate = (e) => {
  openPage(e.state.page)
}
