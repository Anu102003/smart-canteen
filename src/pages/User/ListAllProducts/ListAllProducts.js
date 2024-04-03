import React, { useContext, useEffect, useState } from 'react'
import "./listAllProducts.scss"
import { SideFilter } from '../../../assets/components/SideFilter/SideFilter'
import Card from '../../../assets/components/Card/Card'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../../Config/ConfigFirebase'
import Menu, { FiltersContext } from '../../../Context/LocaleContext'

export const ListAllProducts= () => {

    const [details, setDetails] = useState();

    const navMenuSelected = useContext(Menu);


    const initialFilters = {
      price: null,
    };

    const [filters, setFilters] = useState(initialFilters);
    const handleFilterChange = (filterType, value) => {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters };

        if (filterType === 'Price') {
          updatedFilters.price = value;
        } 
        return updatedFilters;
      });
    };
    function filteredData(details, filters) {
      return details
        ?.filter(item => {
          return (
            (!filters.price ||
              (filters.price === "100" && parseInt(item.price) < 100) ||
              (filters.price === "500" && parseInt(item.price) >= 100 && parseInt(item.price) <= 500) ||
              (filters.price === "1000" && parseInt(item.price) >= 500 && parseInt(item.price) <= 1000) ||
              (filters.price === "1000" && parseInt(item.price) > 1000))
          );
        });
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const messagesCollection = collection(db, `${navMenuSelected.toLowerCase()}`);
            const q = query(messagesCollection, orderBy('productId', 'asc'));
            const messagesSnapshot = await getDocs(q);
            const messagesData = messagesSnapshot.docs.map(doc => (
              {
                id: doc.id,
                ...doc.data()
              }
            ));
            setDetails(messagesData);
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


























