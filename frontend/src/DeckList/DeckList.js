import React, {useState} from 'react'
import axios from "axios"
import {address} from "../serverAddress"
import DeckCard from './DeckCard';
import Modal from '../Components/Modal';
import Admin from './Admin';


export default function DeckList(props) {
    
    const [show, setShow] = useState(false);
    const [input, setInput] = useState("")
    const [showAccount, setShowAccount] = useState(false)
    const [password, setPassword] = useState("")

    

    const handleCreateDeck = () => {
        axios.post(address + "/deck/create/", {name: input, password: props.account.password})
        .then((response) => {
            if(response.data.success === false){
                alert(response.data.msg)
            }
            props.fetchDecks()
            setShow(false)
        })          
    }

    const select = (id) => {
        props.select(id)
    }

   
    return (
        <div className='flex flex-col gap-3 p-4'>
            <div className='flex justify-between gap-2'>
                <div className='standardButton' onClick={() => {setShowAccount(true)}}>
                    Account
                </div>
                {
                    props.account !== undefined &&
                      
                    <div className='standardButton' onClick={() => {setShow(true)}}>
                        Create Deck
                    </div>
                }
                

            </div>
            {
                props.decks && props.decks.map((deck, index) => {
                    return (
                        <DeckCard key={index} data={deck} select={select} account={props.account} delete={props.fetchDecks()}/>

                    )
                })
            }
                <Modal show={show}>
                <div className='flex flex-row-reverse'>
                    <div className='p-2 font-bold' onClick={() => {setShow(false)}}>
                        X   
                    </div>
                </div>
                <div>
                    <p>Deck name:</p>
                    <input className='standardInput' onChange={(e) => {setInput(e.target.value)}}/>


                    <div className='standardButton' onClick={()  => {handleCreateDeck()}}>
                        Confirm
                    </div>
                </div>
            </Modal>
            <Modal show={showAccount}>
                <div className='flex justify-between'>
                    <div className=''>
                        <p className='text-xl'>Account settings</p>
                    </div>
                    <div className=' font-bold' onClick={() => { setShowAccount(false) }}>
                        X
                    </div>
                </div>
                <div className='pt-5'>



                    {
                        props.account === undefined ?

                            <div>
                                <p>Password</p>
                                <input className='standardInput' onChange={(e) => { setPassword(e.target.value) }} />


                                <div className='standardButton' onClick={() => { props.handleLogin(password) }}>
                                    Login
                                </div>
                            </div>
                            :
                            <div>
                                <p>Logged in as {props.account.name}</p>
                                <div className='standardButton' onClick={() => { props.handleLogout() }}>
                                    Logout
                                </div>

                                {
                                    props.account.admin == "true" &&
                                    <Admin account={props.account}/>
                                        
                                }
                            </div>
                    }
                </div>
            </Modal>
        </div>
    )
}