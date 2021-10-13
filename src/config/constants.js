const dev = {
  url: 'http://localhost:8000/api'
}

const prod = {
  url: 'http://localhost:8000/api'
}
  
const local_storage = {
  JWT_ACCESS_KEY: "nErTorENDectaiND",
  USER_ID: "nlasdfALSERNSDln",
  FIRST_NAME: "eadIamEntoSInetH",
  LAST_NAME: "werHOJalsdfHOASD",
  EMAIL: "JalENTectaERNvin"
}
  
const config = process.env.NODE_ENV === 'production' ? prod : dev;
  
export default {
  ...config,
  ...local_storage
}