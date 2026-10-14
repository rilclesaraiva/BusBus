// BusBus Experimental Modular (B.E.M.) — dados oficiais de itinerário por linha
// Copyright (C) 2026 rilclesaraiva — licenciado sob GNU GPLv3.
// Texto completo: https://github.com/rilclesaraiva/BusBus/blob/main/LICENSE
//
// Ruas oficiais de cada linha (ida/volta + terminais), extraídas de duas fontes
// oficiais da Prefeitura de Belém / SEGBEL:
//  - o PDF "Itinerários de ônibus" compartilhado originalmente (maioria das linhas
//    históricas/convencionais), e
//  - seguranca.belem.pa.gov.br/linhas/<numero> (linhas do sistema integrado via BRT —
//    Terminal Mangueirão, Maracacuera, São Brás etc.).
// É um retrato estático dessas fontes no momento em que foram consultadas: a Prefeitura
// pode alterar trajetos sem aviso aqui. Quando a linha pesquisada não está neste objeto,
// o app cai de volta pro modo antigo (geocodificação reversa ao vivo, em
// trip-planner.js).
export const ROUTE_STREETS = 
{
 "113": {
  "nome": "CREMAÇÃO I - ESTRADA NOVA",
  "terminal": "Terminal da UFPA (Setor B)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Rua do Arsenal",
     "Rua de Óbidos",
     "Rua Ângelo Custódio",
     "Avenida Almirante Tamandaré (pista esquerda)",
     "Avenida Padre Eutíquio",
     "Rua do João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Rua Diogo Móia",
     "Avenida Alcindo Cacela",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida José Bonifácio"
    ]
   }
  ]
 },
 "114": {
  "nome": "CREMAÇÃO II - ALCINDO CACELA",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua do Arsenal",
     "Avenida Bernardo Sayão",
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida Alcindo Cacela",
     "Rua São Miguel",
     "Travessa 9 de Janeiro",
     "Avenida Gentil Bittencourt",
     "Travessa 14 de Abril",
     "Avenida Governador José Malcher",
     "Travessa 14 de Março",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco"
    ]
   }
  ]
 },
 "204": {
  "nome": "OUTEIRO (BRASÍLIA) - MARACACUERA",
  "terminal": "Terminal Maracacuera BRT",
  "sentidos": [
   {
    "label": "IDA: Outeiro (Brasília) - Maracacuera",
    "ruas": [
     "Estrada da Brasília (Rua da Balsa)",
     "Av. BL Dez",
     "Travessa da Tranquilidade",
     "Av. Nossa Sra. da Conceição",
     "Av. Paulo Costa",
     "Estrada do Outeiro",
     "Estrada da Ascenção",
     "Rua da Taboquinha",
     "Estrada da Maracacuera",
     "Terminal Maracacuera BRT"
    ]
   },
   {
    "label": "VOLTA: Maracacuera - Outeiro (Brasília)",
    "ruas": [
     "Integração física no Terminal Maracacuera BRT",
     "Estrada da Maracacuera",
     "Rua da Taboquinha",
     "Estrada da Ascenção",
     "Estrada do Outeiro",
     "Av. Paulo Costa",
     "Av. Nossa Sra. da Conceição",
     "Travessa da Tranquilidade",
     "Av. BL Dez",
     "Estrada da Brasília (Rua da Balsa)"
    ]
   }
  ]
 },
 "209": {
  "nome": "MANGUEIRÃO - MARAMBAIA",
  "terminal": "Terminal Mangueirão / Estação Marambaia (Temporal) / Estação Tavares Bastos (Temporal) / Estação Marinha (Temporal) / Estação Centenário (Temporal)",
  "sentidos": [
   {
    "label": "IDA: Mangueirão - Marambaia",
    "ruas": [
     "Terminal BRT Mangueirão (Integração Física)",
     "Avenida Augusto Montenegro",
     "Rua WE 02",
     "Rua Maravalho Belo",
     "Rua da Marinha",
     "Conversão à esquerda após Passagem Jericó",
     "Rua G",
     "Rua A",
     "Rua D",
     "Viela Coronel Arthur",
     "Rua da Marinha",
     "Avenida Santarém",
     "Rua Coletaí",
     "Rua Paragominas",
     "Rua da Mata",
     "Avenida Rodolfo Chermont",
     "Avenida Tavares Bastos"
    ]
   },
   {
    "label": "VOLTA: Marambaia - Mangueirão",
    "ruas": [
     "Estação BRT Tavares Bastos (Integração Temporal)",
     "Avenida Almirante Barroso",
     "BR-316",
     "Retorno BR-316 (Rua Joaquim Lopes Bastos)",
     "Shopping Castanheira (Condomínio Next Office)",
     "BR-316",
     "Avenida Augusto Montenegro",
     "Estação BRT Marambaia (Integração Temporal)",
     "Avenida Augusto Montenegro",
     "Estação BRT Marinha (Integração Temporal)",
     "Avenida Augusto Montenegro",
     "Estação BRT Centenário (Integração Temporal)",
     "Avenida Augusto Montenegro",
     "Terminal BRT Mangueirão"
    ]
   }
  ]
 },
 "225": {
  "nome": "OUTEIRO (ITAITEUA) - MARACACUERA",
  "terminal": "Terminal Maracacuera (Temporal)",
  "sentidos": [
   {
    "label": "IDA: Outeiro (Itaiteua) - Maracacuera",
    "ruas": [
     "Estrada Itaiteua",
     "Travessa Doutor Evandro Bonna",
     "Av. Franklin de Menezes",
     "Av. Nossa Senhora da Conceição",
     "Av. Paulo Costa",
     "Estrada do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua Oito de Setembro",
     "Av. Augusto Montenegro",
     "Integração temporal no Terminal Maracacuera (acesso pelo abrigo lateral - Av. Augusto Montenegro)"
    ]
   },
   {
    "label": "VOLTA: Maracacuera - Outeiro (Itaiteua)",
    "ruas": [
     "Integração temporal no Terminal Maracacuera (acesso pelo abrigo lateral - Av. Augusto Montenegro)",
     "Av. Augusto Montenegro",
     "Rua Dois de Dezembro",
     "Av. Doutor Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada do Outeiro",
     "Av. Paulo Costa",
     "Av. Nossa Senhora da Conceição",
     "Rua Manoel Barata",
     "Travessa Doutor Evandro Bonna",
     "Estrada Itaiteua"
    ]
   }
  ]
 },
 "226": {
  "nome": "MARACACUERA - AV. PRESIDENTE VARGAS",
  "terminal": "Terminal Maracacuera / Terminal Mangueirão / Terminal São Brás",
  "sentidos": [
   {
    "label": "IDA: Maracacuera - Av. Presidente Vargas",
    "ruas": [
     "Integração Física no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Av. Almirante Barroso",
     "Integração Física no Terminal São Brás",
     "Av. Gov. José Malcher",
     "Av. Visconde de Souza Franco",
     "Av. Marechal Hermes",
     "Travessa Piedade",
     "Rua Municipalidade",
     "Av. Presidente Vargas"
    ]
   },
   {
    "label": "VOLTA: Av. Presidente Vargas - Maracacuera",
    "ruas": [
     "Av. Presidente Vargas",
     "Av. Nazaré",
     "Av. Magalhães Barata",
     "Av. Almirante Barroso",
     "Integração Física no Terminal São Brás",
     "Av. Almirante Barroso",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Maracacuera"
    ]
   }
  ]
 },
 "227": {
  "nome": "SACRAMENTA - HUMAITÁ",
  "terminal": "Rua Antônio Everdosa com Travessa Alferes Costa / Rua Antônio Everdosa com Travessa Alferes Costa",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Pedro Miranda",
     "Contorno próximo a Avenida Doutor Freitas",
     "Avenida Pedro Miranda",
     "Travessa Alferes Costa",
     "Avenida Senador Lemos",
     "acesso a via lindeira da baia da mini-estação de passageiros na Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César (pista nível)",
     "Avenida Pedro Álvares Cabral",
     "Travessa Barão do Triunfo",
     "Avenida Senador Lemos",
     "Travessa Lomas Valentinas",
     "Rua Nova",
     "Travessa Mariz e Barros",
     "Avenida Pedro Miranda (Contorno da Praça Eneida de Moraes)",
     "Avenida Pedro Miranda",
     "Travessa Humaitá",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré (pista direita)",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Travessa Vileta",
     "Avenida João Paulo II",
     "Travessa Humaitá",
     "Avenida Pedro Miranda",
     "Travessa Angustura",
     "Avenida Marquês de Herval",
     "Travessa Mauriti",
     "Avenida Senador Lemos",
     "Travessa Alferes Costa",
     "Avenida Pedro Miranda"
    ]
   }
  ]
 },
 "228": {
  "nome": "SACRAMENTA - SÃO BRÁS",
  "terminal": null,
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Albatroz",
     "Rua Paru",
     "Rua Canário do Reino",
     "Rua Rio Juntaí",
     "Avenida dos Tucanos",
     "Avenida Rio Amazonas",
     "Travessa Pardal",
     "Rua Rio Tapajós",
     "Avenida dos Tucanos",
     "Passagem Cabedelo",
     "Travessa Alferes Costa",
     "Avenida Visconde de Inhaúma",
     "Travessa Perebebuí",
     "Rua Nova",
     "Travessa do Chaco",
     "Avenida Pedro Miranda (contorno da Praça Eneida de Moraes)",
     "Avenida Pedro Miranda",
     "Travessa Humaitá",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Travessa Vileta",
     "Avenida João Paulo II",
     "Travessa Humaitá",
     "Avenida Pedro Miranda",
     "Travessa do Chaco",
     "Rua Nova",
     "Travessa Perebebuí",
     "Avenida Visconde de Inhaúma",
     "Travessa Alferes Costa",
     "Passagem Cabedelo",
     "Avenida dos Tucanos",
     "Rua Rio Tapajós",
     "Travessa Pardal",
     "Avenida Rio Amazonas",
     "Avenida dos Tucanos",
     "Rua Rio jutaí.",
     "Rua Canário do Reino",
     "Rua Rio Paru",
     "Rua Albatroz"
    ]
   }
  ]
 },
 "229": {
  "nome": "PEDREIRA – CONDOR",
  "terminal": "Travessa Alferes Costa entre Rua do Arame e Avenida Marquês de Herval",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa Alferes Costa",
     "Avenida Marquês de Herval",
     "Travessa Curuzu",
     "Avenida Duque de Caxias",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Travessa São Pedro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa dos Apinagés",
     "Avenida Alcindo Cacela",
     "Rua São Miguel",
     "Travessa 9 de Janeiro",
     "Rua Engenheiro Fernando Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa 9 de Janeiro",
     "Avenida Marquês de Herval",
     "Avenida Doutor Freitas",
     "Avenida Visconde de Inhaúma",
     "Travessa Alferes Costa"
    ]
   }
  ]
 },
 "230": {
  "nome": "PEDREIRA - FELIPE PATRONI",
  "terminal": "Rua Alferes Costa, entre Marquês e Visconde de Inhaúma (em frente ao Hospital das Clinicas).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa Alferes Costa",
     "Avenida Marquês de Herval",
     "retorno na Travessa Curuzú",
     "Avenida Marquês de Herval",
     "Travessa Humaitá",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa 14 de Abril",
     "Rua Domingos Marreiros",
     "Travessa Castelo Branco",
     "Rua dos Pariquis",
     "Avenida Alcindo Cacela",
     "Travessa Padre Eutíquio"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré (pista esquerda)",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa 9 de Janeiro",
     "Avenida Marquês de Herval",
     "Avenida Doutor Freitas",
     "Avenida Visconde de Inhaúma",
     "Travessa Alferes Costa"
    ]
   }
  ]
 },
 "237": {
  "nome": "SACRAMENTA - PRESIDENTE VARGAS",
  "terminal": "Avenida Pedro Miranda entre Travessa Alferes Costa e Avenida Doutor Freitas (canteiro central). ITINERÁRIO A: / Avenida Pedro Miranda entre Travessa Alferes Costa e Avenida Doutor Freitas (canteiro central).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Pedro Miranda",
     "Travessa Alferes Costa",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Duque de Caxias",
     "Travessa Humaitá",
     "Avenida Pedro Miranda",
     "Rua Bernal do Couto",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "contorno na Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Humaitá",
     "Avenida Rômulo Maiorana (antiga Avenida 25 de Setembro)",
     "Avenida Doutor Freitas",
     "Avenida Pedro Miranda"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Pedro Miranda",
     "Avenida Doutor Freitas",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Travessa Alferes Costa",
     "Avenida Pedro Miranda",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "contorno na Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Diogo Moia",
     "Travessa Dom Romualdo de Seixas",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Alferes Costa",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Pedro Miranda",
     "contorno próximo a Travessa Alferes Costa",
     "Avenida Pedro Miranda. ALDEIA AMAZÔNICA) ITINERÁRIO “B”:"
    ]
   }
  ]
 },
 "305": {
  "nome": "UFPA - ICOARACI (via Terminal Mangueirão)",
  "terminal": "Terminal Mangueirão / Terminal UFPA",
  "sentidos": [
   {
    "label": "IDA: UFPA - Icoaraci",
    "ruas": [
     "Terminal UFPA",
     "Av. Perimetral",
     "Travessa Angustura",
     "Av. Rômulo Maiorana",
     "Av. Dr. Freitas",
     "Av. Senador Lemos",
     "Elevado Daniel Berg",
     "Entroncamento",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Rua 2 de Dezembro",
     "Travessa Berredos",
     "Rua Manoel Barata"
    ]
   },
   {
    "label": "VOLTA: Icoaraci - UFPA",
    "ruas": [
     "Rua Manoel Barata",
     "Av. Doutor Lopo de Castro",
     "Rua 8 de Setembro",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Elevado Daniel Berg",
     "Av. Dr. Freitas",
     "Av. Rômulo Maiorana",
     "Travessa Lomas Valentina",
     "Av. João Paulo II",
     "Av. Perimetral",
     "Terminal UFPA"
    ]
   }
  ]
 },
 "306": {
  "nome": "UFPA - PEDREIRA",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Terminal da UFPA",
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida Roberto Camelier",
     "Rua São Miguel",
     "Rua dos Tupinambás",
     "Rua dos Mundurucus",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Rua Curuçá",
     "Travessa José Pio"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Avenida Senador Lemos",
     "Travessa Mauriti",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal UFPA"
    ]
   }
  ]
 },
 "307": {
  "nome": "UFPA - PADRE EUTÍQUIO",
  "terminal": "Terminal da UFPA (Plataforma II).",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Terminal UFPA",
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida Alcindo Cacela",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "contorno da Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Rua Domingos Marreiros",
     "Avenida Alcindo Cacela",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal UFPA"
    ]
   }
  ]
 },
 "308": {
  "nome": "UFPA - ALCINDO CACELA",
  "terminal": "Terminal da UFPA (Plataforma II).",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida Alcindo Cacela",
     "Rua São Miguel",
     "Travessa 9 de Janeiro",
     "Avenida Gentil Bittencourt",
     "Travessa 14 de Abril",
     "Avenida Govervandor José Malcher",
     "Travessa 9 de Janeiro",
     "Rua João Balbi",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Apinagés",
     "Avenida Alcindo Cacela",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "309": {
  "nome": "UFPA - VER-O-PESO",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Terminal UFPA",
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Travessa Praça do Relógio",
     "Travessa Marquês de Pombal"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal UFPA"
    ]
   }
  ]
 },
 "310": {
  "nome": "UFPA - PRESIDENTE VARGAS",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Terminal da UFPA",
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Nina Ribeiro",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal da UFPA"
    ]
   }
  ]
 },
 "311": {
  "nome": "GUAMÁ - CONSELHEIRO",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Rua Barão de Igarapé Miri",
     "Avenida José Bonifácio",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Avenida José Bonifácio",
     "Rua Barão de Igarapé Miri",
     "Rua Augusto Corrêa",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "312": {
  "nome": "GUAMÁ - MONTEPIO",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Rua Barão de Igarapé Miri",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Travessa Castelo Branco",
     "Rua dos Mundurucus",
     "Travessa Teófilo Condurú",
     "Avenida Conselheiro Furtado",
     "Rua Barão de Mamoré",
     "Rua Paes de Souza",
     "Avenida José Bonifácio",
     "Rua Barão de Igarapé Miri",
     "Rua Augusto Corrêa",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "314": {
  "nome": "GUAMÁ - VER-O-PESO",
  "terminal": "Avenida Tucunduba com Passagem Ceará.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Tucunduba",
     "Rua Barão de Igarapé Miri",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Travessa Castelo Branco",
     "Rua Silva Castro",
     "Avenida José Bonifácio",
     "Rua Barão de Igarapé Miri",
     "Avenida Tucunduba"
    ]
   }
  ]
 },
 "315": {
  "nome": "UFPA - CENTRO HISTÓRICO",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "UFPA - CENTRO",
    "ruas": [
     "Terminal da UFPA",
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida Roberto Camelier",
     "Rua São Miguel",
     "Travessa Tupinambás",
     "Rua dos Mundurucus",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Rua Coronel Fontoura",
     "Travessa Félix Roque",
     "Rua Tomázia Perdigão",
     "Rua Padre Champagnat"
    ]
   },
   {
    "label": "CENTRO - UFPA",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Travessa São Francisco",
     "Rua Arcipreste Manoel Teodoro",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal da UFPA"
    ]
   }
  ]
 },
 "316": {
  "nome": "GUAMÁ - PRESIDENTE VARGAS",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Rua Barão de Igarapé Miri",
     "Avenida José Bonifácio",
     "Rua Paes de Souza",
     "Rua Barão de Mamoré",
     "Rua dos Mundurucus",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Guerra Passos",
     "Avenida Conselheiro Furtado",
     "Rua Barão de Mamoré",
     "Rua Paes de Souza",
     "Avenida José Bonifácio",
     "Rua Barão de Igarapé Miri",
     "Rua Augusto Corrêa"
    ]
   }
  ]
 },
 "317": {
  "nome": "GUAMÁ - PÁTIO BELÉM",
  "terminal": "Terminal da UFPA",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Passagem Nova",
     "Passagem Napoleão Laureano",
     "Travessa Guerra Passos",
     "Rua dos Mundurucus",
     "Travessa Teófilo Conduru",
     "Avenidade Conselheiro Furtado",
     "Travessa Castelo Branco",
     "Rua dos Pariquis",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Rua Coronel Fontoura",
     "Travessa Félix Roque",
     "Rua Tomázia Perdigão",
     "Rua Padre"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Senador Manoel Barata",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco (pista central)",
     "Rua Boaventura da Silva",
     "Avenida Generalíssimo Deodoro",
     "Avenida Gentil Bittencourt",
     "Travessa Guerra Passos",
     "Passagem Napoleão Laureano",
     "Passagem Nova",
     "Rua Augusto Corrêa",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "318": {
  "nome": "ARSENAL",
  "terminal": "Rua Jabatiteua esquina com Passagem São Francisco.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Jabatiteua",
     "Travessa Francisco Monteiro",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua do Arsenal",
     "Avenida Bernardo Sayão",
     "Rua Engenheiro Fernando Guilhon",
     "Avenida Roberto Camelier",
     "Rua Nova I"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Honório José dos Santos",
     "Rua Engenheiro Fernando Guilhon",
     "Avenida Bernardo Sayão",
     "Rua do Arsenal",
     "Rua de Óbidos",
     "Rua Ângelo Custódio",
     "Avenida Almirante Tamandaré (pista esquerda)",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Francisco Monteiro",
     "Rua Jabatiteua"
    ]
   }
  ]
 },
 "320": {
  "nome": "UFPA - TAMOIOS",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Travessa Enèas Pinheiro",
     "Avenida João Paulo II",
     "Travessa Antônio Baena",
     "Avenida Rômulo Maiorana (Antiga Avenida 25 de Setembro)",
     "Travessa das Mercês",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus. Avenida Bernardo Sayão"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua dos Tamoios",
     "Avenida Padre Eutíquio",
     "Rua João Diogo",
     "Travessa Sâo Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Travessa Enéas Pinheiro",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "321": {
  "nome": "UFPA - CIDADE NOVA VI",
  "terminal": "Terminal da UFPA",
  "sentidos": [
   {
    "label": "UFPA - CIDADE NOVA",
    "ruas": [
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Transcoqueiro",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Travessa WE 75",
     "Avenida SN 22",
     "Travessa WE 72",
     "Avenida SN 21 (retorno na Travessa WE 90)"
    ]
   },
   {
    "label": "CIDADE NOVA - UFPA",
    "ruas": [
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 22",
     "Travessa WE 75",
     "Avenida SN 24",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia Transcoqueiro",
     "Avenida Augusto Montenegro",
     "conversão no primeiro ponto de retorno após a Rodovia Transcoqueiro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Rômulo Maiorana (antiga Avenida 25 de Setembro)",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "323": {
  "nome": "CANUDOS - PRAÇA AMAZONAS (PERIMETRAL)",
  "terminal": "Rua São Domingos com Passagem Canaã.",
  "sentidos": [
   {
    "label": "CANUDOS - JURUNAS",
    "ruas": [
     "Rua São Domingos",
     "Avenida Celso Malcher",
     "Rua Silva Rosado",
     "Travessa Francisco Monteiro",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Rua Cesário Alvim",
     "Avenida Bernardo Sayão",
     "via de acesso à Avenida Beira Rio (Portal da Amazônia)",
     "retorno antes da Rua dos Mundurucus",
     "Avenida Beira Rio (Portal da Amazônia)",
     "Avenida Bernardo Sayão",
     "Rua dos Mundurucus",
     "Avenida Beira Rio (Portal da Amazônia)",
     "Avenida Bernardo Sayão",
     "retorno na Rua Osvaldo de Caldas Brito"
    ]
   },
   {
    "label": "JURUNAS - CANUDOS",
    "ruas": [
     "Avenida Bernardo Sayão",
     "Rua Cesário Alvim",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Francisco Monteiro",
     "Rua Silva Rosado",
     "Avenida Celso Malcher",
     "Rua São Domingos"
    ]
   }
  ]
 },
 "324": {
  "nome": "CANUDOS - PRESIDENTE VARGAS",
  "terminal": "Avenida Celso Malcher entre Rua do Arame e Passagem Vera Cruz",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Celso Malcher",
     "Rua da Olaria",
     "Rua Silva Rosado",
     "Travessa 2ª de Queluz",
     "Avenida Conselheiro Furtado",
     "Travessa Teófilo Condurú",
     "Rua Doutor Américo Santa Rosa",
     "Travessa Guerra Passos",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Guerra Passos",
     "Rua Doutor Américo Santa Rosa",
     "Travessa Francisco Monteiro",
     "Rua Silva Rosado",
     "Rua da Olaria",
     "Avenida Celso Malcher"
    ]
   }
  ]
 },
 "325": {
  "nome": "CANUDOS - VER-O-PESO",
  "terminal": "Rua Roso Danin (próximo à Passagem Vilhena).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Roso Danin",
     "Travessa 2ª de Queluz",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Travessa 9 de Janeiro",
     "Rua João Balbi",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco (contorno na Rua Boaventura da Silva)",
     "Avenida Visconde de Souza Franco",
     "Rua Domingos Marreiros",
     "Travessa 03 de Maio",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa 2ª de Queluz",
     "Rua Roso Danin"
    ]
   }
  ]
 },
 "326": {
  "nome": "CANUDOS II - PRAÇA AMAZONAS (TUCUNDUBA)",
  "terminal": "Avenida Tucunduba com Passagem Ceará.",
  "sentidos": [
   {
    "label": "CANUDOS - JURUNAS",
    "ruas": [
     "Avenida Tucunduba",
     "Rua São Domingos",
     "Avenida Celso Malcher",
     "Rua Silva Rosado",
     "Travessa Francisco Monteiro",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Rua Cesário Alvim",
     "Avenida Bernardo Sayão",
     "via de acesso à Avenida Beira Rio (Portal da Amazônia)",
     "retorno antes da Rua dos Mundurucus",
     "Avenida Beira Rio (Portal da Amazônia)",
     "Avenida Bernardo Sayão",
     "retorno na Rua Osvaldo de Caldas Brito"
    ]
   },
   {
    "label": "JURUNAS - CANUDOS",
    "ruas": [
     "Rua Osvaldo de Caldas Brito",
     "Avenida Bernardo Sayão",
     "Rua Cesário Alvim",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Francisco Monteiro",
     "Rua Silva Rosado",
     "Avenida Celso Malcher",
     "Rua São Domingos",
     "Avenida Tucunduba"
    ]
   }
  ]
 },
 "328": {
  "nome": "CIPRIANO SANTOS - PRESIDENTE VARGAS",
  "terminal": "Rua Cipriano Santos com Avenida Perimetral.",
  "sentidos": [
   {
    "label": "CANUDOS - CONDOR",
    "ruas": [
     "Rua Cipriano Santos",
     "Travessa 2ª de Queluz",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas",
     "Avenida Serzedelo Corrêa",
     "Rua dos Pariquis",
     "Travessa Apinagés",
     "Rua Engenheiro Fernando Guilhon",
     "Avenida Bernardo Sayão",
     "retorno na Praça Princesa Isabel"
    ]
   },
   {
    "label": "CONDOR - CANUDOS",
    "ruas": [
     "Avenida Bernardo Sayão",
     "Rua dos Mundurucus",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos"
    ]
   }
  ]
 },
 "417": {
  "nome": "ALCINDO CACELA (VIA JOSÉ MALCHER)",
  "terminal": "Terminal da UFPA.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Travessa Mauriti",
     "Avenida João Paulo II",
     "Travessa Antônio Baena",
     "Avenida Rômulo Maiorana (antiga Avenida 25 de Setembro)",
     "Travessa das Mercês",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa 9 de Janeiro",
     "Rua Antônio Barreto",
     "Travessa 14 de Março",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Rua Diogo Móia",
     "Avenida Alcindo Cacela",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Travessa Mauriti",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "422": {
  "nome": "ALCINDO CACELA (VIA DOMINGOS MARREIROS)",
  "terminal": "Avenida Perimetral com Escolinha do NPI.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Perimetral",
     "Travessa Mauriti",
     "Avenida Senador Lemos",
     "Passagem São Benedito",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Rua Diogo Móia",
     "Avenida Alcindo Cacela",
     "Rua Domingos Marreiros",
     "Avenida José Bonifácio",
     "Avenida Duque de Caxias",
     "Travessa Mariz e Barros",
     "Avenida João Paulo II",
     "Avenida João Paulo II",
     "Travessa Mauriti",
     "Avenida Perimetral"
    ]
   }
  ]
 },
 "439": {
  "nome": "PEDREIRA - NAZARÉ",
  "terminal": "Estrada da CEASA (Residencial Jardim Itororó)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Murucutum",
     "Avenida Perimetral",
     "Avenida João Paulo II",
     "Travessa Pirajá",
     "Avenida Almirante Barroso",
     "Travessa Angustura",
     "Avenida Pedro Miranda",
     "Avenida Alcindo Cacela",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Travessa 14 de Março",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Perimetral",
     "Estrada do Murucutum"
    ]
   }
  ]
 },
 "441": {
  "nome": "CEASA - FELIPE PATRONI",
  "terminal": "Estrada da CEASA próximo a Praça da Santa Cruz.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua do Murucutum",
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida João Paulo II",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Travessa 14 de Abril",
     "Rua Domingos Marreiros",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Avenida Roberto Camelier",
     "Rua São Miguel",
     "Rua dos Tupinambás",
     "Rua Engenheiro Fernando Guilhon",
     "Avenida Bernardo Sayão",
     "Rua do Arsenal",
     "Rua de Óbidos",
     "Rua Ângelo Custódio",
     "Avenida Almirante Tamandaré (pista esquerda)",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Tamandaré (pista esquerda)",
     "Rua Gama Abreu",
     "contorno da Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Rômulo Maiorana (Antiga Avenida 25 de Setembro)",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Estrada do Murucutum"
    ]
   }
  ]
 },
 "442": {
  "nome": "CEASA - VER-O-PESO.",
  "terminal": "Estrada da CEASA próximo a Praça da Santa Cruz.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua do Murucutum",
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "contorno na Praça São Cristóvão",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua do Arsenal",
     "Avenida Bernardo Sayão",
     "Rua Engenheiro Fernando Guilhon",
     "Avenida Roberto Camelier",
     "Avenida Bernardo Sayão",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Avenida Cipriano Santos",
     "Rua Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Estrada do Murucutum"
    ]
   }
  ]
 },
 "443": {
  "nome": "PEDREIRA - LOMAS (EUCLIDES DA CUNHA)",
  "terminal": "Final da Rua Euclides da Cunha.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Euclides da Cunha",
     "Rodovia BR–316",
     "retorno em frente a Viação Itapemirim",
     "Rodovia BR–316",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Angustura",
     "Avenida Pedro Miranda",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Rua 28 de Setembro",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Rua Ignácio Guilhon",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Padre Eutíquio",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Rua Dom Pedro I",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Lomas Valentinas",
     "Avenida Almirante Barroso",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Rodovia BR–316",
     "Rua Euclides da Cunha"
    ]
   }
  ]
 },
 "445": {
  "nome": "PEDREIRA - LOMAS",
  "terminal": "Avenida João Paulo II com Passagem João de Alencar.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Euclides da Cunha",
     "Rodovia BR\u0002316",
     "retorno em frente a Itapemirim",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entrocamento",
     "Avenida Almirante Barroso",
     "Travessa Lomas Valentinas",
     "Avenida Pedro Miranda",
     "Travessa Ferreira Pena",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal. Rua Padre Champagnat"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Doutor Assis",
     "Rua do Arsenal",
     "Avenida Bernardo Sayão",
     "Rua Cesário Alvim",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Padre Eutíquio",
     "Rua Gama abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Rua Dom Pedro I",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Travessa Angustura",
     "Avenida Almirante Barroso",
     "acesso a pista do Túnel do Complexo Viário do Entrocamento",
     "Rodovia BR-316",
     "Rua Euclides da Cunha"
    ]
   }
  ]
 },
 "446": {
  "nome": "JOÃO PAULO II - VER-O-PESO",
  "terminal": "Rua Mariano entre Avenida João Paulo II e Parque Ambiental do Utinga.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Mariano",
     "Avenida João Paulo II",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré (pista direita)",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "Rua Mariano"
    ]
   }
  ]
 },
 "487": {
  "nome": "GUANABARA - FELIPE PATRONI",
  "terminal": "Rua do Fio com Avenida João Paulo II.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua do Fio",
     "Rodovia BR-316",
     "contorno no viaduto da Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua do Fio"
    ]
   }
  ]
 },
 "494": {
  "nome": "GUANABARA - CENTRO (VIA PRESIDENTE VARGAS)",
  "terminal": "Rua Parabor / Rua Parabor",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Parabor",
     "Rodovia BR-316",
     "contorno no viaduto do Coqueiro",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Boulevard Castilhos Franças",
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Parabor"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Parabor",
     "Rodovia BR-316",
     "contorno no viaduto do Coqueiro",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso (Caneleta BRT - EXPRESSO)",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Boulevard Castilhos Franças",
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso (Caneleta BRT - EXPRESSO)",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR\u0002316",
     "Rua Parabor"
    ]
   }
  ]
 },
 "546": {
  "nome": "SACRAMENTA NAZARÉ",
  "terminal": "Avenida Santarém entre Rua Cafezal e Rua Portel. ITINERÁRIO B: / Avenida Santarém entre Rua Cafezal e Rua Portel.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Mata",
     "Rua Paragominas",
     "Avenida Cafezal",
     "Avenida Santarém",
     "Rua da Mata",
     "Avenida Rodolfo Chermont",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Travessa 14 de Março",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "Rodovia BR–316",
     "retorno em frente a Viação Itapemirim",
     "Rodovia BR–316",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Tavares Bastos",
     "Rua Rodolfo Chermont",
     "Rua da Mata",
     "Avenida Santarém",
     "Avenida Cafezal",
     "Rua Paragominas",
     "Rua da Mata"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Mata",
     "Rua Paragominas",
     "Avenida Cafezal",
     "Avenida Santarém",
     "Rua da Mata",
     "Avenida Rodolfo Chermont",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Pedro Miranda",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Travessa 14 de Março",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "Rodovia BR–316",
     "retorno em frente a Viação Itapemirim",
     "Rodovia BR–316",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Tavares Bastos",
     "Rua Rodolfo Chermont",
     "Rua da Mata",
     "Avenida Santarém",
     "Avenida Cafezal",
     "Rua Paragominas",
     "Rua da Mata"
    ]
   }
  ]
 },
 "547": {
  "nome": "MÉDICE - PRESIDENTE VARGAS",
  "terminal": "Avenida Santarém entre Rua Cafezal e Rua Portel.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Mata",
     "Rua Paragominas",
     "Avenida Cafezal",
     "Avenida Santarém",
     "Rua da Mata",
     "Avenida Rodolfo Chermont",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "retorno na Avenida Visconde de Inhaúma",
     "Avenida Doutor Freitas",
     "Avenida Duque de Caxias",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Cartilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Cartilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Nina Ribeiro",
     "Avenida Ceará",
     "Avenida Governador José Malcher",
     "Avenida José Bonifácio",
     "Avenida Duque de Caxias",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "Rodovia BR–316",
     "retorno em frente a Viação Itapemirim",
     "Rodovia BR–316",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Tavares Bastos",
     "Rua Rodolfo Chermont",
     "Rua da Mata",
     "Avenida Santarém",
     "Avenida Cafezal",
     "Rua Paragominas",
     "Rua da Mata"
    ]
   }
  ]
 },
 "548": {
  "nome": "MARAMBAIA - VER-O-PESO",
  "terminal": "Pass. Dalva com 5ª Rua (Pça. Tancredo Neves)",
  "sentidos": [
   {
    "label": "Bairro - Centro",
    "ruas": [
     "terminal",
     "Passagem Dalva",
     "Rua Maravalho Belo",
     "Rua da Marinha",
     "Avenida Rodolfo Chermont",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "Centro - Bairro",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Sezerdelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Tavares bastos",
     "Avenida Rodolfo Chermont",
     "Rua da Marinha",
     "Rua SN-6",
     "Passagem Dalva",
     "terminal"
    ]
   }
  ]
 },
 "549": {
  "nome": "DJALMA DUTRA",
  "terminal": "Avenida Dalva esquina com Rua Anchieta.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Dalva",
     "Avenida Pedro Álvares Cabral",
     "Acesso a Pista em Nível do Complexo viário da Avenida Júliom César",
     "Avenida Pedro Àlvares Cabral",
     "Travessa Djalma Dutra",
     "Avenida Senador Lemos",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo. SENTIDO CENTRO - BAIRRO Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Travessa Quintino Bocaiúva",
     "Rua Boaventura da Silva",
     "Rua Dom Romualdo de Seixas",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Pombal",
     "Rua Curuçá",
     "Travessa Djalma Dutra",
     "Avenida Senador Lemos",
     "Acesso a Pista em Nível do Complexo Viário da Avenida Júlio Cesar",
     "Avenida Pedro Àlvares Cabral",
     "Avenida Doutor Freitas",
     "Avenida Pedro Álvares Cabral",
     "acesso ao complexo Viário do Entroncamento (pista lateral direita)",
     "Avenida Pedro Álvares Cabral",
     "Avenida Dalva"
    ]
   }
  ]
 },
 "550": {
  "nome": "TELÉGRAFO",
  "terminal": "Avenida Santarém entre Rua Cafezal e Rua Portel.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Santarém",
     "Retorno na Avenida Médice II",
     "Avenida Santarém",
     "Travessa Cafezal",
     "Avenida Paragominas",
     "Rua da Mata",
     "Rua Rodolfo Chermont",
     "Avenida Tavares Bastos",
     "Passagem Dalva",
     "Rua Anchieta",
     "Avenida Dalva",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Dalva",
     "Rua Anchieta",
     "Passagem Dalva",
     "Avenida Tavares Bastos",
     "Rua Rodolfo Chermont",
     "Rua da Mata",
     "Avenida Paragominas",
     "Avenida Cafezal",
     "Rua Paragominas",
     "Rua da Mata"
    ]
   }
  ]
 },
 "631": {
  "nome": "MAREX - VER-O-PESO",
  "terminal": "Avenida Norte próximo a Avenida Júlio César (Conjunto Providência).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Marex",
     "Avenida Norte",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao aeroporto",
     "Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Travessa Alferes Costa",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Marquês de Herval",
     "Travessa Lomas Valentinas",
     "Avenida Duque de Caxias",
     "retorno próximo a Travessa Humaitá",
     "Avenida Duque de Caxias",
     "Travessa Vileta",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Rua dos Apinagés",
     "Rua Engenheiro Fernando Guilhon",
     "Travessa 9 de Janeiro",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Travessa Humaitá",
     "Avenida João Paulo II",
     "retorno veicular localizado após a Travessa Mauriti",
     "Avenida João Paulo II",
     "Travessa Mauriti",
     "Avenida Duque de Caxias",
     "Avenida Doutor Freitas",
     "retorno próximo a Avenida Rômulo Maiorana (antiga Avenida 25 de Setembro)",
     "Avenida Doutor Freitas",
     "Avenida Senador Lemos",
     "contorno no complexo Viário da Jùlio César",
     "Avenida Júlio César",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Avenida Sul",
     "Avenida Norte",
     "Estrada do Marex"
    ]
   }
  ]
 },
 "632": {
  "nome": "MAREX - FELIPE PATRONI",
  "terminal": "Avenida Norte próximo a Avenida Rodovia Arthur Bernardes (Conjunto Providência).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Avenida Norte",
     "Avenida Júlio César",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Rua Coronel Fontoura",
     "Travessa Félix Roque",
     "Rua Tomázia Perdigão"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Travessa 14 de Março",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao Aeroporto",
     "Avenida Júlio César",
     "Avenida Norte",
     "Terminal"
    ]
   }
  ]
 },
 "634": {
  "nome": "MAREX - ARSENAL",
  "terminal": "Rua Gavião entre Travessa Rio Guajará e Travessa Rio Jutaí.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Gavião",
     "Travessa Rio Jutaí",
     "Avenida dos Tucanos",
     "Rua Rio Tapajós",
     "Travessa Pardal",
     "Rua WE 01",
     "Avenida Santos Dumont",
     "Avenida do Contorno",
     "Avenida Júlio César",
     "contorno no retorno semaforizado da Rua Florianópolis",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao Aeroporto",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Dom Pedro I",
     "Avenida Generalíssimo Deodoro",
     "Avenida José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Contorno na Praça São Cristóvão",
     "Avenida Júlio César",
     "contorno na rotatória do Aeroporto",
     "Avenida Júlio César",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Avenida Sul",
     "Avenida Norte",
     "Avenida do Contorno",
     "Avenida Santos Dumont",
     "Rua WE 01",
     "Travessa Pardal",
     "Rua Rio Tapajós",
     "Avenida dos Tucanos",
     "Travessa Rio Guajará",
     "Rua Gavião"
    ]
   }
  ]
 },
 "635": {
  "nome": "CDP/PROVIDÊNCIA - VER-O-PESO",
  "terminal": "Rua Gavião entre Travessa Rio Guajará e Travessa Rio Jutaí.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Gavião",
     "Travessa Rio Jutaí",
     "Avenida dos Tucanos",
     "Rua Rio Tapajós",
     "Travessa Pardal",
     "Rua WE 01",
     "Avenida Santos Dumont",
     "Avenida do Contorno",
     "Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Doutor Freitas",
     "Avenida Senador Lemos",
     "Rua 28 de Setembro",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rua Cipriano Santos",
     "Travessa Teófilo Condurú",
     "Avenida Ceará",
     "Avenida João Paulo II",
     "retorno veicular localizado após a Travessa Mauriti",
     "Avenida João Paulo II",
     "Travessa Mauriti",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Pedro Álvares Cabral",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao Aeroporto",
     "Avenida Júlio César",
     "Avenida do Contorno",
     "Avenida Santos Dumont",
     "Rua WE 01",
     "Travessa Pardal",
     "Rua Rio Tapajós",
     "Avenida dos Tucanos",
     "Travessa Rio Guajará",
     "Rua Gavião"
    ]
   }
  ]
 },
 "636": {
  "nome": "MAREX - PRESIDENTE VARGAS (VIA ARTHUR BERNARDES)",
  "terminal": "Avenida Norte próximo a Avenida Júlio César (Conjunto Providência).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Marex",
     "Avenida Norte",
     "Avenida do Contorno",
     "Avenida Santos Dumont",
     "Rua 17",
     "Avenida Sul",
     "Avenida Norte",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua 13 de Maio",
     "Avenida Presidente Vargas",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Avenida Norte",
     "Avenida Sul",
     "Rua 17",
     "Rua Amazonas",
     "Avenida Santos Dumont",
     "Avenida Júlio César",
     "contorno no retorno semaforizado da Rua Florianopólis",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao Aeroporto",
     "Avenida Júlio César",
     "Estrada do Marex"
    ]
   }
  ]
 },
 "638": {
  "nome": "PRATINHA – PRESIDENTE VARGAS",
  "terminal": "Rua A com Rua Presidente Getúlio Vargas (Parque Arthur Bernardes).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua E",
     "Rua Paulo Guilherme",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "contorno na rotatória em frente ao Aeroporto",
     "Avenida Júlio César",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "contorno na Praça São Cristóvão",
     "Avenida Júlio César",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Rua Paulo Guilherme",
     "Rua E"
    ]
   }
  ]
 },
 "639": {
  "nome": "PRATINHA - CASTANHEIRA",
  "terminal": "Passagem Novo Continente com Passagem Brasil (Parque Novo Aliança- Pratinha)",
  "sentidos": [
   {
    "label": "PRATINHA - CASTANHEIRA",
    "ruas": [
     "Passagem Novo Continente",
     "Rodovia Arthur Bernardes",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno em frente a Viação Itapemirim"
    ]
   },
   {
    "label": "CASTANHEIRA - PRATINHA",
    "ruas": [
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "retorno na rotatória Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rodovia Arthur Bernardes",
     "Passagem Novo Continente"
    ]
   }
  ]
 },
 "641": {
  "nome": "PRATINHA II – CASTANHEIRA (VIA JÚLIO CÉSAR)",
  "terminal": "Rua A com Rua Presidente Getúlio Vargas (Parque Arthur Bernardes)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua E",
     "Rua Paulo Guilherme",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "Avenida Júlio César",
     "contorno da Praça São Cristóvão",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno em frente a Viação Itapemirim"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rodovia BR-316",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Júlio César",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Rua Paulo Guilherme",
     "Rua E"
    ]
   }
  ]
 },
 "642": {
  "nome": "BENGUI / MAREX – CENTRO",
  "terminal": "Passagem Lameira Bittencourt com Passagem Benfica.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua São Clemente",
     "Rua Ajax de Oliveira",
     "Rua São Roque",
     "Rua São Bento",
     "Passagem Major Miguel",
     "Avenida Centenário",
     "Avenida Júlio César contorno na rotatória em frente ao Aeroporto",
     "Avenida Júlio César",
     "Avenida do Contorno",
     "Passagem Santo Amaro",
     "Avenida do Tucanos",
     "Passagem Cabedelo",
     "Travessa Alferes Costa",
     "Marginal do Canal São Joaquim",
     "Passagem Mirandinha",
     "Marginal do Canal do Jacaré",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Rua Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Travessa Quintino Bocaíuva",
     "Rua Boaventura da Silva",
     "Travessa Dom Romualdo de Seixas",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Pombal",
     "Rua Curuçá",
     "Rua Djalma Dutra",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Marginal do Canal do Jacaré",
     "Passagem Mirandinha",
     "Marginal do Canal São Joaquim",
     "Travessa Alferes Costa",
     "Passagem Cabedelo",
     "Avenida dos Tucanos",
     "Rua Santo Amaro",
     "Avenida Júlio César",
     "Rodovia Paulo Frota",
     "Avenida Centenário",
     "retorno antes da Avenida Augusto Montenegro",
     "Avenida Centenário",
     "Passagem Major Miguel",
     "Rua São Bento",
     "Travessa São Roque",
     "Rua Ajax de Oliveira",
     "Rua São Clemente"
    ]
   }
  ]
 },
 "643": {
  "nome": "PRATINHA - UFPA",
  "terminal": "Rodovia do Tapanã (Entrada Jardim Tapanã)",
  "sentidos": [
   {
    "label": "BAIRRO - UFPA",
    "ruas": [
     "Rodovia do Tapanã",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "contorno na rotatória em frente ao aeroporto",
     "Avenida Júlio César",
     "Avenida do Contorno",
     "Avenida Oeste",
     "Avenida dos Tucanos",
     "Passagem Cabedelo",
     "Travessa Alferes Costa",
     "Marginal do Canal São Joaquim",
     "Passagem Mirandinha",
     "Rua São Benedito",
     "Avenida Senador Lemos",
     "Avenida Alferes Costa",
     "Avenida Visconde de Inhaúma",
     "Avenida Doutor Freitas",
     "Avenida Rômulo Maiorana",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Perimetral",
     "Terminal UFPA"
    ]
   },
   {
    "label": "UFPA - BAIRRO",
    "ruas": [
     "Terminal UFPA",
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida João Paulo II",
     "Travessa Angustura",
     "Avenida Rômulo Maiorana",
     "Retorno em baixo do elevado Carlos Mariguela",
     "Avenida Doutor Freitas",
     "Avenida Visconde de Inhaúma",
     "Travessa Alferes Costa",
     "Passagem Cabedelo",
     "Avenida dos Tucanos",
     "Avenida Oeste",
     "Avenida do Contorno",
     "retorno semaforizado da Rua Florianópolis",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao aeroporto",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Rodovia do Tapanã"
    ]
   }
  ]
 },
 "654": {
  "nome": "CATALINA – PRESIDENTE VARGAS (VIA ARTHUR BERNARDES)",
  "terminal": "Arterial Sul com Travessa Major Seda.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Arterial Sul",
     "Travessa Major Coronel Aviador Brito",
     "Arterial Norte",
     "Rua do Bagé",
     "Rua São Bento",
     "Travessa São Roque",
     "Rua Ajax de Oliveira",
     "Rua do Yamada",
     "Rua John Engelhard",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Travessa 1° de Março"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Boaventura da Silva",
     "Travessa Dom Romualdo de Seixas",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua John Engelhard",
     "Rua do Yamada",
     "Rua Ajax de Oliveira",
     "Travessa São Roque",
     "Rua São Bento",
     "Rua do Bagé",
     "Arterial Norte",
     "Travessa Major Coronel Aviador Brito",
     "Arterial Sul"
    ]
   }
  ]
 },
 "663": {
  "nome": "BENGUI - FELIPE PATRONI",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Bengui - Felipe Patroni",
    "ruas": [
     "Rua São Clemente",
     "Rua Ajax de Oliveira",
     "Rua Betânia",
     "Estrada do Bengui",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Rua Pedro Álvares Cabral",
     "Av. Tavares Bastos",
     "Av. Almirante Barroso",
     "Travessa Antônio Boena",
     "Rua Antônio Barreto",
     "Travessa Francisco Caldeira Castelo Branco",
     "Av. Conselheiro Furtado",
     "Travessa Padre Eutíquio, esquina com Av. Almirante Tamandaré"
    ]
   },
   {
    "label": "VOLTA: Felipe Patroni - Bengui",
    "ruas": [
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro",
     "Av. Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av. Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Av. Visconde de Sousa Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Av. Senador Lemos",
     "Travessa Mauriti",
     "Av. Almirante Barroso",
     "Rua Antônio Everdosa",
     "Travessa Mariz e Barros",
     "Av. João Paulo II",
     "Travessa Timbó",
     "Av. Almirante Barroso",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Estrada do Bengui",
     "Rua Betânia",
     "Rua Ajax de Oliveira",
     "Rua São Clemente",
     "Rua da Pratinha"
    ]
   }
  ]
 },
 "664": {
  "nome": "BENGUI - VER-O-PESO",
  "terminal": "Rua São Clemente esquina com Rua da Pratinha (Próximo ao Cemitério do Benguí).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua São Clemente",
     "Rua Ajax de Oliveira",
     "Rua Betânia",
     "Estrada do Benguí",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Travessa Mauriti",
     "Rua Nova",
     "Travessa Coronel Luiz Bentes",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Estrada do Benguí",
     "Rua Betânia",
     "Rua Ajax de Oliveira",
     "Rua São Clemente"
    ]
   }
  ]
 },
 "665": {
  "nome": "CORDEIRO DE FARIAS - PRESIDENTE VARGAS",
  "terminal": "Rua São Clemente esquina com Rua Ipê.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua São Clemente",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rua São Clemente"
    ]
   }
  ]
 },
 "666": {
  "nome": "CANARINHO - PRESIDENTE VARGAS",
  "terminal": null,
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa São José",
     "Rua 13 de Agosto",
     "Rua Atenas",
     "Rua Bolonha",
     "Rodovia do Tapanã",
     "Rua do Yamada",
     "Rua São Mateus",
     "Rua São Clemente",
     "Rua Ajax de Oliveira",
     "Rua Betânia",
     "Estrada do Benguí",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constante",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Estrada do Benguí",
     "Rua Betânia",
     "Rua Ajax de Oliveira",
     "Rua São Clemente",
     "Rua São Mateus",
     "Rua do Yamada",
     "Rodovia do Tapanã",
     "Rua Bolonha",
     "Rua Atenas",
     "Rua 13 de Agosto",
     "Travessa São José. TERMNAL: Travessa São José com Rua Açailândia (Ao lado da Caixa d´Água - Residencial Canarinho)"
    ]
   }
  ]
 },
 "667": {
  "nome": "CORDEIRO DE FARIAS – VER-O-PESO",
  "terminal": "Rua São Clemente com Rua Ipê. / Rua São Clemente com Rua Ipê.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Santos",
     "Rua John Engelhard",
     "Rua São Clemente",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré (pista direita)",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães barata",
     "Avenida Almirante Barroso",
     "Acesso ao Complexo Viário do Entrocamento",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã. Rua São Clemente",
     "Rua Presidente Lula",
     "Rua Santos"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Santos",
     "Rua John Engelhard",
     "Rua São Clemente",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso ( Caneleta BRT - EXPRESSO)",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré (pista direita)",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães barata",
     "Avenida Almirante Barroso ( Caneleta BRT - EXPRESSO)",
     "Acesso ao Complexo Viário do Entrocamento",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã. Rua São Clemente",
     "Rua Presidente Lula",
     "Rua Santos"
    ]
   }
  ]
 },
 "668": {
  "nome": "PRATINHA – VER- O-PESO",
  "terminal": "Rua A com Rua Presidente Getúlio Vargas (Parque Arthur Bernardes)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua A",
     "Rua E",
     "Rua Paulo Guilherme",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rua Djalma Dutra",
     "Avenida Senador Lemos",
     "Avenida Pedro Álvares Cabral",
     "Rua Djalma Dutra",
     "Avenida Senador Lemos",
     "Acesso ao Compesso Viário da Avenida Júlio César",
     "Avenida Júlio César",
     "contorno na rotatória em frente ao aeroporto",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Rua Paulo Guilherme",
     "Rua E",
     "Rua A"
    ]
   }
  ]
 },
 "669": {
  "nome": "CORDEIRO DE FARIAS – CASTANHEIRA",
  "terminal": "Rua Santos próximo a Rua Presidente Lula.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Santos",
     "Rua John Engelhard",
     "Rua São Clemente",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno próximo à retorno em frente a Viação Itapemirim"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "retorno na rotatória Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Estrada do Benguí",
     "Rua Betania",
     "Rua Ajax de Oliveira",
     "Estrada do Yamada",
     "Rodovia do Tapanã",
     "Rua São Clemente",
     "Rua Presidente Lula",
     "Rua Santos"
    ]
   }
  ]
 },
 "754": {
  "nome": "JARDIM SIDERAL - VER-O-PESO",
  "terminal": "Avenida Brasil com Rua São Pedro.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Brasil",
     "Passagem Ceará",
     "Rua do Sideral",
     "Rua São Pedro",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Rua São Pedro",
     "Rua do Sideral",
     "Passagem Ceará",
     "Avenida Brasil"
    ]
   }
  ]
 },
 "755": {
  "nome": "JARDIM SIDERAL – PRAÇA DOM PEDRO II",
  "terminal": "Avenida Brasil com T-11",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua São Pedro",
     "Avenida Brasil",
     "Passagem Ceará",
     "Rua do Sideral",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entrocamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Rua Coronel Fontoura",
     "Travessa Félix Roque",
     "Rua Tomázia Perdigão",
     "Rua Padre Champagnat"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento Avenida Augusto Montenegro",
     "Rua Sideral",
     "Passagem Ceará",
     "Avenida Brasil",
     "Rua São Pedro"
    ]
   }
  ]
 },
 "756": {
  "nome": "CATALINA – FELIPE PATRONI",
  "terminal": "Rua Santo Antônio com Passagem Lameira Bittencourt.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Santo Antônio",
     "Passagem Lameira Bittencourt",
     "Rua Waldir Acatauassú Nunes",
     "Rua São Bento",
     "Rua do Bagé",
     "Arterial Norte",
     "Travessa Major Coronel Aviador Brito",
     "Arterial Sul",
     "Travessa Major Seda",
     "Rodovia Transmangueirão",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Júlio César",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "contorno na Praça São Cristóvão",
     "Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Transmangueirão",
     "Travessa Major Seda",
     "Arterial Sul",
     "Travessa Major Coronel Aviador Brito",
     "Arterial Norte",
     "Rua do Bagé",
     "Rua São Bento",
     "Rua Waldir Acatauassú Nunes",
     "Passagem Lameira Bittencourt",
     "Rua Santo Antônio"
    ]
   }
  ]
 },
 "757": {
  "nome": "JARDIM EUROPA - PRESIDENTE VARGAS.",
  "terminal": "Avenida Portugal (Jardim Europa) ITINERÁRIO B: / Avenida Portugal (Jardim Europa)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Portugal",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "Avenida Portugal"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Portugal",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "Avenida Portugal"
    ]
   }
  ]
 },
 "758": {
  "nome": "CONJ. MAGUARI - VER O PESO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Conj. Maguari - Ver o Peso",
    "ruas": [
     "Av. Secundária",
     "Alameda NS-30",
     "Av. Principal do Conj. Maguari",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Av. Almirante Barroso",
     "Av. Gov. José Malcher",
     "Av. Assis de Vasconcelos",
     "Av. Marechal Hermes",
     "Av. Boulevard Castilhos França"
    ]
   },
   {
    "label": "VOLTA: Ver o Peso - Conj. Maguari",
    "ruas": [
     "Av. Boulevard Castilhos França",
     "Av. Portugal",
     "Praça Dom Pedro I",
     "Av. 16 de Novembro",
     "Av. Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av. Nossa Senhora de Nazaré",
     "Av. Gov. Magalhães Barata",
     "Av. Almirante Barroso",
     "Integração física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Av. Principal",
     "Alameda NS-30",
     "Av. Secundária",
     "Alameda Doze"
    ]
   }
  ]
 },
 "761": {
  "nome": "SATÉLITE - FELIPE PATRONI",
  "terminal": "Rua SN 9 entre Travessa WE 9 e Travessa WE 10.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua SN 9",
     "Travessa WE 07",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 05",
     "Travessa WE 08",
     "Rua da Igreja (Rua SN 04)",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Mauriti",
     "Avenida Antônio Everdosa",
     "Travessa Mariz e Barros",
     "Avenida João Paulo II",
     "Travessa Mariz e Barros",
     "Travessa Timbó",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "Rua da Igreja (Rua SN 04)",
     "Travessa WE 08",
     "Rua SN 06",
     "Travessa WE 07",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 9"
    ]
   }
  ]
 },
 "762": {
  "nome": "SATÉLITE - VER-O-PESO",
  "terminal": "Rua SN 9 entre Travessa WE 9 e Travessa WE 10.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua SN 9",
     "Travessa WE 07",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 05",
     "Travessa WE 08",
     "Rua da Igreja (Rua SN 04)",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Mauriti",
     "Avenida Senador Lemos",
     "Travessa Barão do Triunfo",
     "Avenida Pedro Álvares Cabral",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "Rua da Igreja (Rua SN 04)",
     "Travessa WE 08",
     "Rua SN 06",
     "Travessa WE 07",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 9"
    ]
   }
  ]
 },
 "767": {
  "nome": "SIDERAL – PRESIDENTE VARGAS",
  "terminal": "Rua São Pedro com Travessa 29.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua São Pedro",
     "Avenida Brasil",
     "Passagem Ceará",
     "Rua do Sideral",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua do Sideral",
     "Passagem Ceará",
     "Avenida Brasil",
     "Rua São Pedro"
    ]
   }
  ]
 },
 "768": {
  "nome": "SATÉLITE - UFPA",
  "terminal": "Terminal São Brás / Terminal da UFPA",
  "sentidos": [
   {
    "label": "IDA: Satélite - UFPA",
    "ruas": [
     "Rua SN 09",
     "Travessa WE 07",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 05",
     "Travessa WE 08",
     "Rua SN 04",
     "Av. Mário Covas",
     "Av. Augusto Montenegro",
     "Integração Temporal",
     "Av. Augusto Montenegro",
     "Av. Almirante Barroso",
     "Integração Física no Terminal de São Brás",
     "Av. José Malcher",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Av. José Bonifácio",
     "Travessa Barão do Igarapé Mirim",
     "Av. Perimetral",
     "Terminal da UFPA"
    ]
   },
   {
    "label": "VOLTA: UFPA - Satélite",
    "ruas": [
     "Terminal UFPA",
     "Av. Perimetral",
     "Rua Augusto Corrêa",
     "Travessa Barão do Igarapé Mirim",
     "Av. José Bonifácio",
     "Av. Almirante Barroso",
     "Integração Física no Terminal de São Brás",
     "Retorno na Praça da Leitura",
     "Av. Almirante Barroso",
     "Av. Mário Covas",
     "Travessa SN 04",
     "Travessa WE 08",
     "Rua SN 07",
     "Travessa WE 12",
     "Rua SN 05 - 09"
    ]
   }
  ]
 },
 "770": {
  "nome": "TAPAJÓS – VER-O-PESO (VIA AUGUSTO MONTENEGRO",
  "terminal": "Rua Buriti com Rua Bolmoral",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Buriti",
     "Rua Búzios",
     "Rua Bolonha",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "retorno na Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rua Bolonha",
     "Rua Rua Búzios",
     "Rua Buriti"
    ]
   }
  ]
 },
 "771": {
  "nome": "CANARINHO - MANGUEIRÃO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Canarinho - Mangueirão",
    "ruas": [
     "Rua Treze de Agosto",
     "Estrada da Ecir",
     "Rua Bolonha",
     "Rua Búzios",
     "Rua Buruti",
     "Contorno Rua Buruti",
     "Rua Búzios",
     "Rua Bolonha",
     "Estrada do Tapanã",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão"
    ]
   },
   {
    "label": "VOLTA: Mangueirão - Canarinho",
    "ruas": [
     "Integração Física no Terminal Mangueirão",
     "Retorno na Av. Augusto Montenegro",
     "Estrada do Tapanã",
     "Retorno na Estrada do Tapanã",
     "Rua Bolonha",
     "Rua Búzios",
     "Rua Buruti",
     "Contorno na Rua Buruti",
     "Rua Búzios",
     "Rua Bolonha",
     "Rua da Ecir",
     "Rua Treze de Agosto"
    ]
   }
  ]
 },
 "783": {
  "nome": "TENONÉ – CENTRO (PÁTIO BELÉM)",
  "terminal": "Rua WE 02 entre Rua SN 16 e Rua SN 17. ITINERÁRIO B / Rua WE-02 entre Rua SN 11 e SN 12",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua WE 02",
     "6ª Linha do Tenoné",
     "Rua Laranjeiras",
     "5° Rua do Tenoné",
     "Rua Principal do Tenoné (Rua Alacid Nunes)",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua Principal do Tenoné (Rua Alacid Nunes)",
     "5ª Linha do Tenoné",
     "Rua Laranjeiras",
     "6ª Linha do Tenoné",
     "WE 02"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua WE 02",
     "6ª Linha do Tenoné",
     "Rua Laranjeiras",
     "5° Linha do Tenoné",
     "Rua Alacid Nunes",
     "Avenida Augusto Montenegro",
     "Terminal Mangueirão",
     "Avenida Augusto Montenegro(Caneleta BRT - EXPRESSO)",
     "acesso ao Complexo Viário do Entrocamento (pistal em nível)",
     "Avenida Almirante Barroso(Caneleta BRT - EXPRESSO) Avenida Governador Jose Malcher",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Avenida Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Travessa São Pedro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso(Caneleta BRT - EXPRESSO)",
     "acesso ao Complexo Viário do Entroncamento (pista em nível)",
     "Avenida Augusto Montenegro(Caneleta BRT - EXPRESSO)",
     "Terminal Mangueirão",
     "Avenida Augusto Montenegro",
     "Rua Alacid Nunes",
     "5ª Linha do Tenoné",
     "Rua Lajanjeiras",
     "6° Linha do Tenoné",
     "WE 02"
    ]
   }
  ]
 },
 "785": {
  "nome": "TENONÉ - VER O PESO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Tenoné - Ver o Peso",
    "ruas": [
     "Travessa WE-01",
     "Sexta Linha",
     "Rua das Laranjeiras",
     "Quinta Linha",
     "Rua Alacid Nunes",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Mangueirão",
     "Av. Centenário",
     "Av. Paulo Frota",
     "Av. Júlio César",
     "Aeroporto",
     "Av. Júlio César",
     "Av. Pedro Álvares Cabral",
     "Av. Visconde de Sousa Franco",
     "Av. Marechal Hermes",
     "Av. Boulevard Castilhos França"
    ]
   },
   {
    "label": "VOLTA: Ver o Peso - Tenoné",
    "ruas": [
     "Av. Portugal",
     "Av. Dezesseis de Novembro",
     "Av. Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av. Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Av. Visconde de Sousa Franco",
     "Av. Pedro Álvares Cabral",
     "Travessa Coronel Luiz Bentes",
     "Av. Senador Lemos",
     "Av. Júlio César",
     "Retorno na Rua Florianópolis",
     "Av. Paulo Frota",
     "Av. Centenário",
     "Av. Mangueirão",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Rua Alacid Nunes",
     "Sexta Linha",
     "Travessa WE-01"
    ]
   }
  ]
 },
 "795": {
  "nome": "CABANAGEM - PRESIDENTE VARGAS (Via Pedro Alvares Cabral)",
  "terminal": "Rua São Pedro entre Travessa 28 e Travessa 29. ITINERÁRIO B: / Rua Damasco com Rua Benjamin (Cabanagem).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Rua São Pedro",
     "Avenida Brasil",
     "Rua Benjamin",
     "Rua Val-de\u0002Cães",
     "Rua Principal do Conjunto Panorama XXI",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Marechal Hermes (pista esquerda)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "contorno na Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "acesso ao Complexo da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua Principal do Conjunto Panorama XXI",
     "Rua do Tubo",
     "Rua Val-de-Cães",
     "Rua Benjamin",
     "Avenida Brasil",
     "Rua São Pedro",
     "Terminal"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Rua São Pedro",
     "Avenida Brasil",
     "Rua Benjamin",
     "Rua Val-de-Cães",
     "Rua Principal do Conj. Panorama XXI",
     "Avenida Augusto Montenegro",
     "Acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes(pista lateral direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "contorno na Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "acesso ao Complexo da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua Principal do Conjunto Panorama XXI",
     "Rua do Tubo",
     "Rua Val-de-Cães",
     "Rua Benjamin",
     "Terminal.Avenida Portugal",
     "Rua Desembargador Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Acesso ao complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua Principal do Conjunto Panorama XXI",
     "Rua do Tubo",
     "Rua Val-de-Cães",
     "Rua Benjamin",
     "Avenida Brasil",
     "Rua São Pedro",
     "Terminal"
    ]
   }
  ]
 },
 "797": {
  "nome": "TOCANTINS - PRESIDENTE VARGAS",
  "terminal": "Rua Mário Andreaza com Rua Paracuri (Residencial Tocantins)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Mário Andreza",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento (pista em nível)",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento (pista em nível)",
     "Avenida Augusto Montenegro",
     "Rua Mário Andreaza"
    ]
   }
  ]
 },
 "860": {
  "nome": "TAPANÃ - UFPA",
  "terminal": "Rodovia do Tapanã (Entrada do Jardim Tapanã)",
  "sentidos": [
   {
    "label": "Tapanã - UFPA",
    "ruas": [
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "Estrada do Benguí",
     "Rua Bethânia",
     "Rua Ajax de Oliveira",
     "Travessa São Roque",
     "Rua São Bento",
     "Travessa 9",
     "Avenida Magalhães Barata",
     "Rua Aviador Coronel Brito",
     "Avenida Centenário da Assembléia de Deus",
     "Avenida Paulo Frota",
     "Avenida Júlio César",
     "retorno na rotatória da Avenida Pará",
     "Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Doutor Freitas",
     "Avenida 25 de Setembro",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Avenida Perimetral"
    ]
   },
   {
    "label": "UFPA - Tapanã",
    "ruas": [
     "Terminal UFPA",
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida João Paulo II",
     "Travessa Angustura",
     "Avenida Rômulo Maiorana",
     "Avenida Doutor Freitas",
     "Retorno em baixo do elevado Carlos Mariguela",
     "Avenida Doutor Freitas",
     "Avenida Senador Lemos",
     "Acesso ao elevado Daniel Berg",
     "Avenida Jùlio Cesar",
     "Avenida Paulo Frota",
     "Avenida Centenário da Assembléia de Deus",
     "Retorno após a Rodovida Transmangueirão",
     "Avenida Centenário da Assembléia de Deus",
     "Rua Aviador Coronel Brito",
     "Avenida Magalhães Barata",
     "Travessa 9",
     "Rua São Bento",
     "Rua São Roque",
     "Rua Ajáx de Oliveira",
     "Rua Bethânia",
     "Estrada do Bengui",
     "Avenida Augusto Montenegro",
     "Retorno em frente ao Mangueirão",
     "Avenida Augusto Montenegro",
     "Retorno Trevo do Satélite",
     "Rodovia do Tapanã"
    ]
   }
  ]
 },
 "861": {
  "nome": "TAPANÃ II - VER O PESO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Tapanã II - Ver o Peso",
    "ruas": [
     "Rua Haroldo Veloso",
     "Rodovia do Tapanã",
     "Av. Pe. Bruno Sechi",
     "Rua Ajax de Oliveira",
     "Rua São Roque",
     "Rua São Bento",
     "Travessa Nova",
     "Rua Magalhães Barata",
     "Av. Coronel Brito",
     "Av. Centenário",
     "Av. Mangueirão",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Av. Almirante Barroso",
     "Av. Gov. José Malcher",
     "Av. Assis de Vasconcelos",
     "Av. Marechal Hermes",
     "Av. Boulevard Castilhos França"
    ]
   },
   {
    "label": "VOLTA: Ver o Peso - Tapanã II",
    "ruas": [
     "Av. Boulevard Castilhos França",
     "Av. Portugal",
     "Av. 16 de Novembro",
     "Av. Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av. Serzedelo Corrêa",
     "Av. Gentil Bittencourt",
     "Av. José Bonifácio",
     "Av. Almirante Barroso",
     "Integração Física no Terminal Mangueirão",
     "Av. Mangueirão",
     "Av. Centenário",
     "Av. Coronel Brito",
     "Travessa Nova",
     "Rua São Bento",
     "Rua São Roque",
     "Rua Ajax de Oliveira",
     "Rua Pe. Bruno Sechi",
     "Estrada do Tapanã",
     "Rua Haroldo Veloso"
    ]
   }
  ]
 },
 "862": {
  "nome": "TAPANÃ – FELIPE PATRONI",
  "terminal": "Rodovia do Tapanã com Rodovia Artur Bernades.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Travessa São Pedro"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Mauriti",
     "Avenida Antônio Everdosa",
     "Travessa Mariz e Barros",
     "Avenida João Paulo II",
     "Travessa Timbó",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã"
    ]
   }
  ]
 },
 "866": {
  "nome": "TAPANÃ - VER-O-PESO",
  "terminal": "Rodovia do Tapanã (Entrada do Complexo habitacional Jardim Tapanã). / Rodovia do Tapanã (Entrada do Complexo habitacional Jardim Tapanã).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Estrada do Ranário",
     "Estrada da Piçarreira",
     "Rodovia do Tapanã",
     "Acesso a Rotatória",
     "Avenida Augusto Montenegro",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Desembargador Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Estrada da Piçarreira",
     "Rua Santos dos Santos",
     "Estrada do Ranário",
     "Terminal"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Estrada do Ranário",
     "Estrada da Piçarreira",
     "Rodovia do Tapanã",
     "Acesso a Rotatória",
     "Avenida Augusto Montenegro",
     "Avenida Almirante Barroso(Caneleta BRT - EXPRESSO)",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Desembargador Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso(Caneleta BRT - EXPRESSO)",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Estrada da Piçarreira",
     "Rua Santos dos Santos",
     "Estrada do Ranário",
     "Terminal"
    ]
   }
  ]
 },
 "869": {
  "nome": "TAPANÃ - PRESIDENTE VARGAS",
  "terminal": "Rodovia do Tapanã (Entrada do Jardim Tapanã).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Terminal",
     "Rua do Ranário",
     "MEstrada da Piçarreira",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas. SENTIDO CENTRO - BAIRRO Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Estrada da Piçarreira",
     "Rua Santos dos Santos",
     "Estrada do Ranário",
     "Terminal. K3A3C3:J3"
    ]
   }
  ]
 },
 "870": {
  "nome": "PARACURI – VER-O-PESO ( ICOARACI)",
  "terminal": "Rua L 01 entre Travessa 07 e Travessa 08 (Conjunto Paracuri).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua L 01",
     "Travessa 11",
     "Rua L 04",
     "Rua 08 de Maio",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Manoel Barata",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Pará",
     "contorno na Praça do Aeroporto",
     "Avenida Pará",
     "Avenida Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abeu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Avenida Pedro Álvares Cabral",
     "Rua Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "contorno na Praça do Aeroporto",
     "Avenida Pará",
     "Avenida Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rua 08 de Maio",
     "R. L 04",
     "Travessa 11",
     "Rua L 01"
    ]
   }
  ]
 },
 "871": {
  "nome": "ICOARACI - VER-O-PESO",
  "terminal": "Avenida contorno Leste com Rua L5 (Conjunto COHAB).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "contorno Leste",
     "Rua da Brasilia",
     "Estrada do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Soledade",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Avenida Pedro Álvares Cabral ou Rua Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada do Outeiro",
     "Rua da Brasília",
     "Contorno Leste"
    ]
   }
  ]
 },
 "872": {
  "nome": "ICOARACI – ALMIRANTE BARROSO",
  "terminal": "Rua 02 de Dezembro Próximo a Passagem Fé em Deus. ITINERÁRIO B : / Rua L 01 entre Travessa 07 e Travessa 08 (Paracuri II).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa Soledade",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Soledade"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua L 01",
     "Travessa 11",
     "Rua L 04",
     "Rua 08 de Maio",
     "Travessa Berredos",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Travessa São Roque",
     "Rua Manoel Barata",
     "Travessa Berredos",
     "Rua 08 de Maio",
     "Rua L 04",
     "Travessa 11",
     "Rua L 01"
    ]
   }
  ]
 },
 "872.1": {
  "nome": "ICOARACI (PARACURI I) - AV. ALMIRANTE BARROSO",
  "terminal": "Terminal Maracacuera / Terminal Mangueirão / Terminal São Brás",
  "sentidos": [
   {
    "label": "IDA: Icoaraci (Paracuri I) - Av. Almirante Barroso",
    "ruas": [
     "Final da linha do Paracuri I",
     "Rua Dois de Dezembro",
     "Travessa da Soledade",
     "Rua Manoel Barata",
     "Av. Dr. Lopo de Castro",
     "Rua Oito de Setembro",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal de São Brás",
     "Av. Governador José Malcher",
     "Av. Visconde de Souza Franco",
     "Av. Marechal Hermes",
     "Travessa Piedade",
     "Av. Municipalidade",
     "Av. Presidente Vargas"
    ]
   },
   {
    "label": "VOLTA: Almirante Barroso - Icoaraci (Paracuri I)",
    "ruas": [
     "Av. Presidente Vargas",
     "Av. Nazaré",
     "Av. Magalhães Barata",
     "Av. Almirante Barroso",
     "Integração Física no Terminal São Brás",
     "Av. Almirante Barroso",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Rua Dois de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlia Maria",
     "Travessa Berredos",
     "Rua Coronel Juvêncio Sarmento",
     "Travessa da Soledade",
     "Rua Dois de Dezembro",
     "Final da linha do Paracuri I"
    ]
   }
  ]
 },
 "873": {
  "nome": "ICOARACI - PRESIDENTE VARGAS (VIA BERREDOS)",
  "terminal": "Contorno Leste (Conjunto Cohab)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Contorno Leste",
     "Contorno Oeste",
     "Rua Moura Carvalho",
     "Rua 08 de Maio",
     "Estrada do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rua 08 de Maio",
     "Travessa Berredos",
     "Rua Manoel Barata",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Avenida Pedro Álvares Cabral ou Rua Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Berredos",
     "Rua 08 de Maio",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada do Outeiro",
     "5° Rua da Campina",
     "Rua Moura Carvalho",
     "Contorno Norte",
     "Contorno Leste"
    ]
   }
  ]
 },
 "875": {
  "nome": "ICOARACI - SÃO BRÁS",
  "terminal": "Rua 02 de Dezembro próximo à Passagem Fé em Deus.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa Soledade",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Soledade"
    ]
   }
  ]
 },
 "876": {
  "nome": "FAMA/FIDÉLIS – ICOARACI",
  "terminal": "Final da Rua do Fidélis",
  "sentidos": [
   {
    "label": "FAMA / FIDÉLIS - ICOARACI",
    "ruas": [
     "Rua do Fidélis",
     "Estrada Nova do Outeiro",
     "Estrada do Fama",
     "Retorno no campo de futebol",
     "Estrada do Fama",
     "Avenida Paulo Costa",
     "Avenida Nossa Senhora da Conceição",
     "Rua Manoel Barata",
     "Estrada Evandro Bonna",
     "Estrada do Itaiteua",
     "Retorno no final da Estrada",
     "Estrada do Itaiteua",
     "acesso a Estrada Evandro Bonna",
     "Estrada Nova do Outeiro",
     "Estrada da Ponte",
     "Estrada da Ascensão",
     "Estrada do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Travessa São Roque",
     "Rua Padre Júlio maria"
    ]
   },
   {
    "label": "ICOARACI - FAMA / FIDÉLIS",
    "ruas": [
     "Travessa Berredos",
     "Rua 08 de Maio",
     "Avenida Augusto Montenegro",
     "Estrada do Maracacuera",
     "Estrada da Taboquinha",
     "Estrada do Outeiro",
     "Estrada da Ascensão",
     "Estrada da Ponte",
     "Estrada Nova Outeiro",
     "Rua do Fidélis",
     "Retorno no final da Rua do Fidélis",
     "Rua do Fidélis",
     "Estrada Nova Outeiro",
     "Estrada do Fama"
    ]
   }
  ]
 },
 "878": {
  "nome": "ICOARACI - CIDADE NOVA",
  "terminal": "Travessa Soledade esquina com Rua Manoel Barata. ITINERÁRIO B (Transcoqueiro)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Arterial 05"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 23",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Travessa São Roque",
     "Rua Manoel Barata"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rodovia Transcoqueiro",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Arterial 05"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 23",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia Transcoqueiro",
     "Avenida Augusto Montenegro",
     "02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Soledade",
     "Rua Manoel Barata. BD - Rua 02 de Dezembro com Rua Opala (Paracuri I) AF - Avenida Rio Solimões (em frente o Posto de Saúde do PAAR)"
    ]
   }
  ]
 },
 "878.2": {
  "nome": "ICOARACI (CIDADE NOVA) - MANGUEIRÃO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Cidade Nova - Mangueirão",
    "ruas": [
     "Praça Vicente de Paulo",
     "Av. Rio Solimões",
     "Arterial 5-A",
     "Travessa SN-21",
     "Travessa WE-72",
     "Travessa SN-23",
     "Travessa WE-59",
     "Av. Dom Vicente Zico",
     "Rotatória do Icuí (sentido Rua da Providência)",
     "Rua da Providência",
     "Travessa WE-13B (Cidade Nova II)",
     "Praça da Bíblia",
     "Av. Três Corações",
     "Av. Mário Covas",
     "Transcoqueiro (UNA)",
     "Av. Augusto Montenegro (sentido Icoaraci)",
     "Integração Física no Terminal Mangueirão"
    ]
   },
   {
    "label": "VOLTA: Mangueirão - Cidade Nova",
    "ruas": [
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Retorno antes Terminal BRT Marinha",
     "Av. Augusto Montenegro (sentido Icoaraci)",
     "Transcoqueiro (UNA)",
     "Av. Mário Covas (sentido Viaduto do Coqueiro)",
     "Av. Três Corações",
     "Av. Doutor Nonato Sanova",
     "Av. Dom Vicente Zico",
     "Travessa WE-24",
     "Arterial 5-B",
     "Estrada Curuçambá Oeste (canteiro central do Paar)",
     "Av. Rio Amazonas",
     "Passagem Bragança",
     "Av. Rio Solimões",
     "Praça Vicente de Paulo"
    ]
   }
  ]
 },
 "879": {
  "nome": "OUTEIRO (BRASÍLIA) - SÃO BRÁS",
  "terminal": "Terminal Maracacuera / Terminal São Brás",
  "sentidos": [
   {
    "label": "IDA: Outeiro (Brasília) - São Brás",
    "ruas": [
     "Estação de Outeiro (Brasília)",
     "Av. BL Dez",
     "Travessa da Tranquilidade",
     "Av. Nossa Senhora da Conceição",
     "Av. Paulo Costa",
     "Estrada do Outeiro",
     "Furo do Maguari",
     "Estrada do Outeiro",
     "Estrada da Ascenção",
     "Estrada do Outeiro",
     "Estrada da Maracacuera",
     "Integração Física no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Entroncamento",
     "Av. Almirante Barroso",
     "Av. José Malcher",
     "Praça da Leitura",
     "Integração Física no Terminal São Brás"
    ]
   },
   {
    "label": "VOLTA: São Brás - Outeiro (Brasília)",
    "ruas": [
     "Integração Física no Terminal São Brás",
     "Av. Almirante Barroso",
     "Entroncamento",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Maracacuera",
     "Estrada da Ascenção",
     "Estrada do Outeiro",
     "Furo do Maguari",
     "Estrada do Outeiro",
     "Av. Paulo Costa",
     "Av. Nossa Senhora da Conceição",
     "Travessa da Tranquilidade",
     "Av. BL Dez",
     "Estação de Outeiro (Brasília)"
    ]
   }
  ]
 },
 "880": {
  "nome": "OUTEIRO / PRESIDENTE VARGAS",
  "terminal": "Estrada da Brasília (Porto da Balsa) ITINERARIO B: / Estrada da Brasília próximo ao Rio Maguari (Porto da Balsa).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Itaiteua",
     "Estrada Evandro Bonna",
     "Travessa Fransklin de Menezes",
     "Avenida Nossa Senhora da Conceição",
     "Avenida Paulo Costa",
     "Estrada do Outeiro",
     "Estrada da Ponte",
     "Estrada Velha do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Travessa São Roque",
     "Rua Manoel Barata",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente vargas",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Pedro Álvares Cabral ou Rua Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro (antiga Travessa Cristóvão Colombo)",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada Velha do Outeiro",
     "Estrada do Outeiro",
     "Avenida Paulo Costa",
     "Avenida Nossa Senhora da Conceição",
     "Avenida Manoel Barata",
     "Estrada Evandro Bonna",
     "Estrada do Itaiteua"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Brasília (Porto da Balsa)",
     "Rodovia BL 010",
     "contorno na Praça",
     "Rodovia BL 010",
     "Travessa Tranqüilidade",
     "Avenida Nossa Senhora da Conceição",
     "Avenida Paulo Costa",
     "Estrada do Outeiro",
     "Estrada da Ponte",
     "Estrada Velha do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Travessa São Roque",
     "Rua Manoel Barata",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente vargas",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Pedro Álvares Cabral ou Rua Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "acesso a Estação de Passageiros do Terminal Hidroviário",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro (antiga Travessa Cristóvão Colombo)",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada Velha do Outeiro",
     "Estrada do Outeiro",
     "Avenida Paulo Costa",
     "Avenida Nossa Senhora da Conceição",
     "Travessa Tranqüilidade",
     "Rodovia BL 010",
     "Contorno na Praça",
     "Rodovia BL 010",
     "Estrada da Brasília até o Porto da Balsa"
    ]
   }
  ]
 },
 "881": {
  "nome": "ÁGUAS NEGRAS (PARICÁS) - MARACACUERA",
  "terminal": "Terminal Maracacuera (Temporal)",
  "sentidos": [
   {
    "label": "IDA: Águas Negras (Paricás) - Maracacuera",
    "ruas": [
     "Estrada da Maracacuera",
     "Passagem Brasília",
     "Estrada Velha do Outeiro",
     "Rua Oito de Setembro",
     "Av. Augusto Montenegro",
     "Integração Temporal no Terminal Maracacuera"
    ]
   },
   {
    "label": "VOLTA: Maracacuera - Águas Negras (Paricás)",
    "ruas": [
     "Integração Temporal no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Rua Dois de Dezembro",
     "Av. Doutor Lopo de Castro",
     "Estrada Velha do Outeiro",
     "Passagem Brasília",
     "Estrada da Maracacuera"
    ]
   }
  ]
 },
 "882": {
  "nome": "OUTEIRO (FAMA) - MARACACUERA",
  "terminal": "Terminal Maracacuera (Temporal)",
  "sentidos": [
   {
    "label": "IDA: Outeiro (Fama) - Maracacuera",
    "ruas": [
     "Passagem 25 de Junho",
     "Passagem 03 de Outubro",
     "Rua 16 de Novembro",
     "Rua Mário Corrêa",
     "Av. 16 de Novembro",
     "Av. Franklin de Menezes",
     "Av. Nossa Senhora da Conceição",
     "Av. Paulo Costa",
     "Estrada da Maracacuera",
     "Integração Temporal no Terminal Maracacuera"
    ]
   },
   {
    "label": "VOLTA: Maracacuera - Outeiro (Fama)",
    "ruas": [
     "Integração Temporal no Terminal Maracacuera",
     "Estrada da Maracacuera",
     "Estrada do Outeiro",
     "Av. Paulo Costa",
     "Av. Nossa Senhora da Conceição",
     "Av. Franklin de Menezes",
     "Av. 16 de Novembro",
     "Rua Mário Corrêa",
     "Rua 16 de Novembro",
     "Passagem 25 de Junho"
    ]
   }
  ]
 },
 "883": {
  "nome": "OUTEIRO (ITAITEUA) - SÃO BRÁS",
  "terminal": "Terminal Maracacuera (Temporal) / Terminal São Brás (Temporal)",
  "sentidos": [
   {
    "label": "IDA: Outeiro (Itaiteua) - São Brás",
    "ruas": [
     "Estação Itaiteua",
     "Estrada Itaiteua",
     "Travessa Dr. Evandro Bonna",
     "Av. Franklin de Menezes",
     "Av. Nossa Senhora da Conceição",
     "Av. Paulo Costa",
     "Ramal do Outeiro",
     "Estrada do Outeiro",
     "Furo do Maguari",
     "Estrada do Outeiro",
     "Estrada da Ascenção",
     "Estrada Velha do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 8 de Setembro",
     "Av. Augusto Montenegro",
     "Integração Temporal no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Entroncamento",
     "Av. Almirante Barroso",
     "Av. José Malcher",
     "Praça da Leitura",
     "Integração Temporal no Terminal São Brás"
    ]
   },
   {
    "label": "VOLTA: São Brás - Outeiro (Itaiteua)",
    "ruas": [
     "Integração Temporal no Terminal de São Brás",
     "Av. Almirante Barroso",
     "Entroncamento",
     "Av. Augusto Montenegro",
     "Integração Temporal no Terminal Maracacuera",
     "Av. Augusto Montenegro",
     "Rua Dois de Dezembro",
     "Av. Doutor Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada Velha do Outeiro",
     "Estrada da Ascenção",
     "Furo do Maguari",
     "Ramal do Outeiro",
     "Av. Paulo Costa",
     "Av. Nossa Senhora da Conceição",
     "Rua Manoel Barata",
     "Travessa Dr. Evandro Bonna",
     "Estrada Itaiteua",
     "Estação Itaiteua"
    ]
   }
  ]
 },
 "884": {
  "nome": "ICOARACI - MARITUBA",
  "terminal": "Rua 02 de Dezembro com Rua Opala (Paracuri I).",
  "sentidos": [
   {
    "label": "ICOARACI - MARITUBA",
    "ruas": [
     "Rua L 01",
     "Travessa 02",
     "Rua 01",
     "Rua 8 de Maio",
     "Travessa Berredos",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada da Pirelli",
     "Rua A (Conjunto Nova Marituba)",
     "Avenida Principal do Conjunto Beija–Flor",
     "We 08",
     "Estrada da Pirelli"
    ]
   },
   {
    "label": "MARITUBA - ICOARACI",
    "ruas": [
     "We 08",
     "Avenida Principal do Conjunto Beija–Flor",
     "Rua A (Conjunto Nova Marituba)",
     "Estrada da Pirelli",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Berredos",
     "Rua 08 de Maio",
     "Rua L 01",
     "Travessa 02",
     "Rua L 01"
    ]
   }
  ]
 },
 "886": {
  "nome": "PARACURI I – VER-O-PESO (VIA SOLEDADE)",
  "terminal": "Rua 02 de Dezembro com Passagem Fé em Deus.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua 02 de Dezembro",
     "Travessa Soledade",
     "Rua 08 de Maio",
     "Travessa Berredos",
     "Rua Padre Júlio Maria",
     "Travessa Soledade",
     "Rodovia Arthur Bernardes",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Travessa Coronel Luiz Bentes",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua 15 de Agosto",
     "Travessa Berredos",
     "Rua 08 de Maio",
     "Travessa Soledade",
     "Rua 02 de Dezembro"
    ]
   }
  ]
 },
 "887": {
  "nome": "FÉ EM DEUS - SÃO BRÁS",
  "terminal": "Rua Vale Azul entre Alameda A e Alameda B. / Rua Vale Azul entre Alameda A e Alameda B",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "4ª Linha do Complexo Habitacional Fé em Deus",
     "Rua Marcolândia",
     "Passagem Fé Em Deus",
     "Avenida Augusto montenegro",
     "retorno após a Passagem das Flores",
     "Avenida Augusto montenegro",
     "acesso ao Complexo Viário do Entrocamento(pista em nivel)",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Rua da Praça Araújo Martins"
    ]
   },
   {
    "label": "CNETRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento (pista em nível)",
     "Passagem Fé em Deus",
     "Rua Marcolândia",
     "4ª Linha do Complexo Habitacional Fé em Deus"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Quarta linha do Complexo habitacional fé em deus",
     "Rua Marcolândia",
     "Passagem Fé em Deus",
     "Avenida Augusto Montenegro",
     "retorno após a Passagem das Flores",
     "Avenida Augusto Montenegro",
     "retorno após a Passagem das Flores",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "(pista em nível)",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré (pista direita)",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Rua Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento (pista em nível)",
     "Passagem Fé em Deus",
     "Rua Marcolândia",
     "quarta linha do Complexo habitacional fé em deus"
    ]
   }
  ]
 },
 "888": {
  "nome": "TERMINAL MARACACUERA - TERMINAL SÃO BRÁS",
  "terminal": "Terminal Maracacuera / Terminal Mangueirão / Estação Tavares Bastos / Terminal São Brás",
  "sentidos": [
   {
    "label": "IDA: Terminal Maracacuera - Terminal São Brás",
    "ruas": [
     "Integração Física no Terminal Maracacuera",
     "Av. Augusto Montenegro (canaleta)",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro (canaleta)",
     "Entroncamento",
     "Av. Almirante Barroso (canaleta)",
     "Integração Física na Estação Tavares Bastos",
     "Av. Governador José Malcher",
     "Praça da Leitura",
     "Integração Física no Terminal São Brás"
    ]
   },
   {
    "label": "VOLTA: Terminal São Brás - Terminal Maracacuera",
    "ruas": [
     "Integração Física no Terminal São Brás",
     "Av. Almirante Barroso (canaleta)",
     "Integração Física na Estação Tavares Bastos",
     "Av. Augusto Montenegro (canaleta)",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro (canaleta)",
     "Integração Física no Terminal Maracacuera"
    ]
   }
  ]
 },
 "889": {
  "nome": "ICOARACI - CENTRO (VIA CENTENÁRIO)",
  "terminal": "Rua 02 de Dezembro com Passagem Maguari.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua do cruzeiro",
     "Rua 02 de dezembro",
     "Rua do Cruzeiro",
     "Rua Coronel Juvêncio Sarmento",
     "Travessa Lopo de Castro",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Avenida Centenário da Assembléia de Deus",
     "Avenida Júlio César",
     "retorno semaforizado na Rua Florianopólis",
     "Avenida Júlio César",
     "acesso a via lindeira do Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Travessa Djalma Dutra",
     "Avenida Senador Lemos",
     "acesso ao elevado do Complexo Viário da Júlio César",
     "Avenida Júlio César",
     "Avenida Centenário da Assembléia de Deus",
     "Avenida Augusto Montenegro",
     "retorno em frente ao Residencial Natália Lins",
     "Avenida Augusto Montenegro",
     "Travessa São Roque",
     "Travessa 15 de Agosto",
     "Travessa do Cruzeiro",
     "Rua 02 de Dezembro",
     "Rua do Cruzeiro"
    ]
   }
  ]
 },
 "890": {
  "nome": "EDUARDO ANGELIM - MANGUEIRÃO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Eduardo Angelim - Mangueirão",
    "ruas": [
     "Rua 7 de Abril",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão"
    ]
   },
   {
    "label": "VOLTA: Mangueirão - Eduardo Angelim",
    "ruas": [
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro (sentido Icoaraci)",
     "Rua 7 de Abril"
    ]
   }
  ]
 },
 "891": {
  "nome": "EDUARDO ANGELIM – SÃO BRÁS (VIA PASSAGEM LIBERAL).",
  "terminal": "Avenida 17 de Abril (Rua Principal do Conjunto Eduardo Angelim) com Rua Rui Barata.",
  "sentidos": [
   {
    "label": "BAIRRO – SÃO BRÁS",
    "ruas": [
     "Avenida 17 de Abril (Rua Principal do Conjunto Eduardo Angelim)",
     "Passagem Liberal",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Rua da Praça Araújo Martins"
    ]
   },
   {
    "label": "SÃO BRÁS – BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "1º retorno após a Passagem Liberal",
     "Avenida Augusto Montenegro",
     "Passagem Liberal",
     "Avenida 17 de Abril (Rua Principal do Conjunto Eduardo Angelim)"
    ]
   }
  ]
 },
 "892": {
  "nome": "OUTEIRO / PRATINHA - PRAÇA SÃO CRISTÓVÃO",
  "terminal": "Estrada da Brasília com Passagem São Sebastião.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Brasília (BL 010)",
     "Travessa da Tranquilidade",
     "Avenida Nossa Conceição",
     "Rua Paulo Costa",
     "Estrada do Outeiro",
     "Estrada Velha do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua Padre Júlio Maria",
     "Travessa Soledade",
     "Rodovia Arthur Bernardes",
     "Avenida Pará",
     "Avenida Júlio César",
     "contorno na Praça São Cristóvão"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Júlio César",
     "Avenida Pará",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada Velha do Outeiro",
     "Estrada do Outeiro",
     "Rua Paulo Costa",
     "Avenida Nossa Conceição",
     "Travessa da Tranquilidade",
     "Estrada da Brasília"
    ]
   }
  ]
 },
 "893": {
  "nome": "OUTEIRO - CASTANHEIRA (VIA TAPANÃ)",
  "terminal": "Estrada da Brasília",
  "sentidos": [
   {
    "label": "OUTEIRO - CASTANHEIRA",
    "ruas": [
     "Estrada da Brasília",
     "Estrada BL 010",
     "Travessa da Tranqüilidade",
     "Avenida Nossa da Conceição",
     "Rua Paulo Costa",
     "Estrada do Outeiro",
     "Estrada Velha do Outeiro",
     "Rua Monsenhor José Maria Azevedo",
     "Rua 08 de Setembro",
     "Rodovia Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua 15 de Agosto",
     "Travessa Berredos",
     "Rua Manoel Barata",
     "Rodovia Arthur Bernardes",
     "Rodovia do Tapanã",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno próximo a empresa Itapemirim"
    ]
   },
   {
    "label": "Castanheira – Outeiro",
    "ruas": [
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Mário Covas",
     "acesso a rotatória",
     "Rodovia Mário Covas",
     "Avenida Augusto Montenegro",
     "Rodovia do Tapanã",
     "Rodovia Arthur Bernardes",
     "Rua Manoel Barata",
     "Travessa Berredos",
     "Rua 15 de Agosto",
     "Travessa Lopo de Castro",
     "Rua Monsenhor José Maria Azevedo",
     "Estrada Velha do Outeiro",
     "Estrada do Outeiro",
     "Rua Paulo Costa",
     "Avenida Nossa Senhora da Conceição",
     "Travessa da Tranqüilidade",
     "BL 010",
     "Estrada da Brasília"
    ]
   }
  ]
 },
 "900": {
  "nome": "CIDADE NOVA IV - VER-O-PESO",
  "terminal": "Avenida SN 03 próximo a Arterial 18.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 03"
    ]
   }
  ]
 },
 "901": {
  "nome": "CIDADE NOVA V - VER-O-PESO(A)",
  "terminal": "Travessa WE 31 entre SN 20 e Arterial 04. / Travessa WE 31 entre SN 20 e Arterial 04. / Travessa WE 31 entre SN 20 e Arterial 04.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa WE 31",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Travessa WE 32",
     "Avenida SN 20",
     "Travessa WE 31"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa WE 31",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso(pista lateral)",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Travessa WE 32",
     "Avenida SN 20",
     "Travessa WE 31"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa WE 31",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entrocamento",
     "Avenida Almirante Barroso",
     "Avenida govervandor José Malcher",
     "contorno da Praça araujo martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Almirante Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entrocamento",
     "Rodovia BR-216",
     "Rodovia do coqueiro",
     "Avenida 03 corações",
     "Avenida S/N 17",
     "Travessa WE 32"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Avenida SN 20",
     "Travessa WE 31"
    ]
   }
  ]
 },
 "902": {
  "nome": "CIDADE NOVA VI - PRESIDENTE VARGAS",
  "terminal": "Avenida SN 21 Próximo a Arterial 05",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 22",
     "Travessa WE 75",
     "Avenida SN 24",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Travessa WE 75",
     "Avenida SN 22",
     "Travessa WE 72",
     "Avenida SN 21"
    ]
   }
  ]
 },
 "903": {
  "nome": "PAAR - SÃO BRÁS",
  "terminal": "Rua São Pedro com Avenida Rio Baraúna (Conjunto Amapa/Roraima)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Travessa humaitá",
     "Avenida Rio Amazonas",
     "Estrada do Curuçámbá Leste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Avenida SN 24",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Leste",
     "Rua Rio Trombetas",
     "Travessa Humaitá"
    ]
   }
  ]
 },
 "904": {
  "nome": "CIDADE Nova VIII - PRESIDENTE VARGAS",
  "terminal": "Avenida SN 01 próximo a Arterial 18.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida SN 01",
     "Travessa WE 13",
     "Avenida SN 02",
     "Passagem da Providência",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Pass da Providência",
     "Avenida SN 02",
     "Travessa WE 16",
     "Avenida SN 01"
    ]
   }
  ]
 },
 "905": {
  "nome": "GUAJARÁ - SÃO BRÁS",
  "terminal": "Avenida Guajará I entre Travessa Guajará 6 e Travessa Itaboraí (Trevo do Cajuí).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Trevo do Cajuí",
     "Avenida Guajará I",
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 23",
     "Arterial 18",
     "Avenida SN 01",
     "Travessa WE 13",
     "Avenida SN 02",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR\u0002316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 02",
     "Travessa WE 16",
     "Avenida SN 01",
     "Arterial 18",
     "Avenida SN 23",
     "Travessa WE 72",
     "Avenida SN 21",
     "Avenida Guajará I",
     "Trevo do Cajuí"
    ]
   }
  ]
 },
 "906": {
  "nome": "GUAJARÁ - VER-O-PESO( VIA TRANSCOQUEIRO",
  "terminal": "Avenida SN 21 com a Travessa WE 54. / Avenida SN 21 com a Travessa WE 54. Guajará - Ver-O-Peso( Via Transcoqueiro)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Trevo do cajuí",
     "Avenida Guajará I",
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 22",
     "Travessa WE 75",
     "Avenida SN 24",
     "Arterial 18",
     "Rua do Conjunto Stélio Maroja",
     "Rodovia do 40 Horas",
     "Rodovia Transcoqueiro",
     "Avenida Augusto Montenegro",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Transcoqueiro",
     "Rodovia do 40 Horas",
     "Rua do Conjunto Stélio Maroja",
     "Arterial 18",
     "Avenida SN 24",
     "Travessa WE 75",
     "Avenida SN 22",
     "Travessa WE 72",
     "Avenida SN 21",
     "Avenida Guajará I",
     "trevo do cajuí"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Trevo do cajuí",
     "Avenida Guajará I",
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 22",
     "Travessa WE 75",
     "Avenida SN 24",
     "Avenida Dom Vicente Zico",
     "Rodovia do 40 horas",
     "Avenida Mario Covas",
     "Avenida Laércio Barbalho",
     "Avenida Independência",
     "Avenida Centenário",
     "da Assembléia de Deus",
     "Avenida Paulo Frota",
     "Avenida Júlio César",
     "rotorno na rotaótia do Aeroporto",
     "Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (Pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao elevado da Avenida Júlio César",
     "Avenida Julio César",
     "Avenida Paulo Frota",
     "Avenida Centenário da Assembléia de Deus",
     "Avenida Independência",
     "Avenida Mario Covas",
     "Rodovia do 40 Horas",
     "Avenida Dom Vicente Zico",
     "Avenida SN 24",
     "Travessa WE 75",
     "Avenida SN 22",
     "Travessa WE 72",
     "Avenida SN 21",
     "Avenida Guajará I",
     "trevo do cajuí"
    ]
   }
  ]
 },
 "907": {
  "nome": "PAAR - VER-O-PESO",
  "terminal": "Avenida Rio Solimões (em frente o Posto de Saúde do PAAR).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Rua do Conjunto Stélio Maroja",
     "Avenida Independência",
     "Rodovia Mário Covas",
     "Rodovia Transcoqueiro",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Transcoqueiro",
     "Rodovia MaRio Covas",
     "Avenida Independência",
     "Rua do Conjunto Stélio Maroja",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste",
     "Avenida Rio Solimões"
    ]
   }
  ]
 },
 "908": {
  "nome": "PAAR - CEASA",
  "terminal": "Rua São Pedro com Avenida Rio Baraúna (Conjunto Amapá / Roraima).",
  "sentidos": [
   {
    "label": "CURUÇÁMBÁ - CEASA",
    "ruas": [
     "Avenida Rio Baraúna",
     "Rua Boa Esperança",
     "Avenida Beira Rio",
     "Avenida Porto Grande",
     "Estrada do Curuçámbá Leste",
     "Avenida do Contorno",
     "Travessa Humaitá",
     "Avenida Rio Amazonas",
     "Estrada do Curuçámbá Leste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Rua SN-24",
     "Arterial 18",
     "Rua SN - 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Travessa Alferes Costa",
     "Avenida Senador Lemos",
     "Avenida Doutor Freitas",
     "Avenida Rômulo Maiorana",
     "Travessa Lomas Valentina",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Avenida Perimetral",
     "Estrada do Murucutum"
    ]
   },
   {
    "label": "CEASA - CURUÇAMBÁ",
    "ruas": [
     "Estrada da Murucutum",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "Contorno na Praça São Cristóvão",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Rua SN 17",
     "Arterial 18",
     "Rua SN 24",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Leste",
     "Avenida Rio Trombetas",
     "Travessa Humaitá",
     "Avenida do Contorno",
     "Estrada do Curuçámbá Leste",
     "Avenida Porto Grande",
     "Avenida Beira Rio",
     "Rua Boa Esperança",
     "Avenida Rio Baraúna"
    ]
   }
  ]
 },
 "910": {
  "nome": "MARITUBA – PÁTIO BELÉM PIRELLI/DECOUVILLE)",
  "terminal": "Travessa Vera Cruz com a Estrada da Pirelli.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Pirelli",
     "Travessa Vera Cruz",
     "Rua Decouville",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento (usar preferencialmente a 1º faixa da pista do túnel- faixa direita)",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Decouville",
     "Travessa Vera Cruz",
     "Estrada da Pirelli"
    ]
   }
  ]
 },
 "911": {
  "nome": "ICUÍ - VER O PESO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Icuí - Ver o Peso",
    "ruas": [
     "Estrada do Guajará",
     "Rua Jovelina Carneiro",
     "Rua Santa Fé",
     "Estrada do Comper",
     "Rua Domingo",
     "Rua Paulo Assunção",
     "Estrada Icuí Guajará",
     "Av. Arterial 5A",
     "Rodovia dos Trabalhadores",
     "Transcoqueiro",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Av. Pedro Álvares Cabral",
     "Av. Visconde de Souza Franco",
     "Av. Marechal Hermes",
     "Av. Boulevard Castilho França"
    ]
   },
   {
    "label": "VOLTA: Ver o Peso - Icuí",
    "ruas": [
     "Av. Boulevard Castilho França",
     "Av. Portugal",
     "Av. 16 de Novembro",
     "Av. Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av. Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Av. Visconde de Souza Franco",
     "Av. Pedro Álvares Cabral",
     "Travessa Coronel Luiz Bentes",
     "Av. Senador Lemos",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Transcoqueiro",
     "Av. Gov. Hélio da Mota Gueiros",
     "Rodovia dos Trabalhadores",
     "Estrada do Icuí Guajará",
     "Rua Paulo Assunção",
     "Rua Santa Fé",
     "Rua Jovelina Carneiro"
    ]
   }
  ]
 },
 "912": {
  "nome": "CASTANHEIRA - PÁTIO BELÉM (SELETIVA)",
  "terminal": "Em frente ao Shopping Castanheira",
  "sentidos": [
   {
    "label": "CASTANHEIRA - PATIO BELÉM",
    "ruas": [
     "Avenida João Paulo II",
     "Rua Euclides da Cunha",
     "Rodovia BR-316",
     "retorno em frente a empresa Itapemirim",
     "Rodovia BR-316",
     "acesso a pista do túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Generalíssimo Deodoro",
     "Avenida Comandante Brás de Aguiar",
     "Avenida Serzedelo Corrêa",
     "Rua dos Pariquis",
     "Travessa Padre Eutíquio",
     "Rua João Diogo",
     "Rua Coronel Fontoura",
     "Travessa Félix Roque",
     "Rua Tomázia Perdigão",
     "Rua Padre Champagnat"
    ]
   },
   {
    "label": "PATIO BELÉM - CASTANHEIRA",
    "ruas": [
     "Avenida Portugal",
     "Rua 13 de Maio",
     "Avenida Presidente Vargas",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Euclides da Cunha",
     "Avenida João Paulo II"
    ]
   }
  ]
 },
 "913": {
  "nome": "MARITUBA – SÃO BRÁS (SANTA LÚCIA)",
  "terminal": "Rua Alfredo Calado com Rua Sandro Gilberto (bairro Santa Lúcia)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Alfredo Calado",
     "Rodovia BR-316",
     "pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso a rotatória",
     "Rodovia BR-316",
     "Rua Alfredo Calado"
    ]
   }
  ]
 },
 "914": {
  "nome": "MARITUBA - UFPA",
  "terminal": "Rodovia BR-316 com Rua Cerâmica (Rua Decouville).",
  "sentidos": [
   {
    "label": "Marituba - UFPA",
    "ruas": [
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Rua dos Caripunas",
     "Avenida José Bonifácio",
     "Avenida Bernardo Sayão",
     "Rua Augusto Corrêa",
     "Avenida Perimetral",
     "Terminal da UFPA"
    ]
   },
   {
    "label": "UFPA - Marituba",
    "ruas": [
     "Avenida Perimetral",
     "Rua Augusto Corrêa",
     "Avenida Bernardo Sayão",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316"
    ]
   }
  ]
 },
 "915": {
  "nome": "ÁGUAS LINDAS - PÁTIO BELÉM",
  "terminal": "Rua Osvaldo Orlando Costa (Osvaldão) com Rua Giocondo Dias.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Osvaldo Orlando Costa (Osvaldão)",
     "Rua Osvaldo Cruz",
     "Rodovia BR-316",
     "acesso a pista do túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Osvaldo Cruz",
     "Rua Osvaldo Orlando Costa (Osvaldão)",
     "Rua Osvaldo cruz"
    ]
   }
  ]
 },
 "916": {
  "nome": "ÁGUAS LINDAS - VER-O-PESO",
  "terminal": "Rua Osvaldo Cruz esquina com Rua da Caixa D’Água",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Osvaldo Cruz",
     "(a partir do Conjunto Verdejantes IV)",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Inácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Osvaldo Cruz",
     "Avenida osvaldo orlando Costa(Rua osvaldão) retorno na rui Barata",
     "Avenida Osvaldo orlando Costa(Rua osvaldão)",
     "Rua Osvaldo cruz"
    ]
   }
  ]
 },
 "917": {
  "nome": "DISTRITO INDUSTRIAL - VER-O-PESO",
  "terminal": "Avenida Zacarias de Assunção próximo a Rua Rio de Janeiro",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Zacarias de Assunção",
     "Rodovia BR\u0002316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida Zacarias de Assun"
    ]
   }
  ]
 },
 "918": {
  "nome": "MARITUBA – VER-O-PESO (PIRELLI)",
  "terminal": "Estrada da Pirelli. / Estrada da Pirelli.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Pirelli",
     "Rua C",
     "Avenida Principal do Conjunto Beija – Flor",
     "Rua W 01",
     "Estrada da Pirelli",
     "Rodovia. BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada da Pirelli",
     "Rua W 01",
     "Avenida Principal do Conjunto Beija – Flor",
     "Rua C",
     "Estrada da Pirelli"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada da Pirelli",
     "Travessa WE-17",
     "Avenida Principal do Conjunto Beijar Flor",
     "Rua W-01",
     "Estrada da Pirelli",
     "Rua Vera Cruz",
     "Rua Decouville",
     "Passagem Brito",
     "SN-13",
     "Avenida Central (Marituba I)",
     "Rua Alfredo Calado",
     "Rodovia BR-316",
     "Rotorno na Rodovia BR-316 (IESP)",
     "Rodovia BR-316",
     "Acessi a Rotatória do complexo Viário do Entrocamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilho França",
     "Avenida Portugal",
     "RUa Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR\u0002316",
     "Rua Alfredo Calado",
     "SN-13",
     "Passagem Brito",
     "Rua Decouville",
     "Rua Vera Cruz",
     "Estrada da Pirelli",
     "Rua W-01",
     "Avenida Principal do Conjunto Beija Flor",
     "Travessa WE-17",
     "Estrada da Pirelli"
    ]
   }
  ]
 },
 "919": {
  "nome": "CURUÇÁMBÁ- CENTRO",
  "terminal": "Estrada do Curuçámbá Leste.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Curuçámbá Leste",
     "Estrada do Maguari",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada do Maguari",
     "Estrada do Curuçámbá Leste"
    ]
   }
  ]
 },
 "920": {
  "nome": "CURUÇAMBÁ VER-O-PESO",
  "terminal": null,
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Vasquinho",
     "Estrada do Curuçámbá Leste",
     "Rua São Pedro",
     "Avenida Beira - Rio",
     "Avenida Porto Grande",
     "Estrada do Curuçámbá Leste",
     "Estrada do Maguari",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada do Maguari",
     "Estrada do Curuçámbá Leste",
     "Avenida Porto Grande",
     "Avenida Beira Rio",
     "Rua São Pedro",
     "Estrada do Curuçámbá Leste",
     "Estrada do Vasquinho"
    ]
   }
  ]
 },
 "921": {
  "nome": "UNAMA BR-316 – PRESIDENTE VARGAS",
  "terminal": "Rua da Pedreirinha próximo a Passagem Rádio Clube (Conjunto Canindé).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Pedreirinha",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Pedreirinha"
    ]
   }
  ]
 },
 "922": {
  "nome": "ÁGUAS LINDAS – PRESIDENTE VARGAS",
  "terminal": "Rua Osvaldo Cruz esquina com Rua da Caixa D`Agua. ITINERÁRIO B: / Rua Osvaldo Orlando Costa (Osvaldão) com Rua Giocondo Dias",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Osvaldo Cruz (a partir do Conjunto Verdejante IV)",
     "Rodovia BR-316",
     "acesso a pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Marechal Hermes (pista esquerda a partir da Praça, Magalhães)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Osvaldo Cruz"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Osvaldo Orlando Costa (Osvaldão)",
     "Rua Osvaldo Cruz",
     "Rodovia BR-316",
     "acesso a pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Marechal Hermes (pista esquerda a partir da Praça, Magalhães)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Osvaldo Cruz",
     "Rua Osvaldo Orlando Costa (Osvaldão)"
    ]
   }
  ]
 },
 "923": {
  "nome": "FLORESTA PARK – VER-O-PESO",
  "terminal": "Rua dos Ipês (Floresta Park)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida castanheiras",
     "Avenida ipês",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua ignacio Guilhon Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Av",
     "Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Tavares Bastos",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno em frente ao Hospital Anita Gerosa",
     "Rodovia. BR-316",
     "Rua Castanheira",
     "Rua dos Ipês"
    ]
   }
  ]
 },
 "924": {
  "nome": "Doutor ALMIR GABRIEL - Presidente VARGAS",
  "terminal": "Avenida João Batista com Rua Nestor Guimarães (bairro Doutor Almir Gabriel). ITINERÁRIO B: / Rodovia BR-316 Km-18, Rua Jesus Salvador (em frente ao Portal do Residencial Pastor José Arimateia/ antiga Vila Canaã)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida João Batista",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Primeiro de"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Castilhos França",
     "Avenida Presidente Vargas",
     "Contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida João Batista"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Jesus Salvador (Rua Principal do Residencial Pastor José Arimateia)",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Primeiro de Março"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas",
     "contorno na Praça da República",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Avenida Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Jesus Salvador (Rua Principal do Residencial Pastor José Arimateia)"
    ]
   }
  ]
 },
 "925": {
  "nome": "Doutor ALMIR GABRIEL - VER-O-PESO",
  "terminal": "Avenida João Batista com Rua Nestor Guimarães (bairro Doutor Almir Gabriel). ITINERÁRIO B: / Rodovia BR-316 Km-18, Rua Jesus Salvador (em frente ao Portal do Residencial Pastor José Arimateia/ antiga",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida João Batista",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento (usar preferencialmente a faixa da direita)",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida João Batista"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua Jesus Salvador (Rua Principal do Residencial Pastor José de Arimateia (Antiga Vila Canaã), acesso ao Túnel do Complexo Viário do Entroncamento (usar preferencialmente a faixa da direita), Avenida Almirante Barroso, Avenida Governador José Malcher, Avenida Visconde de Souza Franco, Avenida Marechal Hermes, Avenida Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Jesus Salvador (Rua Principal do Residencial Pastor José de Arimateia (Antiga Vila Canaã)"
    ]
   }
  ]
 },
 "926": {
  "nome": "DOUTOR ALMIR GABRIEL – PÁTIO BELÉM",
  "terminal": "Avenida João Batista com Nestor Guimarães (bairro Doutor Almir Gabriel).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida João Batista",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida João Batista"
    ]
   }
  ]
 },
 "930": {
  "nome": "ICUÍ - PRESIDENTE VARGAS",
  "terminal": "Rua Jovelino Carneiro (próximo a Arterial 05).",
  "sentidos": [
   {
    "label": "Bairro – Centro",
    "ruas": [
     "Rua Jovelino Carneiro",
     "Estrada Santa Fé",
     "Estrada do Icuí",
     "Estrada Santa Maria do Icuí",
     "Arterial 05",
     "Travessa SN 24",
     "Arterial 18",
     "Travessa SN 03",
     "Rua da Providência",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "AvenidaMarechal Hermes",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Travessa SN 17",
     "Arterial 18",
     "Travessa SN 24",
     "Arterial 05",
     "Estrada Santa Maria do Icuí",
     "Estrada do Icuí",
     "Estrada Santa Fé",
     "Rua Jovelino Carneiro"
    ]
   }
  ]
 },
 "932": {
  "nome": "CIDADE Nova - UNAMA ALCINDO CACELA",
  "terminal": "Avenida Curuçámbá Oeste entre Avenida Independência e Avenida Rio Amazonas. 935 MARITUBA – PÁTIO BELÉM (CERÂMICA) / Final da Rua da Cerâmica. 936 MARITUBA – PÁTIO BELÉM (COLÔNIA) / Avenida João Paulo II (Praça Jarbas Passarinho).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do cucuçamba oeste",
     "Arterial 5-A",
     "Avenida SN 21",
     "Travessa WE 72",
     "Avenida SN 23",
     "Arterial 18",
     "Avenida SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Lomas Valentinas",
     "Avenida Pedro Miranda",
     "Rua Ferreira Pena",
     "Rua Curuçá",
     "Rua Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Avenida Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Travessa Angustura",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 23",
     "Travessa WE 72",
     "Avenida SN 21",
     "Avenida arterial 5-B",
     "Avenida do Contorno",
     "Estrada do Curuçámba oeste"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Cerâmica",
     "Rua do Fio",
     "Avenida João Paulo II",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Retorno em frente ao IESP",
     "Rodovia BR-316",
     "Avenida João Paulo II",
     "Rua do Fio",
     "Rua da Cerâmica"
    ]
   },
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida João Paulo II",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento(usar preferencialmente a 1º faixa a direita)",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Retorno em frente ao IESP",
     "Rodovia BR-316",
     "Avenida João Paulo II"
    ]
   }
  ]
 },
 "937": {
  "nome": "MARITUBA – VER-O-PESO (CERÂMICA)",
  "terminal": "Final da Rua da Cerâmica.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Cerâmica",
     "Rua do Fio",
     "Avenida João Paulo II",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes(pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Rodovia BR-316",
     "Avenida João Paulo II",
     "Rua do Fio",
     "Rua da Cerâmica"
    ]
   }
  ]
 },
 "938": {
  "nome": "MARITUBA - DOCA (CERÂMICA)",
  "terminal": "Final da Rua da Cerâmica.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua da Cerâmica",
     "Rua Bom Jesus",
     "Rua São Francisco",
     "Rua da Cerâmica",
     "Rua do Fio",
     "Avenida João Paulo II",
     "Rodovia BR-316",
     "acesso a pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Visconde de Souza Franco",
     "Rua Boaventura da Silva",
     "Avenida Generalíssimo Deodoro",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida João Paulo II",
     "Rua do Fio",
     "Rua da Cerâmica",
     "Rua São Francisco",
     "Rua Bom Jesus",
     "Rua da Cerâmica"
    ]
   }
  ]
 },
 "939": {
  "nome": "MARITUBA – PÁTIO BELÉM (Mário Couto)",
  "terminal": "Avenida Central (Marituba I)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Central (Marituba I)",
     "Rua Alfredo Calado",
     "Rodovia BR-316",
     "retorno na Rodovia BR-316 (IESP)",
     "Rodovia BR-316",
     "pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua Alfredo Calado",
     "Avenida Central (Marituba I)"
    ]
   }
  ]
 },
 "940": {
  "nome": "PEDREIRA - LOMAS (BR-316)",
  "terminal": "Rodovia BR-316 – Km 04 – em frente ao Estacionamento do Supermercado Guanabara (próximo a Passagem das Flores).",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia BR – 316",
     "retorno no Viaduto da BR-316",
     "Rodovia BR – 316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Lomas Valentinas",
     "Avenida Pedro Miranda",
     "Travessa Ferreira Pena",
     "Rua Curuçá",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Rua 28 de Setembro",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Rua Padre Champagnat",
     "Rua Doutor Assis",
     "Avenida Almirante Tamandaré",
     "Rua do Arsenal",
     "Avenida Bernardo Sayão",
     "Rua Cesário Alvim",
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Tamoios",
     "Travessa Padre Eutíquio",
     "Rua Gama Abreu (Contorno da Praça da República)",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Boaventura da Silva",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Dom Pedro I",
     "Rua Bernal do Couto",
     "Avenida Pedro Miranda",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Travessa Angustura",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR – 316"
    ]
   }
  ]
 },
 "941": {
  "nome": "MARITUBA – VER-O-PESO (ALÇA VIÁRIA)",
  "terminal": "ALÇA Viária (início)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Alça Viária",
     "retorno em frente à Premazon",
     "Alça Viária",
     "Rodovia BR-316",
     "retorno em frente a Praça Matriz de Marituba",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Portugal",
     "Rua Ignácio Guilhon",
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso ao Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR\u0002316",
     "Rua São João",
     "Rua Tupinambá",
     "Rua Cedro",
     "Rua Mogno",
     "Alça Viária",
     "retorno em frente à Premazon",
     "Alça Viária"
    ]
   }
  ]
 },
 "942": {
  "nome": "MARITUBA - ICOARACI",
  "terminal": "Estrada da Pirelli (Conjunto Beija-Flor).",
  "sentidos": [
   {
    "label": "MARITUBA - ICOARACI",
    "ruas": [
     "Avenida Principal do Conjunto Beija–Flor",
     "Rua WE 01",
     "Estrada da Pirelli",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rua 02 de Dezembro",
     "Travessa São Roque",
     "Rua 15 de Agosto",
     "Travessa Berredos"
    ]
   },
   {
    "label": "ICOARACI - MARITUBA",
    "ruas": [
     "Rua 08 de Maio",
     "Avenida Augusto Montenegro",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada da Pirelli",
     "Rua WE 01",
     "Avenida Principal do Conjunto Beija-Flor"
    ]
   }
  ]
 },
 "960": {
  "nome": "JADERLÂNDIA - MANGUEIRÃO",
  "terminal": "Terminal Mangueirão / Estação Jaderlândia",
  "sentidos": [
   {
    "label": "IDA: Jaderlândia - Mangueirão",
    "ruas": [
     "Estação Jaderlândia",
     "Passagem Snapp",
     "Alameda União",
     "Passagem Jarbas Passarinho",
     "Vila Jarbas Passarinho",
     "Transcoqueiro",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão"
    ]
   },
   {
    "label": "VOLTA: Mangueirão - Jaderlândia",
    "ruas": [
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Retorno antes da Estação Marinha",
     "Av. Augusto Montenegro",
     "Transcoqueiro",
     "Passagem Jarbas Passarinho",
     "Alameda União",
     "Passagem Snapp",
     "Estação Jaderlândia"
    ]
   }
  ]
 },
 "962": {
  "nome": "JADERLÂNDIA - PRESIDENTE VARGAS",
  "terminal": "Rua SNAPP com Rua União (Jaderlândia)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua União",
     "Rua São Benedito",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França (Estação Waldemar Henrique)",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "retorno no viaduto",
     "Rodovia BR-316",
     "Rua São Benedito",
     "Rua União"
    ]
   }
  ]
 },
 "964": {
  "nome": "JADERLÂNDIA - VER-O-PESO",
  "terminal": "Rua SNAPP com Rua União (Jaderlândia)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua União",
     "Passagem Jarbas Passarinho",
     "Rodovia Transcoqueiro",
     "Rodovia Mário Covas",
     "Estação Coqueiro",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Complexo Viário do Entroncamento",
     "BR-316 Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Travessa Benjamin Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Avenida Pedro Álvares Cabral",
     "Rodovia Arthur Bernardes",
     "Rua Coronel Luiz Bentes",
     "Avenida Senador Lemos",
     "acesso a Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Passagem Jarbas Passarinho",
     "Rua São Benedito",
     "Rua União"
    ]
   }
  ]
 },
 "970": {
  "nome": "MOSQUEIRO - SÃO BRÁS",
  "terminal": "Avenida Almirante Barroso (sentido Avenida Governador José Malcher / Avenida José Bonifácio) entre Avenida Governador José Malcher e Travessa da Praça Araújo Martins. ITINERÁRIO C: (Baia do Sol)",
  "sentidos": [
   {
    "label": "MOSQUEIRO - SÃO BRÁS",
    "ruas": [
     "Travessa Pratiquara",
     "Rua Francisco Xavier Cardoso (6ª Rua)",
     "Rua Siqueira Mendes",
     "Rua Nossa Senhora do Ò",
     "Travessa Pratiquara",
     "Rua 15 de Novembro",
     "Avenida 16 de Novembro",
     "Avenida Beira-Mar (Chapéu Virado, Porto Arthur, Murubira, Ariramba, São Francisco, Carananduba)",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento Avenida Almirante Barroso"
    ]
   },
   {
    "label": "SÃO BRÁS -MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rodovia BR-316",
     "Rodovia PA-391",
     "Rodovia BL 19",
     "Avenida Beira-Mar (Carananduba, São Francisco, Ariramba, Murubira, Porto Arthur, Chapéu Virado)",
     "Avenida 16 de Novembro",
     "Travessa Coronel Luiz Mota",
     "Avenida Beira-Mar",
     "Rua Nossa Senhora do Ó",
     "Travessa Pratiquara",
     "Rua Coronel José do Ò",
     "Rua Siqueira Mendes",
     "Rua Veiga Cabral (7ª Rua)",
     "Travessa Pratiquara. Terminal / ITINERÁRIO A: Travessa Pratiquara entre Rua Veiga Cabral (7ª Rua) e Rua Francisco Xavier Cardoso (6ª Rua) ITINERÁRIO B (SÃO BRÁS)"
    ]
   },
   {
    "label": "SÃO BRÁS - MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-391",
     "Rodovia BL 19",
     "Avenida Beira-Mar (Carananduba, São Francisco, Ariramba, Murubira, Porto Arthur, Chapéu Virado)",
     "Avenida 16 de Novembro",
     "Travessa Coronel Luiz Mota",
     "Avenida Beira-Mar",
     "Rua Nossa Senhora do Ó",
     "Travessa Pratiquara",
     "Rua Coronel José do Ò",
     "Rua Siqueira Mendes",
     "Rua Veiga Cabral (7ª Rua)",
     "Travessa Pratiquara"
    ]
   },
   {
    "label": "MOSQUEIRO - SÃO BRÁS",
    "ruas": [
     "Travessa Pratiquara",
     "Rua Francisco Xavier Cardoso (6ª Rua)",
     "Rua Siqueira Mendes",
     "Rua Nossa Senhora do Ò",
     "Travessa Pratiquara",
     "Rua 15 de Novembro",
     "Avenida 16 de Novembro",
     "Avenida Beira-Mar (Chapéu Virado, Porto Arthur, Murubira, Ariramba, São Francisco, Carananduba)",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso"
    ]
   },
   {
    "label": "MOSQUEIRO - SÃO BRÁS",
    "ruas": [
     "Estrada da Fazendinha",
     "Avenida Beira-Mar da Baia do Sol",
     "Estrada da Baia do Sol",
     "Rodovia BL 13",
     "Rua Lallor Mota",
     "Avenida Barão do Rio Branco",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento Avenida Almirante Barroso"
    ]
   },
   {
    "label": "SÃO BRÁS - MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-391",
     "Rodovia BL 19",
     "Avenida Beira-Mar (Carananduba, São Francisco, Ariramba, Murubira, Porto Arthur, Chapéu Virado)",
     "Avenida 16 de Novembro",
     "Travessa Coronel Luiz Mota",
     "Avenida Beira-Mar",
     "Rua Nossa Senhora do Ó",
     "Travessa Pratiquara",
     "Rua Coronel José do Ò",
     "Rua Siqueira Mendes",
     "Rua Veiga Cabral (7ª Rua)",
     "Travessa Pratiquara. Terminal / ITINERÁRIO C: Estrada da Fazendinha (Baia do Sol) ITINERÁRIO Dom (Rua Santana do Paraíso)"
    ]
   },
   {
    "label": "MOSQUEIRO - SÃO BRÁS",
    "ruas": [
     "Rua Santana",
     "do Paraíso",
     "Estrada do Paraiso",
     "Estrada do Marahu",
     "retorno na Praia do Marahu",
     "Estrada do Caruara",
     "Rua Lallor Mota",
     "Avenida Barão do Rio Branco",
     "Estrada do carananduba",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso"
    ]
   },
   {
    "label": "SÃO BRÁS - MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-391",
     "Rodovia BL 19",
     "Avenida Beira\u0002Mar (Carananduba, São Francisco, Ariramba, Murubira, Porto Arthur, Chapéu Virado)",
     "Avenida 16 de Novembro",
     "Travessa Coronel Luiz Mota",
     "Avenida Beira-Mar",
     "Rua Nossa Senhora do Ó",
     "Travessa Pratiquara",
     "Rua Coronel José do Ò",
     "Rua Siqueira Mendes",
     "Rua Veiga Cabral (7ª Rua)",
     "Travessa Pratiquara Terminal / ITINERÁRIO D: Rua Santana do Paraíso (Paraíso) ITINERÁRIO E (Sucurijuquara)"
    ]
   },
   {
    "label": "Mosqueiro - SÃO BRÁS",
    "ruas": [
     "estrada da Baia do Sol",
     "Rodovia BL 13",
     "Rua lallor Mota",
     "Avenida Barão do Rio Branco",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-3016",
     "acesso ao Tunél do Complexo Viário do Entrocamento",
     "Avenida Almirante Barroso"
    ]
   },
   {
    "label": "SÃO BRÁS - MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA\u0002391",
     "Rodovia BL 19",
     "Avenida Beira-Mar (Carananduba, São Francisco, Ariramba, Murubira, Porto Arthur, Chapéu Virado)",
     "Avenida 16 de Novembro",
     "Travessa Coronel Luiz Mota",
     "Avenida Beira-Mar",
     "Rua Nossa Senhora do Ó",
     "Travessa Pratiquara",
     "Rua Coronel José do Ò",
     "Rua Siqueira Mendes",
     "Rua Veiga Cabral (7ª Rua)",
     "Travessa Pratiquara. Terminal / ITINERÁRIO E: Avenida Beira Mar (Porto Arthur) ITINERÁRIO F (SÃO BRÁS - Baia do Sol)"
    ]
   },
   {
    "label": "SÃO BRÁS - MOSQUEIRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-391",
     "Rodovia BL 19",
     "Avenida Barão do Rio Branco",
     "Rua Lallor Mota",
     "Rodovia BL 13",
     "Estrada da Baia do Sol",
     "Estrada da Fazendinha"
    ]
   },
   {
    "label": "MOSQUEIRO - SÃO BRÁS",
    "ruas": [
     "Estrada da Fazendinha",
     "Avenida Beira Mar da Baia do Sol",
     "Estrada da Baia do Sol",
     "Rodovia BL 13",
     "Rua Lallor Mota",
     "Avenida Barão do Rio Branco",
     "Rodovia BL 19",
     "Rodovia PA-391",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento Avenida Almirante Barroso. Terminal / ITINERÁRIO B e F: Avenida Almirante Barroso (sentido Avenida Governador José Malcher / Avenida José Bonifácio) entre Avenida Governador José Malcher e Travessa da Praça Araújo Martins"
    ]
   }
  ]
 },
 "973": {
  "nome": "SANTA BÁRBARA - Presidente VARGAS",
  "terminal": null,
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia PA-391",
     "Rodovia BR\u0002316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Avenida Visconde de Inhaúma",
     "Avenida Doutor Freitas",
     "Avenida Duque de Caxias",
     "Rua Antônio Barreto",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Duque de Caxias",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-391"
    ]
   }
  ]
 },
 "975": {
  "nome": "BENEVIDES – SÃO BRÁS",
  "terminal": "Avenida Joaquim Pereira de Queiroz.",
  "sentidos": [
   {
    "label": "BENEVIDES – SÃO BRÁS",
    "ruas": [
     "Avenida Joaquim Pereira de Queiroz",
     "Avenida Nações Unidas",
     "Travessa Hortência",
     "Avenida Miranda Mateus",
     "Avenida Joaquim Pereira de Queiroz",
     "PA-404",
     "Rodovia BR-316",
     "Pista do túnel do Complexo Viário do Entrocamento",
     "Avenida Almirante Barroso (Caneleta BRT - EXPRESSO)",
     "Avenida Governador José Bonifácio",
     "Avenida Governador José Malcher",
     "Travessa Castelo Branco. Sentido SÃO BRÁS - BENEVIDES Avenida Magalhães Barata",
     "Avenida Almirante Barroso (Caneleta BRT - EXPRESSO)",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia PA-404",
     "Avenida Joaquim Pereira de Queiroz",
     "Avenida Miranda Mateus",
     "Travessa Hortência",
     "Avenida Nações Unidas",
     "Avenida Joaquim Pereira de Queiroz"
    ]
   }
  ]
 },
 "976": {
  "nome": "BENEVIDES - PRESIDENTE VARGAS",
  "terminal": "Avenida Joaquim Pereira de Queiroz (Benevides)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Joaquim Pereira de Queiroz",
     "Rua das Nações Unidas",
     "Rua das Hortência",
     "Avenida Miranda Mateus",
     "Avenida Joaquim Pereira de Queiroz",
     "Rodovia PA-404",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Pedro Álvares Cabral",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França.0"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida presidente vargas Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Avenida José Bonifácio",
     "Avenida Duque de Caxias",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso",
     "acesso ao Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida Visconde de Maracaju",
     "Avenida Joaquim Pereira de Queiroz",
     "Avenida Miranda Mateus",
     "Travessa Hortência",
     "Avenida Nações Unidas",
     "Avenida Joaquim Pereira de Queiroz"
    ]
   }
  ]
 },
 "977": {
  "nome": "SANTA BÁRBARA – SÃO BRÁS",
  "terminal": null,
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia PA-391",
     "Rodovia BR\u0002316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Contorno na Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR\u0002316",
     "Rodovia PA-391"
    ]
   }
  ]
 },
 "980": {
  "nome": "ANANINDEUA – Presidente VARGAS (ÁGUAS BRANCAS)",
  "terminal": "Rua 02 de Junho (próximo a Rua A)",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rua 02 de Junho",
     "Rodovia BR-316",
     "acesso a pista do túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso a rotatória",
     "Rodovia BR\u0002316",
     "Rua 02 de Junho"
    ]
   }
  ]
 },
 "984": {
  "nome": "RIO 40 HORAS – PRESIDENTE VARGAS",
  "terminal": "Estrada do 40 Horas em frente a Madeireira Cirez",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia 40 Horas",
     "Avenida Independência",
     "Rua Benjamim",
     "Rodovia Transcoqueiro",
     "Rodovia Augusto Montenegro",
     "Acesso a Rotatória do Complexo Viário do Entrocamento",
     "Avenida Pedro Álvares Cabral",
     "Travessa Djalma Dutra",
     "Rua Municipalidade",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Presidente Vargas",
     "contorno na Praça da República. Assis de Vasconcelos",
     "Rua Gaspar Viana",
     "Avenida Visconde de Souza Franco",
     "Rua Cônego Jerônimo Pimentel",
     "Travessa Soares Carneiro",
     "Avenida Senador Lemos",
     "Acesso a Rotatória do Complexo Viário da Júlio César",
     "Avenida Pedro Álvares Cabral",
     "acesso ao Complexo Viário do Entroncamento",
     "Avenida Augusto Montenegro",
     "Rodovia Transcoqueiro",
     "Rua Benjamim",
     "Avenida Independência",
     "Rodovia 40 Horas"
    ]
   }
  ]
 },
 "985": {
  "nome": "RIO 40 HORAS – VER-O-PESO",
  "terminal": "Estrada do 40 Horas em frente a Madeireira Cirez",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia do 40 Horas",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "Acesso a pista do Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "Rodovia BR- 316",
     "Rodovia Mário Covas",
     "Rodovia do 40 Horas"
    ]
   }
  ]
 },
 "986": {
  "nome": "JIBÓIA BRANCA - VER-O-PESO",
  "terminal": "Avenida Independência com Rua União.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Brasil",
     "Avenida Independência",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida José Bonifácio",
     "Avenida Governador José Malcher",
     "Avenida Assis de Vasconcelos",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Boulevard Castilhos França",
     "Avenida Portugal",
     "Rua Ignácio Guilhon"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Almirante Tamandaré",
     "Rua Gama Abreu",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida independencia",
     "Avenida Brasil"
    ]
   }
  ]
 },
 "987": {
  "nome": "Rio 40 HORAS - SÃO BRÁS",
  "terminal": "Estrada do 40 Horas em frente a Madeireira Cirez",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Rodovia do 40 Horas",
     "Rua São Luís",
     "Rua do Jiboia Branca",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante. Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Rodovia do 40 horas"
    ]
   }
  ]
 },
 "988": {
  "nome": "ANANINDEUA - Presidente VARGAS (AURÁ)",
  "terminal": "Estrada do Aurá.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Aurá",
     "Rodovia BR-316",
     "retorno em frente ao Hospital Anita Gerosa",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista lateral direita)",
     "Avenida Marechal Hermes(pista lateral direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada do Aurá"
    ]
   }
  ]
 },
 "990": {
  "nome": "DISTRITO INDUSTRIAL - PÁTIO BELÉM",
  "terminal": "Estrada do Mocajatuba próximo a Rua Rio de Janeiro.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do mocajatuba",
     "passa.bom sossego",
     "Rua claudio saunders",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO- BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua claudio saunders",
     "Passagem Bom sossego",
     "estrada do mocajatuba"
    ]
   }
  ]
 },
 "991": {
  "nome": "DISTRITO INDUSTRIAL-SÃO BRAZ",
  "terminal": "Avenida Zacarias de Assunção próximo a Rua do Rio de Janeiro..",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Avenida Zacarias de Assunção",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Travessa da Praça Araújo Martins"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Avenida Zacarias de Assunção"
    ]
   }
  ]
 },
 "992": {
  "nome": "JÚLIA SEFFER – PRESIDENTE VARGAS",
  "terminal": "Rua Coletora Leste esquina com Rua 07.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Coletora Leste",
     "Rua 17",
     "Coletora Oeste",
     "Rua 07",
     "Rua da COHASPA",
     "Rodovia BR-316",
     "Retorno em frente a sede da A.A.B.B",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes (pista direita)",
     "Travessa Piedade",
     "Avenida Boulevard Castilhos França",
     "Estação Waldemar Henrique",
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Serzedelo Corrêa",
     "Avenida Gentil Bittencourt",
     "Travessa Quintino Bocaiúva",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rua da COHASPA",
     "Rua 07",
     "Coletora Oeste",
     "Rua 17",
     "Coletora Leste"
    ]
   }
  ]
 },
 "993": {
  "nome": "JÚLIA SEFFER – PÁTIO BELÉM",
  "terminal": "Rua Coletora Leste esquina com Rua 07.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Coletora Leste",
     "Rua 17",
     "Coletora Oeste",
     "Rua 07.",
     "Rua da COHASPA",
     "Rodovia BR-316",
     "Retorno em frente a sede da A.A.B.B",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR\u0002316",
     "Rua da COHASPA",
     ". Rua 07",
     "Coletora Oeste",
     "Rua 17",
     "Coletora Leste"
    ]
   }
  ]
 },
 "996": {
  "nome": "ÁGUAS LINDAS - MANGUEIRÃO",
  "terminal": "Terminal Mangueirão",
  "sentidos": [
   {
    "label": "IDA: Águas Lindas - Mangueirão",
    "ruas": [
     "Rua Osvaldo Cruz",
     "Rodovia BR-316",
     "Rotatória do Entroncamento",
     "Av. Augusto Montenegro",
     "Integração Física no Terminal Mangueirão"
    ]
   },
   {
    "label": "VOLTA: Mangueirão - Águas Lindas",
    "ruas": [
     "Integração Física no Terminal Mangueirão",
     "Av. Augusto Montenegro",
     "Rotatória do Entroncamento",
     "BR-316",
     "Rua Osvaldo Cruz"
    ]
   }
  ]
 },
 "997": {
  "nome": "MAGUARI-PRAÇA DOS ESTIVADORES",
  "terminal": "Estrada do Curuçámbá Oeste com Avenida Solimões.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Avenida SN 21",
     "Avenida Guajará I",
     "Estrada do Guajará",
     "Estrada do Maguari",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Governador José Malcher",
     "Avenida Visconde de Souza Franco",
     "Avenida Marechal Hermes",
     "Travessa Primeiro de Março"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida Boulevard Castilhos França",
     "Avenida Presidente Vargas",
     "Rua Gaspar Viana",
     "Travessa Benjamim Constant",
     "Rua Municipalidade",
     "Avenida Visconde de Souza Franco",
     "Rua Boaventura da Silva",
     "Avenida Generalíssimo Deodoro",
     "Avenida Nazaré",
     "Avenida Magalhães Barata",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada do Maguari",
     "Estrada Do Guajará",
     "Avenida Guajará I",
     "Avenida SN 21",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste"
    ]
   }
  ]
 },
 "998": {
  "nome": "MAGUARI - CENTRO",
  "terminal": "Estrada do Curuçámbá Oeste com Avenida Rio Solimões.",
  "sentidos": [
   {
    "label": "BAIRRO - CENTRO",
    "ruas": [
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Avenida SN 21",
     "Avenida Guajará I",
     "Estrada do Guajará",
     "Estrada do Maguari",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Travessa Antônio Baena",
     "Rua Antônio Barreto",
     "Travessa Castelo Branco",
     "Avenida Conselheiro Furtado",
     "Travessa Padre Eutíquio",
     "Rua João Diogo"
    ]
   },
   {
    "label": "CENTRO - BAIRRO",
    "ruas": [
     "Avenida 16 de Novembro",
     "Avenida Conselheiro Furtado",
     "Avenida Roberto Camelier",
     "Rua dos Mundurucus",
     "Avenida José Bonifácio",
     "Avenida Almirante Barroso",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Estrada do Maguari",
     "Estrada do Guajará",
     "Avenida Guajará I",
     "Avenida SN 21",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste"
    ]
   }
  ]
 },
 "999": {
  "nome": "CURUÇÁMBÁ- UFPA",
  "terminal": "Rua São Pedro com Avenida Rio Baraúna (Conjunto Amapá / Roraima)",
  "sentidos": [
   {
    "label": "Curuçámbá - UFPA",
    "ruas": [
     "Avenida Rio barauna",
     "Rua boa esperança",
     "Avenida beira Rio",
     "Avenida porto grande",
     "Estrada do Curuçámbá Leste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Oeste",
     "Arterial 05",
     "Rua SN 21",
     "Travessa WE 72",
     "Avenida SN 22",
     "Travessa WE 75",
     "Avenida SN 24",
     "Arterial 18",
     "Rua SN 03",
     "Avenida 03 Corações",
     "Rodovia Mário Covas",
     "Rodovia BR-316",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Avenida Almirante Barroso",
     "Avenida Doutor Freitas",
     "Contorno no 2° ponto de retorno",
     "Avenida Rômulo Maiorana",
     "Travessa Lomas Valentinas",
     "Avenida João Paulo II",
     "Avenida Doutor Freitas",
     "Avenida Perimetral",
     "Terminal da UFPA"
    ]
   },
   {
    "label": "UFPA - Curuçámbá",
    "ruas": [
     "Avenida Perimetral",
     "Avenida Doutor Freitas",
     "Avenida Almirante Barroso (pista lateral)",
     "acesso ao Túnel do Complexo Viário do Entroncamento",
     "Rodovia BR-316",
     "Rodovia Mário Covas",
     "Avenida 03 Corações",
     "Avenida SN 17",
     "Arterial 18",
     "Avenida SN 24",
     "Travessa WE 75",
     "Avenida SN 22",
     "Travessa WE 72",
     "Avenida SN 21",
     "Arterial 05",
     "Estrada do Curuçámbá Oeste",
     "Avenida Rio Solimões",
     "Estrada do Curuçámbá Leste",
     "Avenida porto grande",
     "Avenida beira Rio",
     "Rua boa esperança",
     "Avenida Rio barauna"
    ]
   }
  ]
 }
}
;
