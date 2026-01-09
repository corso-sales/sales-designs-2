import { CheckoutJson, DemoConfig } from './types';
import LZString from 'lz-string';

/**
 * Convert DemoConfig to the full CheckoutJson schema expected by sales-designs
 */
export function configToCheckoutJson(config: DemoConfig): CheckoutJson {
  const showProducts: number[] = [];
  if (config.showShipping) showProducts.push(0);
  if (config.showReturns) showProducts.push(1);
  if (config.showWarranties) showProducts.push(2);

  return {
    storeName: config.storeName,
    brandColor: config.brandColor.replace('#', ''),
    brandLogo: config.brandLogo,
    productName: config.productName,
    productDesc: config.productDesc,
    productPrice: config.productPrice,
    productImage: config.productImage,
    exchangeProductName: config.exchangeProductName,
    exchangeProductImage: config.exchangeProductImage,
    exchangeProductOptions: ['S', 'M', 'L', 'XL'],
    exchangeProductOptionLabel: config.exchangeProductOptionLabel,
    exchangeProductPrice: config.productPrice,
    plusPrice: '$2.98',
    checkbox: true,
    checkboxLabel: 'Green Shipping Protection',
    checkboxDesc: 'Protect your order from loss, theft, and damage.',
    widgetImageUrl: 'https://cdn.corso.com/img/Default%20box.png',
    showProducts,
    showNextButton: config.showNextButton,
    rates: [],
  };
}

/**
 * Encode CheckoutJson to compressed base64 for URL parameter
 * Uses LZ-string compression to significantly shorten the URL
 */
export function encodeCheckout(checkoutJson: CheckoutJson): string {
  const jsonStr = JSON.stringify(checkoutJson);
  // Compress using LZ-string, then encode to base64
  const compressed = LZString.compressToBase64(jsonStr);
  return compressed;
}

/**
 * Generate the checkout parameter from DemoConfig
 */
export function generateCheckoutParam(config: DemoConfig): string {
  const checkoutJson = configToCheckoutJson(config);
  return encodeCheckout(checkoutJson);
}

/**
 * Generate demo URLs for all entry points
 */
export function generateDemoUrls(
  config: DemoConfig,
  baseUrl: string = 'https://corso-demo.vercel.app'
): Record<string, string> {
  const checkoutParam = generateCheckoutParam(config);

  return {
    portal: `${baseUrl}/portal.html?checkout=${checkoutParam}`,
    shippingIssue: `${baseUrl}/portal-shipping-issue.html?checkout=${checkoutParam}`,
    returns: `${baseUrl}/returns.html?checkout=${checkoutParam}`,
    warranties: `${baseUrl}/warranties-reg.html?checkout=${checkoutParam}`,
    adminReturns: `${baseUrl}/admin-returns.html?checkout=${checkoutParam}`,
    adminWarranties: `${baseUrl}/admin-warranties.html?checkout=${checkoutParam}`,
    adminShipping: `${baseUrl}/admin-shipping-issue.html?checkout=${checkoutParam}`,
  };
}

/**
 * Decode a checkout parameter back to CheckoutJson
 * Decompresses LZ-string compressed data
 * Falls back to old base64 format for backward compatibility
 */
export function decodeCheckout(encoded: string): CheckoutJson | null {
  try {
    // Try decompressing (new format)
    const decompressed = LZString.decompressFromBase64(encoded);
    if (decompressed) {
      return JSON.parse(decompressed);
    }
    
    // Fall back to old base64 format (backward compatibility)
    const jsonStr = typeof window !== 'undefined'
      ? atob(encoded)
      : Buffer.from(encoded, 'base64').toString('utf8');
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}
