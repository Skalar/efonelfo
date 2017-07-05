import test from 'tape'
import PostTypes from '../src/postTypes'

const {BH, BL, BT, BA} = PostTypes

test('PostTypes', t => {
  const bh = BH()

  // Adding a line using a PostType constructor
  const date = new Date(2017, 4, 1)
  const bl1 = bh.push(
    BL({
      LinjeNr: '1',
      BestNr: 'abc',
      VareMrk: 4,
      VareNr: '666',
      VaBetg: 'Klosettet',
      Ant: 4,
      PrisEnhet: 'STK',
      LevDato: date,
      DelLev: true,
      AltKode: false,
    })
  )

  t.deepEqual(bl1, {
    PostType: 'BL',
    LinjeNr: '1',
    BestNr: 'abc',
    VareMrk: 4,
    VareNr: '666',
    VaBetg: 'Klosettet',
    VaBetg2: undefined,
    Ant: 4,
    PrisEnhet: 'STK',
    KVareNr: undefined,
    LevDato: date,
    KjøpersRef: undefined,
    DelLev: true,
    AltKode: false,
  })

  bl1.Ant = 10
  t.equal(bl1.Ant, 10)

  // Add a line using plain object literal
  const bl2 = bh.push({PostType: 'BL', LinjeNr: '14'})
  t.deepEqual(bl2, {
    PostType: 'BL',
    LinjeNr: '14',
    BestNr: undefined,
    VareMrk: undefined,
    VareNr: undefined,
    VaBetg: undefined,
    VaBetg2: undefined,
    Ant: undefined,
    PrisEnhet: undefined,
    KVareNr: undefined,
    LevDato: undefined,
    KjøpersRef: undefined,
    DelLev: true,
    AltKode: true,
  })

  t.equal(bh.lines.length, 2)

  // Add a BT line to the last BL
  bl2.push(BT({FriTekst: 'haha'}))
  t.equal(bl2.lines.length, 1)
  t.deepEqual(bl2.linesOfType('BT'), [{PostType: 'BT', FriTekst: 'haha'}])

  // Add a BA line to the last BL
  bl2.push(BA())
  t.equal(bl2.lines.length, 2)
  t.equal(bl2.linesOfType('BA').length, 1)
  t.equal(bl1.lines.length, 0)

  // find line using key/value
  t.deepEqual(bl2.find({FriTekst: 'haha'}), {PostType: 'BT', FriTekst: 'haha'})
  t.deepEqual(bh.find({PostType: 'BL', LinjeNr: '1', Ant: 10}), bl1)
  t.equal(bh.find({VareNr: '999001123'}), undefined)

  // filter lines using key/value
  t.equal(bh.filter({PostType: 'BL'}).length, 2)
  t.equal(bh.filter({PostType: 'BL', Ant: 10}).length, 1)
  t.equal(bh.filter({PostType: 'BL', Ant: 11}).length, 0)

  t.end()
})
