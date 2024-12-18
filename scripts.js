function calcularQuantidadePlacas(consumo, instalacao) {
  const geracaoPlaca = 72; // em condições normais, gera 72kWh/mês
  let consumoMinimo;

  // Consumo mínimo referente ao tipo da instalação
  if (instalacao == 'monofasica') {
      consumoMinimo = 30;
  } else if (instalacao == 'bifasica') {
      consumoMinimo = 50;
  } else if (instalacao == 'trifasica') {
      consumoMinimo = 100;
  } else {
      return { error: 'Instalação Inválida' };
  }

  // Para calcular o consumo compensável
  const consumoCompensavel = consumo - consumoMinimo;

  // Para calcular número de placas
    const numeroPlacas = Math.ceil(consumoCompensavel / geracaoPlaca);
    
    const economia = consumoCompensavel * 0.89;

  return { numeroPlacas, economia };
}

function calcular () {
    const consumoMedio = document.getElementById('consumo').value;
    const tipoInstalacao = document.getElementById('instalacao').value;

    const resultado = calcularQuantidadePlacas(consumoMedio, tipoInstalacao);

    if (resultado.error) {
        document.getElementById('resultado').innerText = resultado.error;
    } else {
                
            document.getElementById('resultado').innerText = `Quantidade de placas necessárias: ${resultado.numeroPlacas}\nEconomia prevista: R$ ${resultado.economia}`;
                    
    }
    
}
