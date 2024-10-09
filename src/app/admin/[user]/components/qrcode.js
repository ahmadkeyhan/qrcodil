'use client'
import QRCodeStyling from 'qr-code-styling'
import { useEffect, useState, useRef } from 'react'

export default function Qr({user}) {
   const qrCode = new QRCodeStyling({
    data: `qrcodil.ir/${user}`,
    width: 300,
    height: 300,
    dotsOptions: {
        color: "#000000",
        type: "rounded"
    },
    margin: 16
   })
   const [dotColor,setDotColor] = useState("ff0000")
   const ref = useRef(null)
   useEffect(() => {
    qrCode.append(ref.current);
  }, [dotColor])

  useEffect(() => {
    qrCode.update({
        dotsOptions: {
            color: dotColor
        }
    })
  }, [dotColor])
  const onDotColorChange = (event) => {
    event.preventDefault()
    setDotColor(`#${event.target.value}`)
  }
   
   const [fileExt, setFileExt] = useState("png")
   const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  }

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  }
  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
        <div className="flex justify-between w-full mx-5 my-0">
            {/* <input value={dotColor} onChange={onDotColorChange} className='flex-grow text-emerald-950' /> */}
            <select className=' text-emerald-950' onChange={onDotColorChange} value={dotColor}>
                <option value="ff0000">RED</option>
                <option value="00ff00">GREEN</option>
                <option value="0000ff">BLUE</option>
            </select>
        </div>
        <div ref={ref} />
        <div className="flex justify-between w-full mx-5 my-0">
            <select className=' text-emerald-950' onChange={onExtensionChange} value={fileExt}>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
            </select>
            <button onClick={onDownloadClick}>Download</button>
        </div>
    </div>
  )
}