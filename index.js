const modal = document.querySelector('#modal')
const modalInner = modal.querySelector('.modal__inner')
const modalImage = modalInner.querySelector('img')
const images = [...document.querySelectorAll('#gallery img')]
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

let currentImageIndex = null

modalInner.style.height = `${window.innerHeight / 1.2}px`
modalInner.style.width = `${window.innerHeight / 1.2}px`

function openModal() {
  modal.classList.add('open')

  modal.style.left = 0
}

function closeModal() {
  modal.classList.remove('open')

  setTimeout(() => {
    modal.style.left = '-9999px'
  }, 300)
}

modal.addEventListener('click', (event) => {
  if(modalInner.contains(event.target)) return

  closeModal()
})

for(const image of images) {
  image.addEventListener('click', () => {
    openModal()
    currentImageIndex = +image.dataset['index']
    modalImage.src = image.src
  })
}

function nextImage() {
  let index = images.findIndex(image => +image.dataset.index === currentImageIndex)

  index = index === images.length - 1 ? 0 : index + 1

  currentImageIndex = index
  modalImage.src = images[currentImageIndex].src
}

function prevImage() {
  let index = images.findIndex(image => +image.dataset.index === currentImageIndex)

  index = index === 0 ? images.length - 1 : index - 1

  currentImageIndex = index
  modalImage.src = images[currentImageIndex].src
}

prev.addEventListener('click', prevImage)
next.addEventListener('click', nextImage)

window.addEventListener('keydown', (event) => {
  if(event.code === 'ArrowRight') nextImage()
  if(event.code === 'ArrowLeft') prevImage()
})
