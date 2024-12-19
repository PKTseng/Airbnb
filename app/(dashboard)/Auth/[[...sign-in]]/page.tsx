const SignInPage = ({ params }: { params: { 'sign-in': string[] } }) => {
  console.log(params)
  return <div>SignInPage:{params['sign-in'][1]}</div>
}
export default SignInPage
