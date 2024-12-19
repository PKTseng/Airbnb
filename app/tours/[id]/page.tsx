import mapsImg from '@/images/maps.jpg'
import Image from 'next/image'

const url = 'https://www.course-api.com/images/tours/tour-1.jpeg'

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className='text-4xl'>ID : {params.id}</h1>
      <section>
        <div>
          <Image
            src={mapsImg}
            alt='mapsImg'
            width={192}
            height={192}
            priority
            className='h-48 w-48 rounded object-cover'
          />
        </div>
        <h2>local image</h2>

        <div>
          <Image src={url} alt='tour' priority width={192} height={192} className='h-48 w-48 rounded object-cover' />
        </div>
        <h2>remote image</h2>
      </section>
    </div>
  )
}

export default page
