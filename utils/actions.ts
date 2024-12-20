'use server'

export const createUser = async (formData: FormData) => {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const rowData = Object.fromEntries(formData)

  console.log(rowData)
  console.log({ firstName, lastName })
}
