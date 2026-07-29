import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

type ScrollPosition = {
  left: number
  top: number
}

type ScrollPositions = Record<string, ScrollPosition>

const storageKey = 'ropes-rings-scroll-positions'

const readScrollPositions = (): ScrollPositions => {
  try {
    const storedPositions = sessionStorage.getItem(storageKey)
    if (!storedPositions) return {}

    const parsedPositions: unknown = JSON.parse(storedPositions)
    return parsedPositions && typeof parsedPositions === 'object'
      ? parsedPositions as ScrollPositions
      : {}
  } catch {
    return {}
  }
}

const persistScrollPositions = (positions: ScrollPositions) => {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(positions))
  } catch {
    // Scroll restoration still works during this session if storage is unavailable.
  }
}

const ScrollRestoration = () => {
  const location = useLocation()
  const navigationType = useNavigationType()
  const scrollPositionsRef = useRef<ScrollPositions>({})
  const hasLoadedPositionsRef = useRef(false)
  const scrollKey = `${location.key}:${location.pathname}${location.search}${location.hash}`

  if (!hasLoadedPositionsRef.current) {
    scrollPositionsRef.current = readScrollPositions()
    hasLoadedPositionsRef.current = true
  }

  const saveScrollPosition = useCallback(() => {
    scrollPositionsRef.current[scrollKey] = {
      left: window.scrollX,
      top: window.scrollY,
    }
    persistScrollPositions(scrollPositionsRef.current)
  }, [scrollKey])

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const savedPosition = scrollPositionsRef.current[scrollKey]

    if (navigationType === 'POP' && savedPosition) {
      window.scrollTo(savedPosition.left, savedPosition.top)
    } else if (!location.hash) {
      window.scrollTo(0, 0)
    }

    return saveScrollPosition
  }, [location.hash, navigationType, scrollKey, saveScrollPosition])

  useEffect(() => {
    window.addEventListener('pagehide', saveScrollPosition)

    return () => {
      window.removeEventListener('pagehide', saveScrollPosition)
    }
  }, [saveScrollPosition])

  return null
}

export default ScrollRestoration
