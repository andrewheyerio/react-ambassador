import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import {Product} from "../models/product";
import axios from "axios";
import {Filters} from "../models/filters";

const ProductsFrontend = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        s: '',
        sort: '',
    })


    useEffect( () => {
        (
            async () => {
                const {data} = await axios.get('products/frontend')
                setAllProducts(data)
                setFilteredProducts(data)

            }
        )()
    }, [])

    useEffect( () => {
        let products = allProducts.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
                                               p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0)

        // A manual way of sorting the data using js as opposed to an API called
        if ( filters.sort === 'asc') {
            products.sort((a: Product, b: Product) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0
            })
        } else if ( filters.sort === 'desc') {
            products.sort((a: Product, b: Product) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0
            })
        }

        setFilteredProducts(products)
    }, [filters])



    return (
        <Layout>
            <Products products={filteredProducts} filters={filters} setFilters={setFilters}/>
        </Layout>
    );
};

export default ProductsFrontend;