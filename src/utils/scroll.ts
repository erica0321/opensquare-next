export const getScrollPosition = () => {
  const scrollPosition = document.documentElement.scrollTop
  return { scrollPosition }
}

export const disableScroll = () => {
  document.body.style.overflow = 'hidden'
  const { scrollPosition } = getScrollPosition()

  window.scrollTo({ top: scrollPosition })
}

export const enableScroll = () => {
  document.body.style.overflow = 'visible'
}
