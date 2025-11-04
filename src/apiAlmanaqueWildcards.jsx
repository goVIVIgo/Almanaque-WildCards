const API_URL = 'http://localhost:3002';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); 
    const errorMessage = errorData.message || `Erro HTTP: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function getTodasAsCartas() {
  try {
    const response = await fetch(`${API_URL}/cartas`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar cartas:', error);
    throw error;
  }
}


