import test from 'tape'
import PostTypes from '../src/postTypes'
import {toCSV} from '../src/csv'

const {BH, BL, BT, BA, VX} = PostTypes

const bh = BH({
  KjøpersId: 'NO950349875MVA',
  BestNr: '2091',
  KundeNr: '28579',
  KOrdNr: '19271',
  ProsjektNr: '19271',
  Merket: '2091/19271',
  LevDato: new Date(2010, 5, 2),
})

test('CSV: serialize BH', t => {
  const csv =
    'BH;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;'
  t.equal(toCSV(bh), csv)
  t.end()
})

test('CSV: serialize BH with lines', t => {
  bh.push(
    BL({
      PostType: 'BL',
      LinjeNr: 1,
      Ant: 2.2,
      LevDato: new Date(2017, 0, 4),
      DelLev: true,
      AltKode: false,
    })
  )
  bh.push({
    PostType: 'BL',
    LinjeNr: 2,
    Ant: 5,
    LevDato: new Date(2017, 0, 1),
    DelLev: false,
    AltKode: false,
  })

  const csv = `BH;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;
BL;1;;;;;;220;;;20170104;;J;N
BL;2;;;;;;500;;;20170101;;N;N`

  t.deepEqual(toCSV(bh), csv)

  bh.lines[1].push({PostType: 'BT', FriTekst: 'Hello world'})
  t.equal(toCSV(bh), `${csv}\nBT;Hello world`)

  bh.push({PostType: 'BT', FriTekst: 'Santa claus'})
  bh.Something = 'Unknown properties are ignored in csv'

  t.equal(
    toCSV(bh),
    `BH;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;
BT;Santa claus
BL;1;;;;;;220;;;20170104;;J;N
BL;2;;;;;;500;;;20170101;;N;N
BT;Hello world`
  )

  t.end()
})

test('CSV: serialize VX', t => {
  const vx = VX({BILDE: 'http://foo'})
  t.equal(toCSV(vx), 'VX;BILDE;http://foo')
  t.end()
})

test('CSV: serialize BL', t => {
  const bl = BL({
    LinjeNr: 1,
    BestNr: 'abc',
    VareMrk: 4,
    VareNr: '654321',
    VaBetg: 'Dusjen',
    Ant: 4,
    PrisEnhet: 'STK',
    LevDato: new Date(2017, 4, 1),
    DelLev: true,
    AltKode: false,
  })

  const csv = 'BL;1;abc;4;654321;Dusjen;;400;STK;;20170501;;J;N'
  t.equal(toCSV(bl), csv)

  bl.push(BT({FriTekst: 'Hacked by chinese'}))
  t.equal(toCSV(bl), `${csv}\nBT;Hacked by chinese`)

  bl.push(BA({VareMrk: 2, VareNr: '1234'}))
  t.equal(toCSV(bl), `${csv}\nBA;2;1234\nBT;Hacked by chinese`)

  t.end()
})
