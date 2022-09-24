import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAllUserGroceryItems} from "../utils/http-helper";

function GroceryList() {

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

    const [groceryItems, setGroceryItems] = useState(null);

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        getAllUserGroceryItems(headers, (response) => {
            setGroceryItems(response.data);
        })
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
                                <input type="checkbox" />
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