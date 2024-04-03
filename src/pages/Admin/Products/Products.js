import React, { useEffect, useState } from 'react'
import "./_products.scss"
import i18n from '../../../i18n'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faClose, faMagnifyingGlass, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { AddProduct } from '../../../assets/components/Popup/AddProduct/AddProduct'
import { ListProducts } from '../../../assets/components/ListProducts/ListProducts';
import { useTranslation } from 'react-i18next'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../Config/ConfigFirebase'

export const Products = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState("");
  const [addEnable, setAddEnable] = useState(false);
  const [productData, setProductData] = useState([])
  const [editEnable, setEditEnable] = useState(false);
  const [editId, setEditId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const searchQuery = (e) => {
    setSearchTerm(e.target.value);
  }
  const handleCategory = (category) => {
    setCategoryOpen(false)
    setCategorySelect(category)
  }

  useEffect(() => {
    function handle(e) {
      if (e.target.className === "product-popup-parent") {
        setAddEnable(false)
        setEditEnable(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])

  const [details, setDetails] = useState();
  useEffect(() => {
    if (categorySelect.length > 0) {
      const fetchData = async () => {
        try {
          const messagesCollection = collection(db, `${categorySelect.toLowerCase()}`);
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
    }
  }, [categorySelect,addEnable,editEnable]);

  const filteredProducts = details?.filter(product => {
    const searchableName = product.name?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
    const searchablePrice = product.price?.toString().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
    const searchTermFormatted = searchTerm.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '');
    return searchableName?.includes(searchTermFormatted) || searchablePrice?.includes(searchTermFormatted);
  });




  const renderCategory = () => {
    switch (categorySelect) {
      case "":
        return <div className='select-category'>
          <p className='p1'>Select any category
          </p>
        </div>
      default:
        return <ListProducts category={categorySelect} details={filteredProducts} setEditId={setEditId} setEditEnable={setEditEnable} setProductData={setProductData} />
    }
  }

  return (
    <div className='products-container'>
      <div className='category-search-container'>
        <div className='search'>
          <input type='text' placeholder='Search Name, Price' onChange={searchQuery} value={searchTerm} />
          <div className='search-icon'>
            <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
          </div>
        </div>
        <div className='add-category'>
          {
            categorySelect.length > 0 &&
            <div className='add-btn' onClick={() => { setAddEnable(true) }}>
              Add Products<FontAwesomeIcon icon={faPlusCircle} />
            </div>
          }
          <div className='product-category' onClick={() => { setCategoryOpen(!categoryOpen) }}>
            Select any category
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
      </div>
      {
        categoryOpen &&
        <div className='product-category-options'>
          <p className='options' onClick={() => { handleCategory("Snacks") }}>Snacks</p>
          <p className='options' onClick={() => { handleCategory("Juice") }}>Juice</p>
          <p className='options' onClick={() => { handleCategory("Meals") }}>Meals</p>
        </div>
      }
      {
        renderCategory()
      }
      {
        (editEnable || addEnable) &&
        <div className='product-popup-parent'>
          <div className='product-popup'>
            <div className='close-icon' onClick={() => { setAddEnable(false); setEditEnable(false); setProductData([]); setEditId('') }}>
              <FontAwesomeIcon icon={faClose} size='2xl' />
            </div>
            <AddProduct category={categorySelect} editId={editId} editEnable={editEnable} setAddEnable={setAddEnable} productData={productData} setProductData={setProductData} setEditEnable={setEditEnable} />
          </div>
        </div>
      }
    </div>
  )
}
