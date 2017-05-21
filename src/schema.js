export const schema = {
  BT: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, value: 'BT' },
      { name: 'FriTekst', type: 'String', limit: 30 },
    ]
  },

  BL: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, value: 'BL' },
      { name: 'LinjeNr', type: 'Number', limit: 4 },
      { name: 'BestNr', type: 'String', limit: 10, required: true },
      { name: 'VareMrk', type: 'Number', limit: 1, required: true },
      { name: 'VareNr', type: 'String', limit: 14, required: true },
      { name: 'VaBetg', type: 'String', limit: 30, required: true },
      { name: 'VaBetg2', type: 'String', limit: 30 },
      { name: 'Ant', type: 'Number', limit: 9, decimals: 2, required: true },
      { name: 'PrisEnhet', type: 'String', limit: 3, required: true },
      { name: 'KVareNr', type: 'String', limit: 25 },
      { name: 'LevDato', type: 'Date', },
      { name: 'KjøpersRef', type: 'String', limit: 25 },
      { name: 'DelLev', type: 'Boolean', value: true },
      { name: 'AltKode', type: 'Boolean', value: true },
    ],
    lineTypes: ['BA', 'BT']
  },

  BA: {
    propTypes: [
      {name: 'PostType', type: 'String', limit: 2, value: 'BA' },
      {name: 'VareMrk', type: 'Number', limit: 1, required: true },
      {name: 'VareNr', type: 'String', limit: 14, required: true },
    ]
  },

  BH: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, value: 'BH' },
      { name: 'Format', type: 'String', limit: 8, value: 'EFONELFO' },
      { name: 'Versjon', type: 'String', limit: 3, value: '4.0' },
      { name: 'SelgersId', type: 'String', limit: 14 },
      { name: 'KjøpersId', type: 'String', limit: 14, required: true },
      { name: 'BestNr', type: 'String', limit: 10, required: true },
      { name: 'KundeNr', type: 'String', limit: 10, required: true },
      { name: 'AvtaleIdMrk', type: 'Number', limit: 1},
      { name: 'AvtaleId', type: 'String', limit: 10 },
      { name: 'KOrdNr', type: 'String', limit: 10 },
      { name: 'KundAvd', type: 'String', limit: 10 },
      { name: 'ProsjektNr', type: 'String', limit: 10 },
      { name: 'KLagerMrk', type: 'String', limit: 1 },
      { name: 'KLager', type: 'String', limit: 14 },
      { name: 'SLagerMrk', type: 'String', limit: 1 },
      { name: 'SLager', type: 'String', limit: 14 },
      { name: 'EksternRef', type: 'String', limit: 36 },
      { name: 'KjøpersRef', type: 'String', limit: 25 },
      { name: 'Merket', type: 'String', limit: 25 },
      { name: 'ObkrType', type: 'String', limit: 2 },
      { name: 'TransportMåte', type: 'String', limit: 25 },
      { name: 'Melding', type: 'String', limit: 25 },
      { name: 'LevDato', type: 'Date'},
      { name: 'BestOpp', type: 'String', limit: 2 },
      { name: 'LAdrLok', type: 'String', limit: 14 },
      { name: 'LFirmaNavn', type: 'String', limit: 35 },
      { name: 'LAdr1', type: 'String', limit: 35 },
      { name: 'LAdr2', type: 'String', limit: 35 },
      { name: 'LPostNr', type: 'String', limit: 9 },
      { name: 'LPostSted', type: 'String', limit: 35 },
      { name: 'LLandK', type: 'String', limit: 2 },
      { name: 'KFirmaNavn', type: 'String', limit: 35 },
      { name: 'KAdr1', type: 'String', limit: 35 },
      { name: 'KAdr2', type: 'String', limit: 35 },
      { name: 'KPostNr', type: 'String', limit: 9 },
      { name: 'KPostSted', type: 'String', limit: 35 },
      { name: 'KLandK', type: 'String', limit: 2 },
      { name: 'KNavn', type: 'String', limit: 35 },
      { name: 'KTelefon', type: 'String', limit: 15 },
      { name: 'KMob', type: 'String', limit: 15 },
      { name: 'KFax', type: 'String', limit: 15 },
      { name: 'KEPost', type: 'String', limit: 60 },
      { name: 'KWebAdr', type: 'String', limit: 40 },
      { name: 'SFirmaNavn', type: 'String', limit: 35 },
      { name: 'SAdr1', type: 'String', limit: 35 },
      { name: 'SAdr2', type: 'String', limit: 35 },
      { name: 'SPostNr', type: 'String', limit: 9 },
      { name: 'SPostSted', type: 'String', limit: 35 },
      { name: 'SLandK', type: 'String', limit: 2 },
    ],
    lineTypes: ['BT', 'BL'],
    isHead: true
  },

  VH: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, value: 'VH' },
      { name: 'Format', type: 'String', limit: 8, value: 'EFONELFO' },
      { name: 'Versjon', type: 'String', limit: 3, value: '4.0' },
      { name: 'SelgersID', type: 'String', limit: 14, required: true },
      { name: 'KjøpersID', type: 'String', limit: 14 },
      { name: 'KundeNr', type: 'String', limit: 10 },
      { name: 'FraDato', type: 'Date', required: true },
      { name: 'TilDato', type: 'Date', },
      { name: 'Valuta', type: 'String', limit: 3, required: true },
      { name: 'AvtaleID', type: 'String', limit: 10 },
      { name: 'SFirmaNavn', type: 'String', limit: 35, required: true },
      { name: 'SAdr1', type: 'String', limit: 35 },
      { name: 'SAdr2', type: 'String', limit: 35 },
      { name: 'SPostNr', type: 'String', limit: 9, required: true },
      { name: 'SPostSted', type: 'String', limit: 35, required: true },
      { name: 'SLandK', type: 'String', limit: 2}
    ],
    lineTypes: ['VL'],
    isHead: true
  },

  VA: {
    propTypes: [
      {name: 'PostType', type: 'String', limit: 2, required: true, value: 'VA' },
      {name: 'VareMrk', type: 'Number', limit: 1 },
      {name: 'VareNr', type: 'String', limit: 14 },
      {name: 'VaType', type: 'String', limit: 1, required: true },
      {name: 'SalgsPakning', type: 'Number', decimals: 4, limit: 9},
    ]
  },

  VL: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, required: true, value: 'VL' },
      { name: 'VareMrk', type: 'Number', limit: 1, decimals: 0, required: true },
      { name: 'VareNr', type: 'String', limit: 14, required: true },
      { name: 'VaBetg', type: 'String', limit: 30, required: true },
      { name: 'VaBetg2', type: 'String', limit: 30 },
      { name: 'MåleEnhet', type: 'Number', limit: 1, decimals: 0, required: true },
      { name: 'PrisEnhet', type: 'String', limit: 3, required: true },
      { name: 'PrisEnhetTxt', type: 'String', limit: 8 },
      { name: 'Pris', type: 'Number', decimals: 2, limit: 10, required: true },
      { name: 'Mengde', type: 'Number', limit: 4, required: true, decimals: 4 },
      { name: 'PrisDato', type: 'Date', required: true },
      { name: 'Status', type: 'Number', required: true, limit: 1 },
      { name: 'BlokkNummer', type: 'Number', limit: 6, decimals: 0 },
      { name: 'RabattGruppe', type: 'String', limit: 14 },
      { name: 'Fabrikat', type: 'String', limit: 10 },
      { name: 'Type', type: 'String', limit: 10 },
      { name: 'Lagerført', type: 'Boolean' },
      { name: 'SalgsPakning', type: 'Number', limit: 9, decimals: 4 },
      { name: 'Rabatt', type: 'Number', limit: 4, decimals: 2 },
      { name: 'PrisType', type: 'String', limit: 1 }
    ],
    lineTypes: ['VA', 'VX']
  },

  VX: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, value: 'VX' },
      { name: undefined, type: 'String', limit: 100}
    ]
  },

  RH: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, required: true, value: 'RH' },
      { name: 'Format', type: 'String', limit: 8, required: true, value: 'EFONELFO' },
      { name: 'Versjon', type: 'String', limit: 3, required: true, value: '4.0' },
      { name: 'SelgersID', type: 'String', limit: 14, required: true },
      { name: 'KjøpersID', type: 'String', limit: 14 },
      { name: 'KundeNr', type: 'String', limit: 10, required: true },
      { name: 'AvtaleID', type: 'String', limit: 10, required: true },
      { name: 'FraDato', type: 'Date', required: true },
      { name: 'TilDato', type: 'Date' },
      { name: 'Valuta', type: 'String', limit: 3, required: true },
      { name: 'Avtaletype', type: 'String', limit: 1, required: true },
      { name: 'SFirmaNavn', type: 'String', limit: 35, required: true },
      { name: 'SAdr1', type: 'String', limit: 35 },
      { name: 'SAdr2', type: 'String', limit: 35 },
      { name: 'SPostNr', type: 'String', limit: 9, required: true },
      { name: 'SPostSted', type: 'String', limit: 35, required: true },
      { name: 'SLandK', type: 'String', limit: 2 },
    ],
    lineTypes: ['RL']
  },

  RL: {
    propTypes: [
      { name: 'PostType', type: 'String', limit: 2, required: true, value: 'RL'},
      { name: 'VareMrk', type: 'Number', limit: 1, required: true },
      { name: 'VareNr', type: 'String', limit: 14, required: true },
      { name: 'AvtaltPris', type: 'Number', decimals: 2 },
      { name: 'Rabatt', type: 'Number', decimals: 2, required: true },
      { name: 'Tekst', type: 'String', limit: 30 },
    ]
  }
}

export default schema
