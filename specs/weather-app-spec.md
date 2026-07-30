# Especificação: Weather App

## Estado da spec

- **Versão:** 1.0
- **Baseline:** busca de cidade e clima atual
- **Última decisão:** previsões futuras permanecem fora do escopo desta versão

## Escopo

Aplicação web estática para buscar cidades e consultar o clima atual usando a
Open-Meteo, sem autenticação.

## Fora de escopo

- Previsão diária ou horária.
- Geolocalização automática.
- Histórico persistido e cidades favoritas.
- Notificações e múltiplos idiomas.

## Funcionalidades e Critérios de Aceite

### F1: Busca de cidade

- **CA1.1:** DADO que o campo está vazio, ENTÃO o botão "Buscar" permanece desabilitado.
- **CA1.2:** DADO um nome válido, QUANDO buscar, ENTÃO até cinco localizações são apresentadas para seleção.
- **CA1.3:** DADO que nenhuma localização foi encontrada, ENTÃO a mensagem "Nenhuma cidade encontrada." é apresentada.
- **CA1.4:** DADO uma falha de geocodificação, ENTÃO uma mensagem de erro é apresentada.

### F2: Clima atual

- **CA2.1:** DADO uma localização selecionada, ENTÃO a temperatura atual em Celsius é apresentada.
- **CA2.2:** DADO uma localização selecionada, ENTÃO a sensação térmica é apresentada.
- **CA2.3:** DADO uma localização selecionada, ENTÃO a condição climática possui descrição e representação visual.
- **CA2.4:** DADO uma localização selecionada, ENTÃO vento em km/h e umidade em percentual são apresentados.
- **CA2.5:** DADO uma consulta em andamento, ENTÃO um estado de carregamento é apresentado.
- **CA2.6:** DADO uma falha na consulta do clima, ENTÃO uma mensagem de erro é apresentada.

### F3: Conversão de temperatura

- **CA3.1:** A conversão segue $F = (C \times 9/5) + 32$.
- **CA3.2:** 0°C corresponde a 32°F.
- **CA3.3:** 100°C corresponde a 212°F.
- **CA3.4:** -40°C corresponde a -40°F.

### F4: Condições WMO

- **CA4.1:** O código WMO 0 representa "Céu limpo".
- **CA4.2:** O código WMO 95 representa "Tempestade".
- **CA4.3:** Um código desconhecido representa "Condição desconhecida".

## Contrato observável

- Campo de busca: `searchbox` com nome acessível "Nome da cidade".
- Ação de busca: botão "Buscar", desabilitado quando o campo está vazio.
- Resultado: botão com nome acessível "Selecionar {cidade}, {país}".
- Clima atual: região com nome acessível "Clima atual para {cidade}".
- Erros: elementos com `role="alert"`.

## Histórico

| Versão | Mudança | Critérios |
|---|---|---|
| 1.0 | Baseline de busca e clima atual | CA1.1–CA4.3 |