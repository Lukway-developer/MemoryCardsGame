import React from 'react'

const PositionItem = ({ data }) => {
  return (
    <tr>
      <td>{data?.position}</td>
      <td>{data?.nickname}</td>
      <td>{data?.errors}</td>
      <td>{data?.time}</td>
    </tr>
  )
}

export default PositionItem