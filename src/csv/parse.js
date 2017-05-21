import fs from 'fs'
import parse from 'csv-parse'
import {decode} from './codec'
import PostTypes from '../postTypes'

const valuesFromRow = (postType, row) => {
  if (!postType.schema) return
  return postType.schema.propTypes.reduce((values, prop, index) => {
    if (prop.name) {
      values[prop.name] = decode({type: prop.type, decimals: prop.decimals, defaultValue: prop.defaultValue, value: row[index]})
    } else {
      values[row[index]] = decode({value: row[index + 1]})
    }

    return values
  }, {})
}

const makePostType = (row) => {
  const typeName = row[0]
  const type = PostTypes[typeName]
  if (!type) throw new Error(`Unknown linetype: ${typeName}`)
  const postType = type()
  const values = valuesFromRow(postType, row)
  return Object.assign(postType, values)
}

export const parseString = (csv) => {
  // decode entire buffer to utf-8:
  // const csv = iconv.decode(csv, 'utf-8').toString()

  return new Promise((resolve, reject) => {
    const result = []
    const parser = parse({columns: null, trim: true, relax: true, relax_column_count: true, delimiter: ';'})

    const findLine = (post) => {
      if (post.schema.isHead) return result

      const head = result[result.length - 1]
      const lastLine = head && head.lines[head.lines.length - 1]
      return lastLine &&
        lastLine.schema.lineTypes &&
        lastLine.isValidLine(post.PostType) ? lastLine : head
    }

    parser.on('readable', _ => {
      let row
      while (row = parser.read()) {
        const post = makePostType(row)
        const line = findLine(post) || result
        line.push(post)
      }
    })

    parser.on('finish', _ => resolve(result))
    parser.on('error', msg => reject(msg))
    parser.write(csv)
    parser.end()
  })
}

export const parseFile = async (filename) => {
  const csv = Buffer.from(fs.readFileSync(filename, {encoding: 'binary'}))
  return parseString(csv)
}
