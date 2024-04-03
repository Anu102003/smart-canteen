import React from 'react'
import { FilterComponents } from '../FilterComponents/FilterComponents'
import "./_sideFilter.scss"
export const SideFilter = ({ handleFilterChange }) => {

  return (
    <div className='sidefilter-container'>
      <FilterComponents handleFilterChange={handleFilterChange} filterType="Price" checkbox={false} listbox={false} />
    </div>
  )
}
