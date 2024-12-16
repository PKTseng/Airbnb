import React from 'react'

const url = 'https://www.course-api.com/react-tours-project'

type Tour = {
  id: string
  name: string
  info: string
  image: string
  price: string
}

async function ToursPAge() {
  const response = await fetch(url)
  const data: Tour[] = await response.json()

  // console.log(data) //server 端執行會顯示在終端機上

  return (
    <>
      <section>
        <h1 className='mb-4 text-3xl'>Tours</h1>

        {data.map((tour) => {
          return <h2 key={tour.id}>{tour.name}</h2>
        })}
      </section>
    </>
  )
}

export default ToursPAge
