'use server'

export const createUser = async (formData: FormData) => {
  'use server'

  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')

  const rowData = Object.fromEntries(formData)

  console.log({ firstName, lastName, rowData })
}
