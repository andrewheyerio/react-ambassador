import React, {Dispatch, useState} from 'react';
import {User} from "../models/user";
import {connect} from "react-redux";
import {Link, Navigate} from 'react-router-dom';
import axios from "axios";
import {setUser} from "../redux/actions/setUserAction";
import { NavLink } from 'react-router-dom';

const Nav = (props: any) => {

    // W have to use states becuase if we try to logout using just onclick, by the time we navigated to the new page
    // axios never has had a chance to make a logout request
    const logout = async () => {
        await axios.post('logout')
        props.setUser(null)
    }


    let menu;

    if (props.user?.id) {
        menu = (
            <div className="col-md-5 text-end">
                <a href={"/rankings"} type="button" className=" text-center ">Rankings</a>
                <a href={"/stats"} type="button" className=" text-center ">Stats</a>
                <a type="button" className="btn btn-outline-primary me-2"
                onClick={logout}
                >Logout</a>
                <Link to={'/profile'} className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/login'} type="button" className="btn btn-outline-primary me-2">Login</Link>
                <Link to={'/register'} type="button" className="btn btn-primary">Sign-up</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">


                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><NavLink to={'/'} className="nav-link px-2 link-secondary">Frontend</NavLink></li>
                    <li><NavLink to={'/backend'} className="nav-link px-2 link-dark">Backend</NavLink></li>
                </ul>
                {menu}
            </header>
        </div>
    );
};

export default connect(
    (state: {user: User}) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Nav);