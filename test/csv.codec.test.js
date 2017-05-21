import test from 'tape'
import {encode, decode} from '../src/csv/codec'

test('CSV codec: decode', t => {
  // String decoding
  t.equal(decode({value: 'foo'}), 'foo')
  t.equal(decode({value: 'foo', type: 'String'}), 'foo')
  t.equal(decode({value: 'foo.bar;semicolon', type: 'String'}), 'foo.bar;semicolon')
  t.equal(decode({value: '', type: 'String'}), undefined)
  t.equal(decode({type: 'String'}), undefined)

  // Number decoding
  t.equal(decode({value: '100', type: 'Number'}), 100)
  t.equal(decode({value: '100', type: 'Number', decimals: 2}), 1)
  t.equal(decode({value: '100', type: 'Number', decimals: 4}), 0.01)
  t.equal(decode({value: '100', type: 'Number', decimals: 4}), 0.01)
  t.equal(decode({value: '', type: 'Number', decimals: 4}), undefined)

  // Date decoding
  const date = decode({value: '20170401', type: 'Date'})
  t.equal(date.getFullYear(), 2017)
  t.equal(date.getMonth(), 3)
  t.equal(date.getDate(), 1)

  t.equal(decode({type: 'Date'}), undefined)
  t.equal(decode({value: 'not a date', type: 'Date'}), undefined)

  // Boolean decoding
  t.ok(decode({value: true, type: 'Boolean'}))
  t.ok(decode({value: 'J', type: 'Boolean'}))
  t.notOk(decode({value: 'N', type: 'Boolean'}))
  t.notOk(decode({value: '', type: 'Boolean'}))
  t.notOk(decode({value: false, type: 'Boolean'}))
  t.ok(decode({value: '', type: 'Boolean', defaultValue: true}))

  t.end()
})

test('CSV codec: encode', t => {
  // String
  t.equal(encode({value: 'foo'}), 'foo')
  t.equal(encode({value: 'No;Semicolons'}), 'NoSemicolons')
  t.equal(encode({value: 'IFÖ festeplugg'}), 'IF� festeplugg')
  t.equal(encode({value: 'Truncates by limit', limit: 5}), 'Trunc')
  t.equal(encode({}), '')

  // Number
  t.equal(encode({type: 'Number'}), '')
  t.equal(encode({type: 'Number', value: 0}), 0)
  t.equal(encode({type: 'Number', value: 10, decimals: 2}), 1000)
  t.equal(encode({type: 'Number', value: 0.01, decimals: 2}), 1)
  t.equal(encode({type: 'Number', value: -0.01, decimals: 2}), -1)
  t.equal(encode({type: 'Number', value: 0.0, decimals: 0}), 0)
  t.equal(encode({type: 'Number', value: 0.0, decimals: 0}), 0)

  // Boolean
  t.equal(encode({type: 'Boolean'}), '')
  t.equal(encode({type: 'Boolean', value: undefined, defaultValue: true}), 'J')
  t.equal(encode({type: 'Boolean', value: false}), 'N')

  // Date
  t.equal(encode({type: 'Date'}), '')
  t.equal(encode({type: 'Date', value: 'not a date'}), '')
  t.equal(encode({type: 'Date', value: new Date(2017, 10, 21)}), '20171121')

  t.end()
})
