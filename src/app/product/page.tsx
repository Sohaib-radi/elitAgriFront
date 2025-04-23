import type { Metadata } from 'next';

import { getProducts } from 'src/actions/product-ssr';
import { CONFIG } from 'src/global-config';

import { ProductShopView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product shop - ${CONFIG.appName}` };

export default async function Page() {
  const { products } = await getProducts();

  return <ProductShopView products={products} />;
}
