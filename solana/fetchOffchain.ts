import axios from 'axios'

const fetchOffchain = async (uri: string) => {
  const { data } = await axios.get(uri)

  return data
}

export default fetchOffchain
