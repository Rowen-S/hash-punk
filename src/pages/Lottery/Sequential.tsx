import React, { useEffect, useState } from 'react'
import { Image } from 'rebass/styled-components'

export default function Sequential() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const totalFrames = 150 // 总帧数

  //   useEffect(() => {
  //     if (currentFrame === 149) {
  //       setCurrentFrame(40)
  //     }
  //   }, [currentFrame])
  // 40 - 149
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames)
    }, 33)
    return () => {
      clearInterval(animationInterval)
    }
  }, [])
  return <Image src={`/active/${currentFrame}.png`} />
}
