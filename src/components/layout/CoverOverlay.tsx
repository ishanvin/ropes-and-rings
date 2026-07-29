import { useEffect, useState } from 'react'
import coverImage from '../../../Images/coverpage.jpg'
import './CoverOverlay.css'

type CoverOverlayProps = {
  onDismiss: () => void
}

const owls = [
  { position: 'top', label: 'Enter Ropes and Rings through the top owl' },
  { position: 'left', label: 'Enter Ropes and Rings through the left owl' },
  { position: 'bottom', label: 'Enter Ropes and Rings through the bottom owl' },
]

const CoverOverlay = ({ onDismiss }: CoverOverlayProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    const scrollY = window.scrollY
    const bodyStyle = document.body.style
    const rootStyle = document.documentElement.style
    const previousBodyStyles = {
      left: bodyStyle.left,
      overflow: bodyStyle.overflow,
      position: bodyStyle.position,
      right: bodyStyle.right,
      top: bodyStyle.top,
      width: bodyStyle.width,
    }
    const previousRootOverflow = rootStyle.overflow

    rootStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'

    return () => {
      rootStyle.overflow = previousRootOverflow
      bodyStyle.overflow = previousBodyStyles.overflow
      bodyStyle.position = previousBodyStyles.position
      bodyStyle.top = previousBodyStyles.top
      bodyStyle.left = previousBodyStyles.left
      bodyStyle.right = previousBodyStyles.right
      bodyStyle.width = previousBodyStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [])

  const handleEnter = () => {
    if (isFadingOut) return
    setIsFadingOut(true)
  }

  return (
    <div
      className={`cover-overlay${isFadingOut ? ' cover-overlay--leaving' : ''}`}
      aria-hidden={isFadingOut}
      onTransitionEnd={(event) => {
        if (isFadingOut && event.target === event.currentTarget) onDismiss()
      }}
    >
      <div className="cover-overlay__frame">
        <img
          src={coverImage}
          alt="Colorful macramé owl wall hangings on a warm beige wall"
          className="cover-overlay__image"
          width="672"
          height="1568"
          loading="eager"
          decoding="sync"
        />
        <div className="cover-overlay__image-shade" aria-hidden="true" />
        {owls.map((owl) => (
          <button
            className={`cover-overlay__owl-hotspot cover-overlay__owl-hotspot--${owl.position}`}
            type="button"
            aria-label={owl.label}
            onClick={handleEnter}
            key={owl.position}
          />
        ))}
      </div>
      <p className="cover-overlay__instruction">Click any owl to enter</p>
    </div>
  )
}

export default CoverOverlay
