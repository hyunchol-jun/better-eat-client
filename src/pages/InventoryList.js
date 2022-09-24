import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function InventoryList({handleSearch}) {
    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, []);

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

    const handleDelete = (index) => {
        const copiedInventoryItems = [...inventoryItems];
        copiedInventoryItems.splice(index, 1);
        setInventoryItems(copiedInventoryItems);
    }

    const handleSearchRecipe = (event, itemName) => {
        handleSearch(event, itemName);

        navigate("/");
    }

    useEffect(() => {
        localStorage.setItem("inventoryList", JSON.stringify(inventoryItems));
    }, [inventoryItems]);

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
                            <button onClick={() => handleDelete(index)}>Delete</button>
                            <button onClick={(event) => handleSearchRecipe(event, item)}>Search recipe</button>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default InventoryList;