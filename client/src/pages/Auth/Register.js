import React, { useContext, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { GlobalContext } from '../../utils/Context';
import { AuthContainer, ButtonsContainer, FormContainer } from './ModuleStyles';
import { FormButton, FormTitle, Input } from '../../components/GlobalStyles/GlobalStyles';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage('Register')
    }, [])

    const navigate = useNavigate()

    const [createUser] = useMutation(REGISTER_USER)

    const [info, setInfo] = useState({
        name: '',
        username: '',
        email: '',
        age: '',
        password: ''
    })

    const register = (e) => {
        e.preventDefault()
        createUser({
            variables: {
                name: info.name,
                username: info.username,
                email: info.email,
                password: info.password,
                age: info.age
            }
        })
            .then(res => {
                const user = res.data.createUser
                localStorage.setItem('user', JSON.stringify(user))
                setTimeout(() => {
                    user.isManager ? navigate('/dashboard') : navigate('/')
                }, 1000);
            })
            .catch(err => {
                alert(err)
            })
    }

    return (
        <AuthContainer>
            <FormContainer>
                <form className="form-box" onSubmit={register}>
                    <FormTitle style={{ marginBottom: '20px' }}>Register</FormTitle>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Name"
                        value={info.name}
                        onChange={(e) => setInfo({ ...info, name: e.target.value })}></Input>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Username"
                        value={info.username}
                        onChange={(e) => setInfo({ ...info, username: e.target.value })}></Input>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Email"
                        value={info.email}
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}></Input>
                    <Input style={{ margin: '10px 0' }}
                        type="number"
                        placeholder="Age"
                        value={info.age}
                        onChange={(e) => setInfo({ ...info, age: Number(e.target.value) })}></Input>
                    <Input style={{ margin: '10px 0' }}
                        placeholder="Password"
                        type="password"
                        value={info.password}
                        onChange={(e) => setInfo({ ...info, password: e.target.value })}></Input>
                    <ButtonsContainer>
                        <FormButton style={{ border: '2px solid #ff6899', background: "#fff", color: "#ff6899" }}
                            onClick={() => navigate('/login')}
                        >Log In</FormButton>
                        <FormButton type="submit">Register</FormButton>
                    </ButtonsContainer>
                </form>
            </FormContainer>
        </AuthContainer>
    )
}

export default Register
