import React from 'react'

const CanalEnSidebar = ({nombre,id}) => {
  return (
    <div className='sidebarChannel'>
        <h4>
            <span className='sidebarChannel__hash'>#</span>
            {nombre}
        </h4>
    </div>
  )
}

export default CanalEnSidebar