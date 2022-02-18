
// https://towardsdev.com/what-is-better-for-http-requests-fetch-or-axios-comparison-920ceffc5161
/*
axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    // 4 seconds timeout
  data: {
    firstName: 'Ayush',
    lastName: 'Verma'
  }
})
.then(response => { handle the response })
.catch(error => console.error('timeout exceeded'))
*/


export default function useAxios(args){
  axios(args)
  //axios({
    //method: 'post',
    //url: '/login',
    //timeout: 4000,    // 4 seconds timeout
    //data: {
      //firstName: 'Ayush',
      //lastName: 'Verma'
    //}
  ///})
  //.then(response => { handle the response })
  .catch(error => {
    console.log(error)
    console.error('timeout exceeded')
  })

}