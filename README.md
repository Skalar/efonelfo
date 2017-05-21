# EfoNelfo

JavaScript library for parsing and writing EfoNelfo v4.0 documents.

* Supported formats:
  * CSV
* Supported types:
  * BH/BL Varebestilling
  * VH/VL Vareformat
  * RH/RL Rabatt
* Official documentation: http://www.efo.no/wp-content/uploads/2017/04/EFONELFO40-PDF.zip

## Installation

`npm install efonelfo`

## Examples

### Parse CSV file

```js
import {parseCSVFile} from 'efonelfo'
const [bh] = await parseCSVFile('B42.123.csv')

console.log(bh.KundeNr)
```

### Parse CSV string

```js
import {parseCSV} from 'efonelfo'
const csv ='BH;EFONELFO;4.0;;NO950349875MVA;2091;28579;;;19271;;19271;;;;;;;2091/19271;;;;20100602;;;;;;;;;;;;;;;;;;;;;;;;;;'
const [bh] = await parseCSV(csv)
```

### Working with objects

```js
import {PostTypes, toCSV} from 'efonelfo'
const {BH, BL} = PostTypes
const bh = BH({
  KjøpersId: '11233',
  BestNr: '231444',
  LevDato: new Date('2012-06-21')
})

bh.EksternRef = 'my reference'
bh.push({PostType: 'BL', LinjeNr: 1, Ant: 3, PrisEnhet: 'EA', DelLev: true})
bh.push(BL({LinjeNr: 2, Ant: 10, VareNr: '12345'}))

// Generate CSV
console.log(toCSV(bh))

/* Result:
BH;EFONELFO;4.0;;11233;231444;;;;;;;;;;;my reference;;;;;;20120621;;;;;;;;;;;;;;;;;;;;;;;;;;
BL;1;;;;;;300;EA;;;;J;J
BL;2;;;12345;;;1000;;;;;J;J
*/
```
