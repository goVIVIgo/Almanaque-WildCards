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
// get atributos
export async function getTodosOsAtributos() {
  try {
    const response = await fetch(`${API_URL}/atributos`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar atributos:', error);
    throw error;
  }
}

// post atributos
export async function criarAtributo(atributoData) {
  try {
    const response = await fetch(`${API_URL}/atributos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atributoData),
    });
    return await handleResponse(response); // Retorna { message, atributoID }
  } catch (error) {
    console.error('Falha ao criar atributo:', error);
    throw error;
  }
}
export async function getTodasAsAcoes() {
  try {
    const response = await fetch(`${API_URL}/acoes`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar acoes:', error);
    throw error;
  }
}

// post acoes
export async function criarAcao(acaoData) {
  try {
    const response = await fetch(`${API_URL}/acoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acaoData),
    });
    return await handleResponse(response); // Retorna { message, acaoID }
  } catch (error) {
    console.error('Falha ao criar acao:', error);
    throw error;
  }
}

// get efeitos
export async function getTodosOsEfeitos() {
  try {
    const response = await fetch(`${API_URL}/efeitos`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Falha ao buscar efeitos:', error);
    throw error;
  }
}

// post efeitos
export async function criarEfeito(efeitoData) {
  try {
    const response = await fetch(`${API_URL}/efeitos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(efeitoData),
    });
    return await handleResponse(response); // Retorna { message, efeitoID }
  } catch (error) {
    console.error('Falha ao criar efeito:', error);
    throw error;
  }

}