/* eslint no-use-before-define: ["error", { "variables": false }] */
import schema from './schema'

// Mixin for posttypes with lines
const withLines = {
  lines: [],
  push(values) {
    const line = values.schema
      ? values
      : PostTypes[values.PostType](values)
    this.lines.push(line)
    return line
  },

  linesOfType(type) {
    return this.lines.filter(line => line.PostType === type)
  },

  filter(attributes) {
    const props = Object.keys(attributes)
    return this.lines.filter(line => {
      return !props.find(prop => line[prop] !== attributes[prop])
    })
  },

  find(attributes) {
    return this.filter(attributes)[0]
  },

  isValidLine(type) {
    return this.schema.lineTypes && this.schema.lineTypes.includes(type)
  }
}

const defineProperties = (postType) => {
  return Object.defineProperties(postType, postType.schema.propTypes.reduce((props, prop) => {
    if (typeof prop.name !== 'undefined') {
      props[prop.name] = {
        value: prop.value,
        enumerable: true,
        writable: true,
        configurable: true
      }
    }
    return props
  }, {}))
}

const definePostType = function(schema) {
  const postType = Object.assign({},
    schema.lineTypes ? withLines : {}
  )

  return Object.create(postType, { schema: { value: schema } })
}

const createPostType = (postType) => {
  return (attributes = {}) => {
    const type = defineProperties(Object.create(postType, {lines: { value: [] }}))
    return Object.assign(type, attributes)
  }
}

export const createPostTypes = (postTypes) => {
  return Object.keys(postTypes).reduce((acc, cur) => {
    const postType = definePostType(postTypes[cur])
    acc[cur] = createPostType(postType)
    return acc
  }, {})
}

const PostTypes = createPostTypes(schema)

export default PostTypes
