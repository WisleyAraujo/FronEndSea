import { useMutation } from 'react-query';
import axios from 'axios';

const useCadastrarCliente = () => {
  const cadastrarClienteMutation = useMutation(async (formData) => {
    const response = await axios.post('http://localhost:8080/clientes/cadastrar', formData);
    return response.data;
  });

  const cadastrarCliente = async (formData) => {
    try {
      const data = await cadastrarClienteMutation.mutateAsync(formData);
      return data;
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      throw error;
    }
  };

  return { cadastrarCliente, isLoading: cadastrarClienteMutation.isLoading };
};

export default useCadastrarCliente;
