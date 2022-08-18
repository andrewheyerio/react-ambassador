import React from 'react';
import {Product} from "../models/product";
import {Filters} from "../models/filters";


const Products = (props: {
    products: Product[]
    filters: Filters,
    setFilters: (filters: Filters) => void
}) => {

    // We use an input with onKeyUp to get the string from the HTML form, pass it to this function. This function
    // calls a function passed to it as a prop, from the Products Frontend and Products backend. This way this page
    // only ever gets the string for searching but allows products frontend and products backend to implement thier
    // search function in thier own way.
    const search = (s: string) => {
        props.setFilters({
            ...props.filters,
            s
        })
    }

    // The spread operator allows us to keep part of this prop the same as it was, and modify only a part of it.
    const sort = (sort: string) => {
        props.setFilters({
            ...props.filters,
            sort
        })
    }

    return (
        <>
            <div className="col-nmd-12 mb-4 input-group">
                <input type={"text"} className={"form-control"} placeholder={"Search"}
                onChange={e => search(e.target.value)}/>

                <div className={"input-group-append"}>
                    <select className={"form-select"}
                            onChange={e => sort(e.target.value)}>
                        <option>Select</option>
                        <option value={"asc"}>Price Ascending</option>
                        <option value={"desc"}>Price Descending</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {props.products.map(product => {
                    return(
                        <div className="col">
                            <div className="card shadow-sm">
                                <img src={product.image} height={200}/>

                                <div className="card-body">
                                    <p className="card-text">{product.title}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">${product.price}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    );
};

export default Products;