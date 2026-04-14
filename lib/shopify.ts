const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: ShopifyPrice;
        availableForSale: boolean;
      };
    }>;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

// ── Queries ────────────────────────────────────────────────────────────────

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>({
    query: `
      query GetProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id handle title description
              featuredImage { url altText width height }
              priceRange { minVariantPrice { amount currencyCode } }
              variants(first: 5) {
                edges {
                  node { id title availableForSale price { amount currencyCode } }
                }
              }
            }
          }
        }
      }
    `,
    variables: { first },
  });
  return data.products.edges.map((e) => e.node);
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: `
      query GetProduct($handle: String!) {
        product(handle: $handle) {
          id handle title description
          featuredImage { url altText width height }
          priceRange { minVariantPrice { amount currencyCode } }
          variants(first: 10) {
            edges {
              node { id title availableForSale price { amount currencyCode } }
            }
          }
        }
      }
    `,
    variables: { handle },
  });
  return data.product;
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>({
    query: `
      query GetCollections {
        collections(first: 10) {
          edges {
            node {
              id handle title description
              image { url altText width height }
            }
          }
        }
      }
    `,
  });
  return data.collections.edges.map((e) => e.node);
}

export async function createCheckout(
  lineItems: Array<{ variantId: string; quantity: number }>
): Promise<string> {
  const data = await shopifyFetch<{
    checkoutCreate: { checkout: { webUrl: string } };
  }>({
    query: `
      mutation CheckoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout { webUrl }
        }
      }
    `,
    variables: {
      input: {
        lineItems: lineItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      },
    },
  });
  return data.checkoutCreate.checkout.webUrl;
}
