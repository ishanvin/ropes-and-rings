import { useState } from 'react'
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
        <p className="cover-overlay__instruction">Click any owl to enter</p>
      </div>
    </div>
  )
}

export default CoverOverlay
