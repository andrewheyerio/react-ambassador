import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import axios from "axios"
import {Product} from "../models/product";
import {Filters} from "../models/filters";

const ProductsBackend = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        s: '',
        sort: '',
    })

    useEffect( () => {
        (
           async () => {

               const arr = []

               if (filters.s) {
                   arr.push(`s=${filters.s}`)
               }

               if (filters.sort) {
                   arr.push(`sort=${filters.sort}`)
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