import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

const Profile = (props: any) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPasswordConfirm] = useState('')

    // Notice that we are calling user again, evern after we have called it in the Layout component. To prevent use
    // from making two calls we can use Redux. 
    useEffect(() => {
        setFirstName(props.user.first_name)
        setLastName(props.user.last_name)
        setEmail(props.user.email)
    }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const {data} = await axios.put('users/info', {
            first_name,
            last_name,
            email
        })

        props.setUser(data)
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put('users/password', {
            password,
            password_confirm
        })
    }

    return (
        <Layout>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className={"mb-3"}>
                    <label>First Name</label>
                    <input className={"form-control"}
                           defaultValue={"first_name"}
                           onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className={"mb-3"}>
                    <label>Last Name</label>
                    <input className={"form-control"}
                           defaultValue={"last_name"}
                           onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className={"mb-3"}>
                    <label>Email</label>
                    <input className={"form-control"}
                           defaultValue={"email"}
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <button className={"btn btn-outline-primary"} type={"submit"}>Submit</button>
            </form>

            <h3>Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className={"mb-3"}>
                    <label>Password</label>
                    <input className={"form-control"}
                           onChange={e => setPassword(e.target.value)}/>

                </div>
                <div className={"mb-3"}>
                    <label>Password Confirm</label>
                    <input className={"form-control"}
                           onChange={e => setPasswordConfirm(e.target.value)}/>
                </div>

                <button className={"btn btn-outline-primary"} type={"submit"}>Submit</button>
            </form>

        </Layout>
    );
};

export default connect((state: {user: User}) => ({
    user: state.user
}),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    }))(Profile);