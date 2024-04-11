import React, { useContext, useEffect, useState } from 'react'
import "./listAllProducts.scss"
import { SideFilter } from '../../../assets/components/SideFilter/SideFilter'
import Card from '../../../assets/components/Card/Card'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../Config/ConfigFirebase'
import Menu, { FiltersContext } from '../../../Context/LocaleContext'
import { getProductsByCategoryApi } from '../../../actions/ApiCalls'

export const ListAllProducts= () => {

    const [details, setDetails] = useState();

    const navMenuSelected = useContext(Menu);


    const initialFilters = {
      productPrice: null,
    };

    const [filters, setFilters] = useState(initialFilters);
    const handleFilterChange = (filterType, value) => {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters };

        if (filterType === 'Price') {
          updatedFilters.productPrice = value;
        } 
        return updatedFilters;
      });
    };
    function filteredData(details, filters) {
      return details
        ?.filter(item => {
          return (
            (!filters.productPrice ||
              (filters.productPrice === "100" && parseInt(item.productPrice ) < 100) ||
              (filters.productPrice === "500" && parseInt(item.productPrice) >= 100 && parseInt(item.productPrice) <= 500) ||
              (filters.productPrice === "1000" && parseInt(item.productPrice) >= 500 && parseInt(item.productPrice) <= 1000) ||
              (filters.productPrice === "1000" && parseInt(item.productPrice ) > 1000))
          );
        });
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result=await getProductsByCategoryApi(navMenuSelected)
            setDetails(result);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      setFilters(initialFilters)
    }, [navMenuSelected]);

    const result = filteredData(details, filters);
    return (
      <div className='all-product-container'>
        <FiltersContext.Provider value={filters}>
          <div className='sidefilter-wrapper'>
            <SideFilter  handleFilterChange={handleFilterChange} />
          </div>
        </FiltersContext.Provider>
        <div className='products-wrapper'>
          {result?.map((product,index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    )
  }


























