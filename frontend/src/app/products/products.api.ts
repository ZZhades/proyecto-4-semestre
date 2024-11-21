// Verificación de la variable de entorno
if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL no está definida en las variables de entorno');
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Definición de tipos
interface Product {
  image: any;
  id: string;
  name: string;
  description: string;
  price: number;
}

// Función helper para manejar las peticiones fetch
async function fetchWithConfig<T>(url: string, config: RequestInit = {}): Promise<T> {
  if (!BACKEND_URL) {
    throw new Error('URL del backend no configurada');
  }

  try {
    const fullUrl = `${BACKEND_URL}${url}`;
    const response = await fetch(fullUrl, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    

    return await response.json();
  } catch (error) {
    console.error(`Error en la petición a ${url}:`, error);
    throw error;
  }
}

// Funciones de la API
export async function getProducts(): Promise<Product[]> {
  return fetchWithConfig<Product[]>('/api/products', {
    cache: "no-store",
  });
}

export async function getProduct(id: string): Promise<Product> {
  return fetchWithConfig<Product>(`/api/products/${id}`, {
    cache: "no-store",
  });
}

export async function createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
  return fetchWithConfig<Product>('/api/products', {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

export async function updateProduct(
  id: string, 
  newProduct: Partial<Product>
): Promise<Product> {
  return fetchWithConfig<Product>(`/api/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newProduct),
    cache: 'no-store'
  });
}

export async function deleteProduct(id: string): Promise<void> {
  return fetchWithConfig<void>(`/api/products/${id}`, {
    method: "DELETE",
  });
}

// Función de utilidad para manejar errores de la API
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ha ocurrido un error desconocido';
}
