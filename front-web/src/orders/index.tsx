import './styles.css';
import StepsHeader from './stepsHeader';
import ProductList from './productsList';
import { useEffect, useState } from 'react';
import { OrderLocationdata, Product } from './types';
import { fetchProducts } from '../api';
import OrderLocation from './orderLocation';
import OrderSummary from './orderSummary';
import Footer from '../footer';
import { checkIsSelected } from './helpers';



function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();
    
    useEffect(() => {
        fetchProducts()
        .then( response => setProducts(response.data))
        .catch( error => console.log(error))
    }, []);

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);
      
        if (isAlreadySelected) {
          const selected = selectedProducts.filter(item => item.id !== product.id);
          setSelectedProducts(selected);
        } else {
          setSelectedProducts(previous => [...previous, product]);
        }
      }

    return (
        <>
            <div className="orders-container"> 
            <StepsHeader />
            <ProductList 
            products={products} 
            onSelectProduct={handleSelectProduct}
            selectedProducts={products}
            />
            <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
            <OrderSummary />

            </div>
             <Footer />
        
        </>


        
    )

}
export default Orders;