function formatarNumero(input) {
    // Remove caracteres diferentes de número ou ponto
    let value = input.value.replace(/[^0-9.]/g, '');

    // Limita a entrada a um ponto decimal apenas
    let parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limita a entrada a oito casas decimais
    if (parts.length === 2 && parts[1].length > 8) {
        value = parts[0] + '.' + parts[1].slice(0, 8);
    }

    // Atualiza o valor do input
    input.value = value;
}

function calcularGeracaoIndividualPlaca(potenciaPlaca, irradiacaoSolar) {
    const eficiencia = document.getElementById('eficienciaSistema').value; // Eficiência do sistema
    return eficiencia * (365 / 12) * (potenciaPlaca / 1000) * irradiacaoSolar;
}

function calcularQuantidadePlacas(consumo, instalacao, potenciaPlaca, irradiacaoSolar) {
    const geracaoPlaca = calcularGeracaoIndividualPlaca(potenciaPlaca, irradiacaoSolar);
    let consumoMinimo;

    // Consumo mínimo referente ao tipo da instalação
    if (instalacao === 'monofasica') {
        consumoMinimo = 30.0;
    } else if (instalacao === 'bifasica') {
        consumoMinimo = 50.0;
    } else if (instalacao === 'trifasica') {
        consumoMinimo = 100.0;
    } else {
        return { error: 'Instalação Inválida' };
    }

    // Para calcular o consumo compensável
    const consumoCompensavel = consumo - consumoMinimo;

    // Para calcular número de placas
    const numeroPlacas = Math.ceil(consumoCompensavel / geracaoPlaca);

    const custoEnergia = document.getElementById('custoEnergia').value;

    const economia = consumoCompensavel * custoEnergia;

    const geracaoMensal = numeroPlacas * geracaoPlaca;

    return { numeroPlacas, economia, geracaoMensal };
}

function calcular() {
    const consumoMedio = parseFloat(document.getElementById('consumo').value);
    const tipoInstalacao = document.getElementById('instalacao').value;
    const potenciaPlaca = parseFloat(document.getElementById('potenciaPlaca').value);
    const irradiacaoSolar = parseFloat(document.getElementById('irradiacaoSolar').value);

    const resultado = calcularQuantidadePlacas(consumoMedio, tipoInstalacao, potenciaPlaca, irradiacaoSolar);

    if (resultado.error) {
        document.getElementById('resultado').innerText = resultado.error;
    } else {
        document.getElementById('resultado').innerText = `Quantidade de placas: ${resultado.numeroPlacas}\nGeração mensal: ${resultado.geracaoMensal.toFixed(2)} kWh/mês\n Economia prevista: R$ ${resultado.economia.toFixed(2)}`;
    }
}
