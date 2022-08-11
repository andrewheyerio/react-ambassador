import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios"
import {Product} from "../models/product";

const ProductsBackend = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState({
        s: ''
    })

    useEffect( () => {
        (
           async () => {

               const arr = []

               if (filters.s) {
                   arr.push(`s=${filters.s}`)
               }

               const {data} = await axios.get(`products/backend?${arr.join('&')}`)
               setProducts(data.data)
           }
        )()
    }, [filters]) // by adding filters are a deps, we call this effect anytime filters changes

    return (
        <Layout>
            <Products products={products} filters={filters} setFilters={setFilters}/>
        </Layout>
    );
};

export default ProductsBackend;