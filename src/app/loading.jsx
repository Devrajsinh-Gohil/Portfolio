'use client'

import React from 'react'
import { FingerprintSpinner } from 'react-epic-spinners'

export default function Loading() {
  return (
    <div className='loadspin'>
      <FingerprintSpinner color = '#00ff00'/>
    </div>
  )
}
