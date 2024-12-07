import { useState, useEffect } from 'react'
import { getScrollPosition } from '@/utils/scroll'

export function usePosition(isShow: boolean) {
  const [position, setPosition] = useState(0)
  useEffect(
    function getPosition() {
      setPosition(getScrollPosition().scrollPosition)
    },
    [isShow]
  )

  return position
}
