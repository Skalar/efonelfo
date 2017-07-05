import iconv from 'iconv-lite'
import serializePost from './serializePost'

function toCSV(post) {
  return iconv.encode(serializePost(post), 'iso-8859-1')
}

export default toCSV
