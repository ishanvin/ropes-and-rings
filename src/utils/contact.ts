const WHATSAPP_NUMBER = '919177954411';

const whatsappMessage = (productName?: string) => productName ? `Hi Ropes & Rings, I would like to order ${productName}. Please share the details.` : 'Hi Ropes & Rings, I would like to place an order. Please share the details.';

export const instagramUrl = 'https://www.instagram.com/ropes_and_rings';

export const getWhatsAppOrderUrl = (productName?: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage(productName))}`;