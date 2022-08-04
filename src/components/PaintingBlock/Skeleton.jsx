import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={360}
    height={275}
    viewBox="0 0 360 275"
    backgroundColor="#bababa"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="360" height="275" />
  </ContentLoader>
)

export default MyLoader
