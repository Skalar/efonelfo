import {encode} from './codec'

function serialize(post) {
  switch (post.PostType) {
    case 'VX': {
      const schemaProps = post.schema.propTypes.map(prop => prop.name)
      const property = Object.keys(post).find(
        prop => !schemaProps.includes(prop)
      )

      return [post.PostType, property, encode({value: post[property]})].join(
        ';'
      )
    }

    default: {
      const csv = [
        post.schema.propTypes
          .map(prop => encode({...prop, value: post[prop.name]}))
          .join(';'),
      ]

      if (post.schema.lineTypes) {
        post.schema.lineTypes.forEach(lineType => {
          const lines = post.linesOfType(lineType).map(serialize)
          if (lines.length) csv.push(lines.join('\n'))
        })
      }

      return csv.join('\n')
    }
  }
}

export default serialize
