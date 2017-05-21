import test from 'tape'
import {parseCSVFile, parseCSV} from '../src'

test('CSV: parsing a string', async t => {
  const csv = `BH;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;
  BL;1;2091;1;6047602;Testprodukt;;100;EA;;20100602;;J;N`

  const result = await parseCSV(csv)
  t.equal(result.length, 1)
  t.equal(result[0].PostType, 'BH')
  t.equal(result[0].lines.length, 1)
  t.end()
})

test('CSV: parse string with unknown posttypes', async t => {
  const csv = 'BX;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;'
  parseCSV(csv)
    .then(_ => t.fail('Unexpected assertion'))
    .catch(err => t.equal(err.message, 'Unknown linetype: BX'))
  t.end()
})

test('CSV: parse file with I/O error', async t => {
  parseCSVFile('this-does-not-exist')
    .then(_ => t.fail('Unexpected assertion'))
    .catch(err => t.ok(err.message.match(/no such file or directory/)))
  t.end()
})

test('CSV: parse file with charset decoding', async t => {
  const [vh] = await parseCSVFile('test/fixtures/vh2.csv')
  t.equal(vh.lines[0].VaBetg, '3/8" STÅLRØR SORT GJ. U/MUF. E')
  t.end()
})

test('CSV: parse file', async t => {
  const result = await parseCSVFile('test/fixtures/bh.csv')

  t.equal(result.length, 1)
  const bh = result[0]

  t.equal(bh.PostType, 'BH')
  t.equal(bh.KjøpersId, 'NO950349875MVA')
  t.equal(bh.BestNr, '2091')
  t.equal(bh.AvtaleId, undefined)
  t.deepEqual(bh.LevDato, new Date('2010-06-02'))

  t.equal(bh.lines.length, 1)
  const bl = bh.lines[0]
  t.equal(bl.PostType, 'BL')
  t.equal(bl.LinjeNr, 1)
  t.equal(bl.BestNr, '2091')
  t.equal(bl.VareMrk, 1)
  t.equal(bl.VareNr, '6047602')
  t.equal(bl.VaBetg, 'IFÖ festeplugg til Aqua og')
  t.equal(bl.Ant, 1)
  t.equal(bl.PrisEnhet, 'EA')
  t.equal(bl.KVareNr, undefined)
  t.deepEqual(bl.LevDato, new Date('2010-06-02'))
  t.equal(bl.KjøpersRef, undefined)
  t.ok(bl.DelLev)
  t.notOk(bl.AltKode)
  t.end()
})

test('CSV: parse file with unknown posttype', t => {
  parseCSVFile('test/fixtures/unknown.csv')
    .then(_ => t.fail)
    .catch(err => t.equal(err.message, 'Unknown linetype: FOO'))
  t.end()
})

test('CSV: parse file with multiple heads', async t => {
  const result = await parseCSVFile('test/fixtures/bh.multihead.csv')
  t.equal(result.length, 2)
  t.equal(result[0].PostType, 'BH')
  t.equal(result[0].lines.length, 1)
  t.equal(result[1].lines.length, 2)
  t.equal(result[1].PostType, 'BH')
  t.end()
})

test('CSV: parse file with text', async t => {
  const [bh] = await parseCSVFile('test/fixtures/bh.advanced.csv')
  t.equal(bh.linesOfType('BT')[0].FriTekst, 'Head comment')
  t.equal(bh.lines[1].linesOfType('BT')[0].FriTekst, 'Line comment')
  t.equal(bh.lines[1].lines[1].VareNr, '123456')
  t.end()
})

test('CSV: parse VH file', async t => {
  const [vh] = await parseCSVFile('test/fixtures/vh.csv')
  t.equal(vh.lines.length, 4)
  t.equal(vh.lines[0].lines.length, 0)
  t.equal(vh.lines[1].lines.length, 2)
  t.equal(vh.lines[1].lines[0].VareNr, '628691')
  t.equal(vh.lines[1].lines[1].BILDE, 'http://example.com/foo.jpg')
  t.equal(vh.lines[2].lines.length, 1)
  t.end()
})

test('CSV: parse VX string', async t => {
  const csv = 'VX;BILDE;http://example.com/foo.png'
  const [vx] = await parseCSV(csv)
  t.equal(vx.PostType, 'VX')
  t.equal(vx.BILDE, 'http://example.com/foo.png')
  t.end()
})
