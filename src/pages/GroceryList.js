import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAllUserGroceryItems, 
        removeGroceryItemFromUser, 
        appendGroceryItemToUser} 
    from "../utils/http-helper";
import Loading from "../components/Loading/Loading";
import SimpleForm from "../components/SimpleForm";
import Message from "../components/Message";
import styled from "styled-components";
import PageMain from "../components/PageMain";
import CheckBox from "../components/CheckBox";

const StyledTitle = styled.h1`
    @media (min-width: 768px) {
        display: none;
    }
`;

const StyledUL = styled.ul`
    @media (min-width: 768px) {
        padding: 1rem 2rem;
    }

    @media (min-width: 1280px) {
        padding: 1rem 6rem;
    }
`;

const StyledListItem = styled.li`
    padding: 0.25rem 0;
`;

function GroceryList() {
    const [groceryItems, setGroceryItems] = useState(null);
    const [message, setMessage] = useState("");
    const groceryItemsRef = useRef();

    const handleGroceryItemsChange = (itemIndex) => {
        setGroceryItems((prevState) => {
            const copiedState = [...prevState];
            // Deep copy
            copiedState[itemIndex] = {...copiedState[itemIndex]};
            copiedState[itemIndex].checked = !copiedState[itemIndex].checked;
            groceryItemsRef.current = copiedState;
            return copiedState;
        });
    }

    const appendItemToList = (item) => {
        setGroceryItems((prevState) => {
            const copiedState = [...prevState, item];
            groceryItemsRef.current = copiedState;
            return copiedState;
        })
    }

    const deleteAllCheckedItemsFromServer = (itemsArray, headers, callback) => {
        if (itemsArray) {
            itemsArray.forEach(item => {
                if (item.checked) {
                    headers.data = {id: item.id};
                    removeGroceryItemFromUser(headers, callback);
                }
            });
        }
    }

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    // Get all the items from server upon mounting
    useEffect(() => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        getAllUserGroceryItems(headers, (response) => {
            const userItems = response.data;
            userItems.forEach(item => {
                item.checked = false;
            })
            setGroceryItems(userItems);
        });

        return function cleanUp() {
            deleteAllCheckedItemsFromServer(
                groceryItemsRef.current, 
                headers, 
                response => console.log(response)
            );
        }
    }, []);

    const handleAddGroceryItem = (event) => {
        event.preventDefault();

        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        appendGroceryItemToUser({itemName: event.target.textInput.value}, headers, (response) => {
            appendItemToList(response.data);
        }, (error) => {
            setMessage(error.response.data.message);
            setTimeout(() => setMessage(""), 1000);
        });

        event.target.reset();
    }

    if (!groceryItems) {
        return (
            <Loading />
        );
    }

    return (
        <PageMain>
            <StyledTitle>Grocery List</StyledTitle>
            <SimpleForm handleSubmit={handleAddGroceryItem} buttonText="Add"></SimpleForm>
            {message && <Message isSuccess={false}>{message}</Message>}
            <StyledUL>
                {groceryItems.map((item, index) => {
                    return (
                        <StyledListItem key={index}>
                            <CheckBox checked={item.checked} onChange={() => handleGroceryItemsChange(index)}>
                                {item.item_name}
                            </CheckBox>
                        </StyledListItem>
                    )
                })}
            </StyledUL>
        </PageMain>
    );
}

export default GroceryList;