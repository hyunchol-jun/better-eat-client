import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAllUserGroceryItems, removeGroceryItemFromUser} from "../utils/http-helper";

function GroceryList() {
    const [groceryItems, setGroceryItems] = useState(null);
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

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

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
            if (groceryItemsRef.current) {
                groceryItemsRef.current.forEach(item => {
                    if (item.checked) {
                        headers.data = {id: item.id};
                        removeGroceryItemFromUser(headers, 
                            (response) => {
                                console.log(response.data);
                        })
                    }
                });
            }
        }
    }, []);

    if (!groceryItems) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <main>
            <h1>Grocery List</h1>
            <ul>
                {groceryItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <label>
                                <input type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleGroceryItemsChange(index)}
                                />
                                {item.item_name}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}

export default GroceryList;