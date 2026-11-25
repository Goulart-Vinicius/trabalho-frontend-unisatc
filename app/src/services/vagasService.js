const API_URL = "/api/vagas.json";

export async function buscarVagas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as vagas.");
  }

  return response.json();
}

export async function buscarVaga(id) {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as vagas.");
  }

  const vagas = await response.json();
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    throw new Error("Vaga não encontrada.");
  }

  return vaga;
}
