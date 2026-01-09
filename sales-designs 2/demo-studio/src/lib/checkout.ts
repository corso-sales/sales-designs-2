import { CheckoutJson, DemoConfig } from './types';

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
 * Encode CheckoutJson to base64 for URL parameter
 */
export function encodeCheckout(checkoutJson: CheckoutJson): string {
  const jsonStr = JSON.stringify(checkoutJson);
  // Use btoa for browser, Buffer for Node
  if (typeof window !== 'undefined') {
    return btoa(jsonStr);
  }
  return Buffer.from(jsonStr).toString('base64');
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
 */
export function decodeCheckout(encoded: string): CheckoutJson | null {
  try {
    const jsonStr = typeof window !== 'undefined'
      ? atob(encoded)
      : Buffer.from(encoded, 'base64').toString('utf8');
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}
