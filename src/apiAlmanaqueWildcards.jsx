const API_URL = 'http://localhost:3002';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Erro HTTP: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

//get cartas
export async function getTodasAsCartas() {
  try {
    const response = await fetch(`${API_URL}/cartas`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar cartas:', error);
    throw error;
  }
}

//get animais
export async function getTodosOsAnimais() {
  try {
    const response = await fetch(`${API_URL}/animais`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar animais:', error);
    throw error;
  }
}

//get cartas
export async function getCartaPorId(id) {
  try {
    const response = await fetch(`${API_URL}/cartas/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Falha ao buscar carta ${id}:`, error);
    throw error;
  }
}

//post imagens
export async function uploadImagem(imagemFile) {
  try {
    const formData = new FormData();
    formData.append('imagem', imagemFile);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    return await handleResponse(response); // Retorna { message, url }
  } catch (error) {
    console.error('Falha ao fazer upload da imagem:', error);
    throw error;
  }
}

//post imagens
export async function criarImagem(urlImagem) {
  try {
    const response = await fetch(`${API_URL}/imagens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urlImagem }),
    });
    return await handleResponse(response); // Retorna { message, imagemID }
  } catch (error) {
    console.error('Falha ao criar imagem:', error);
    throw error;
  }
}

//post animais
export async function criarAnimal(animalData) {
  try {
    const response = await fetch(`${API_URL}/animais`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData),
    });
    return await handleResponse(response); // Retorna { message, animalID }
  } catch (error) {
    console.error('Falha ao criar animal:', error);
    throw error;
  }
}
//post cartas
export async function criarCarta(cartaData) {
  try {
    const response = await fetch(`${API_URL}/cartas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartaData),
    });
    return await handleResponse(response); // Retorna { message, cartaID }
  } catch (error) {
    console.error('Falha ao criar carta:', error);
    throw error;
  }
}

//put cartas
export async function atualizarCarta(id, cartaData) {
  try {
    const response = await fetch(`${API_URL}/cartas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartaData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Falha ao atualizar carta ${id}:`, error);
    throw error;
  }
}

// delete cartas
export async function deletarCarta(id) {
  try {
    const response = await fetch(`${API_URL}/cartas/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Falha ao deletar carta ${id}:`, error);
    throw error;
  }
}