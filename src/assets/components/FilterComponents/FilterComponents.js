import React, { useEffect, useState } from 'react'
import "./_filterComponents.scss"
import FilterInput from '../Buttons/FilterInput/FilterInput'

export const FilterComponents = ({ handleFilterChange, filterFields, filterType, checkbox, listbox }) => {
  const [data, setData] = useState([]);
  const displaydata = data?.map(
    (element, index) => {
      return (
        <FilterInput
          key={index}
          handleFilterChange={handleFilterChange}
          value={element.value}
          title={element.title}
          name={element.name}
          filterType={filterType}
          checkbox={checkbox}
          listbox={listbox}
          color={element.color}
        />
      )
    }
  )

  useEffect(() => {
    const generateData = (extraFields) => {
      return [
        ...(Array.isArray(extraFields) ? extraFields.map(field => ({ ...field })) : []),
        ...(Array.isArray(filterFields) ? filterFields : [])
      ];
    };

    let categoryData;
    switch (filterType) {
  
      case "Price":
        categoryData = generateData(
          [{
            "value": "100",
            "title": "Rs.0 - Rs.100",
            "name": "test2",
          },
          {
            "value": "500",
            "title": "Rs.100 - Rs.500",
            "name": "test2",
          },
          {
            "value": "1000",
            "title": "Rs.500 - Rs.1000",
            "name": "test2",
          },
          {
            "value": "1000",
            "title": "Over Rs.1000",
            "name": "test2",
          },]
        );
        break;
      default:
        categoryData = [];
        break;
    }
    setData(categoryData);
  }, [filterFields, filterType]);

  return (
    <div className="category-card">
      <p className="category-card__title">{filterType}</p>
      <div className={listbox && "display-f"}>
        {displaydata}
      </div>

    </div>
  )
}
