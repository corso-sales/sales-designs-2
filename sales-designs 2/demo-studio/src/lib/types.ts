// CheckoutJson schema - matches the sales-designs HTML files exactly
export interface CheckoutJson {
  storeName: string;
  brandColor: string;        // Hex without # (e.g., "000000")
  brandLogo: string;         // URL to logo
  productName: string;
  productDesc: string;       // e.g., "Size: 10 | Color: Black"
  productPrice: string;      // e.g., "$129.00"
  productImage: string;      // URL to product image
  exchangeProductName: string;
  exchangeProductImage: string;
  exchangeProductOptions: string[];  // e.g., ["S", "M", "L", "XL"]
  exchangeProductOptionLabel: string; // e.g., "Size"
  exchangeProductPrice: string;
  plusPrice: string;         // e.g., "$2.98"
  checkbox: boolean;
  checkboxLabel: string;     // e.g., "Green Shipping Protection"
  checkboxDesc: string;
  widgetImageUrl: string;
  showProducts: number[];    // 0=shipping, 1=returns, 2=warranties
  showNextButton: boolean;
  rates: unknown[];
}

export interface DemoConfig {
  storeName: string;
  brandColor: string;
  brandLogo: string;
  productName: string;
  productDesc: string;
  productPrice: string;
  productImage: string;
  exchangeProductName: string;
  exchangeProductImage: string;
  exchangeProductOptionLabel: string;
  showShipping: boolean;
  showReturns: boolean;
  showWarranties: boolean;
  showNextButton: boolean;
}

export interface SavedDemo {
  id: string;
  slug: string;
  config: DemoConfig;
  createdAt: Date;
  status: 'Live' | 'Draft';
}

export const DEFAULT_CONFIG: DemoConfig = {
  storeName: 'Demo Store',
  brandColor: '000000',
  brandLogo: 'https://cdn.corso.com/img/corso-logo.png',
  productName: 'Classic Sneakers',
  productDesc: 'Size: 10 | Color: Black',
  productPrice: '$129.00',
  productImage: 'https://cdn.corso.com/img/Default%20box.png',
  exchangeProductName: 'Classic Sneakers - White',
  exchangeProductImage: 'https://cdn.corso.com/img/Default%20box.png',
  exchangeProductOptionLabel: 'Size',
  showShipping: true,
  showReturns: true,
  showWarranties: true,
  showNextButton: true,
};

export const BRAND_PRESETS: Record<string, Partial<DemoConfig>> = {
  nike: {
    storeName: 'Nike',
    brandColor: '000000',
    brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png',
    productName: 'Air Max 90',
    productPrice: '$130.00',
  },
  allbirds: {
    storeName: 'Allbirds',
    brandColor: '2d5a27',
    brandLogo: 'https://cdn.allbirds.com/image/upload/v1/cms/allbirds-logo',
    productName: 'Wool Runners',
    productPrice: '$98.00',
  },
  glossier: {
    storeName: 'Glossier',
    brandColor: 'f5c6cb',
    brandLogo: 'https://glossier.com/favicon.ico',
    productName: 'Boy Brow',
    productPrice: '$17.00',
  },
  caraway: {
    storeName: 'Caraway',
    brandColor: '2F4538',
    brandLogo: 'https://www.carawayhome.com/cdn/shop/files/caraway-logo.svg',
    productName: 'Cookware Set',
    productPrice: '$395.00',
  },
  gfuel: {
    storeName: 'G FUEL',
    brandColor: '00FF00',
    brandLogo: 'https://www.gfuel.com/cdn/shop/files/GFUEL_logo_wordmark_-_Green_130x@2x.png',
    productName: 'Energy Formula',
    productPrice: '$35.99',
  },
};
