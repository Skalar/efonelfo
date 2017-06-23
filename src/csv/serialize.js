import {encode} from './codec'

const toCSV = post => {
  const serializeVX = post => {
    const schemaProps = post.schema.propTypes.map(prop => prop.name)
    const property = Object.keys(post).find(prop => !schemaProps.includes(prop))
    return [post.PostType, property, encode({value: post[property]})].join(';')
  }

  const serialize = post => {
    const csv = [
      post.schema.propTypes
        .map(prop => encode({...prop, value: post[prop.name]}))
        .join(';'),
    ]

    if (post.schema.lineTypes) {
      post.schema.lineTypes.forEach(lineType => {
        const lines = post.linesOfType(lineType).map(toCSV)
        if (lines.length) csv.push(lines.join('\n'))
      })
    }

    return csv.join('\n')
  }

  switch (post.PostType) {
    case 'VX':
      return serializeVX(post)
    default:
      return serialize(post)
  }
}

export default toCSV
