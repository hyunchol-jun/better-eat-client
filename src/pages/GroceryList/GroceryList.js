import "./GroceryList.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAllUserGroceryItems, 
        removeGroceryItemFromUser, 
        appendGroceryItemToUser} 
    from "../../utils/http-helper";
import Loading from "../../components/Loading/Loading";
import SimpleForm from "../../components/SimpleForm";
import Message from "../../components/Message";

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
            console.log(groceryItemsRef.current)
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
        <main className="grocery-list">
            <h1>Grocery List</h1>
            <SimpleForm handleSubmit={handleAddGroceryItem} buttonText="Add"></SimpleForm>
            {message && <Message message={message} isSuccess={false}></Message>}
            <ul className="grocery-list__list">
                {groceryItems.map((item, index) => {
                    return (
                        <li key={index} className="grocery-list__item">
                            <label className={`grocery-list__name ${item.checked ? "grocery-list__name--checked": ""}`}>
                                {item.item_name}
                                <input 
                                    className="grocery-list__checkbox"
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleGroceryItemsChange(index)}
                                />
                                <span className="grocery-list__checkmark"></span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default GroceryList;