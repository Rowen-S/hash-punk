import React, { useEffect, useState } from 'react'
import { Image } from 'rebass/styled-components'
import SequentialJson from './sequential.json'

export default function Sequential() {
  const [currentFrame, setCurrentFrame] = useState(0)

  //   useEffect(() => {
  //     if (currentFrame === 149) {
  //       setCurrentFrame(40)
  //     }
  //   }, [currentFrame])
  // 40 - 149
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % SequentialJson.length)
    }, 33)
    return () => {
      clearInterval(animationInterval)
    }
  }, [])
  return <Image src={`data:image/png;base64,${SequentialJson[currentFrame]}`} />
}
