import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function InventoryList() {
    const inventoryItemsFromStorage = localStorage.getItem("inventoryList");
    const [inventoryItems, setInventoryItems] = useState(
        inventoryItemsFromStorage
            ? JSON.parse(inventoryItemsFromStorage) : []
    );

    const handleAdd = (event) => {
        event.preventDefault();

        setInventoryItems([...inventoryItems, event.target.textInput.value]);
        event.target.reset();
    };

    useEffect(() => {
        localStorage.setItem("inventoryList", JSON.stringify(inventoryItems));
    }, [inventoryItems]);

    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

    return (
        <main>
            <h1>Inventory List</h1>
            <section>
                <form onSubmit={handleAdd}>
                    <input type="text" name="textInput"/>
                    <button>Add</button>
                </form>
            </section>
            <ul>
                {inventoryItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <span>{item}</span>
                            <button>Delete</button>
                            <button>Search recipe</button>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default InventoryList;