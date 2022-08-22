import React, {useState} from 'react';
import {Product} from "../models/product";
import {Filters} from "../models/filters";


const Products = (props: {
    products: Product[],
    filters: Filters,
    setFilters: (filters: Filters) => void,
    lastPage: number
}) => {

    const [selected, setSelected] = useState<number[]>([])

    // We use an input with onKeyUp to get the string from the HTML form, pass it to this function. This function
    // calls a function passed to it as a prop, from the Products Frontend and Products backend. This way this page
    // only ever gets the string for searching but allows products frontend and products backend to implement thier
    // search function in thier own way.
    const search = (s: string) => {
        props.setFilters({
            ...props.filters,
            page: 1, // the reason we set this to 1 here & on sort is b/c we need to clear the products array on the backend setProducts call to work right.
            s
        })
    }

    // The spread operator allows us to keep part of this prop the same as it was, and modify only a part of it.
    const sort = (sort: string) => {
        props.setFilters({
            ...props.filters,
            page: 1,
            sort
        })
    }

    const load = () => {
        props.setFilters({
            ...props.filters,
            page: props.filters.page + 1
        })
    }

    const select = (id: number) => {

        console.log("howduy")
        console.log(selected)

        // Using the some function, check to see if our current select array any numbers s, who have the same id
        if(selected.some(s => s === id)) {
            // If that number in the array is the same, then delete that id. I think I can make this loop smarter if
            // necessary. Unless filter is smart already
            setSelected(selected.filter(s => s !== id));
        } else {

            // Our select fundtion wants to keep track of all selected product id's. So to capture that we will set our
            // selected array to consist of all id's that were selected before hand and after.
            setSelected([...selected, id])
        }
    }

    let button;

    if (props.filters.page !== props.lastPage) {
        button = (
            <div className={"d-flex justify-content-center mt-4"}>
                <button className={"btn btn-primary"} onClick={load}>Load More</button>
            </div>
        )
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
                        <div className="col" key={product.id}  onClick={() => select(product.id)}>
                            <div className={selected.some(s => s === product.id) ? "card shadow-sm selected" : "card shadow-sm"}>
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
            {button}
        </>
    );
};

export default Products;