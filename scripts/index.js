var sticky = false

function setStandardAvatar(e) {
  var node = e.target
  var name = node.getAttribute('data-name')
  if (node.src.indexOf('' + name + '.') !== -1) return
  node.src = node.src.replace('_teehee', '')
}

function setFunnyAvatar(e) {
  var node = e.target
  var name = node.getAttribute('data-name')
  if (node.src.indexOf('_teehee') !== -1) return
  node.src = node.src.replace('' + name + '.', '' + name + '_teehee.')
}

function toggleSticky(images) {
  images.classList.toggle('sticky')
  sticky = !sticky
}

function applySticky(content, images, e) {
  var contentRect = content.getBoundingClientRect()
  var imageRect = images.getBoundingClientRect()
  console.log(contentRect.height - imageRect.height)
  // if (!sticky && contentRect.top < 0 && contentRect.top > -1 * (contentRect.height - imageRect.height)) {
  if (!sticky && imageRect.top < 0) {
    toggleSticky(images)
  }
}

function onDomLoaded(e) {
  var avatars = document.querySelectorAll('.team-avatar')
  for (var i = 0; i < avatars.length; i++) {
    var avatar = avatars[i]
    avatar.addEventListener('mouseover', setFunnyAvatar)
    avatar.addEventListener('mouseout', setStandardAvatar)
  }
  var aboutBlock = document.querySelector('#about')
  var imageBlock = document.querySelector('#images')
  applySticky = applySticky.bind(this, aboutBlock, imageBlock)
  // window.addEventListener('scroll', applySticky)

  var grid = document.querySelector('.grid')
  var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    gutter: 25
  })

  imagesLoaded(grid, function() {
    // layout Masonry after each image loads
    msnry.layout()
  })
}

document.addEventListener('DOMContentLoaded', onDomLoaded)
