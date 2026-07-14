import { useState } from 'react';
import type React from 'react';
import './ProductGallery.css';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const hasMultipleImages = images.length > 1;

  const goToImage = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null || !hasMultipleImages) {
      return;
    }

    const distance = touchStart - clientX;
    const minSwipeDistance = 40;

    if (Math.abs(distance) >= minSwipeDistance) {
      goToImage(activeIndex + (distance > 0 ? 1 : -1));
    }

    setTouchStart(null);
  };

  return (
    <div className="product-gallery">
      <div
        className="product-gallery-viewport"
        onTouchStart={event => setTouchStart(event.touches[0].clientX)}
        onTouchEnd={event => handleTouchEnd(event.changedTouches[0].clientX)}
      >
        <div
          className="product-gallery-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${alt} ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <button
              className="gallery-arrow gallery-arrow-prev"
              type="button"
              aria-label="Previous image"
              onClick={() => goToImage(activeIndex - 1)}
            >
              ‹
            </button>
            <button
              className="gallery-arrow gallery-arrow-next"
              type="button"
              aria-label="Next image"
              onClick={() => goToImage(activeIndex + 1)}
            >
              ›
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="gallery-dots" aria-label="Product images">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={index === activeIndex ? 'active' : ''}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
