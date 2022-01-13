import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../../store/session'
import { Modal } from '../../context/Modal'
import SignupForm from '../SignupFormPage'
import logo from '../../images/logo-black.png'
import './LoginForm.css';

const LoginForm = ({ showModal, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);
    const [switchModal, setSwitchModal] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const res = await dispatch(login({ credential, password }))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

        if (res.ok) {
            history.push('/')
        }
    }

    return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <img className='logo' src={logo} />
            <div className='login-header'>Log in to Rock Flickr</div>
            <ul>
                {errors.map((error, idx) => <li className='errors'key={idx}>{error}</li>)}
            </ul>
            <input
                className='formField'
                type='text'
                placeholder='Username or Email'
                required
                onChange={(e) => setCredential(e.target.value)}
                value={ credential }
            />
            <input
                className='formField'
                type='password'
                paceholder='password'
                required
                onChange={(e) => setPassword(e.target.value)}
                value={ password }
            />
            <button className='button'type='submit'>Log in</button>
            <div>Not a member?
                <span
                    // onClick={() => {
                    //     // setShowModal(false);
                    //     setSwitchModal(true)
                    // }}
                >Sign up here</span>
            </div>
            {/* {switchModal && (
                <Modal onClose={() => setSwitchModal(false)}>
                    <SignupForm />
                </Modal>
            )} */}
        </form>
    )
}

export default LoginForm
