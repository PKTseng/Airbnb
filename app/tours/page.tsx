import Link from 'next/link'
import Image from 'next/image'

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

        <div className='grid gap-8 md:grid-cols-2'>
          {data.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/tours/${item.id}`}
                className='transition-all duration-300 hover:text-blue-500'
              >
                <div className='relative mb-2 h-48'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    className='rounded object-cover'
                    sizes='(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
                <h2>{item.name}</h2>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default ToursPAge
