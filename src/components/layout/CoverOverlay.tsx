import { useState } from 'react'
import coverImage from '../../../Images/coverpage.jpg'
import './CoverOverlay.css'

type CoverOverlayProps = {
  onDismiss: () => void
}

const CoverOverlay = ({ onDismiss }: CoverOverlayProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false)

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
          width="896"
          height="1152"
          loading="eager"
          decoding="sync"
        />
        <button
          className="cover-overlay__owl-hotspot"
          type="button"
          aria-label="Enter Ropes and Rings"
          onClick={handleEnter}
        />
      </div>
    </div>
  )
}

export default CoverOverlay
