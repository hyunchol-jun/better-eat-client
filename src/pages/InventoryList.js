import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const StyledMain = styled.main`
    margin: 0 1rem;
    min-height: calc(100vh - 7rem);
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const StyledInput = styled.input`
    width: 100%;
    border-radius: 0.5rem;
    border: 1.5px solid #cccccc;
    padding: 0.5rem 1rem;
    font-family: inherit;

    &:focus {
        outline: none;
        border: 1.5px solid var(--primary-color);
    }
`;

const SecondaryButton = styled.button`
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--secondary-color);
    color: white;
    flex-shrink: 0;
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem;
    border-bottom: 1px solid var(--outline-color);

    &:hover {
        background-color: var(--outline-color);
    }

    &:last-child {
        border-bottom: none;
    }
`;

const StyledSpan = styled.span`
    width: 100%;
`;

function InventoryList({handleSearch}) {
    // Check if logged in
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

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
        <StyledMain>
            <h1>Inventory List</h1>
            <section>
                <StyledForm onSubmit={handleAdd}>
                    <StyledInput type="text" name="textInput" required/>
                    <Button buttonText={"Add"}></Button>
                </StyledForm>
            </section>
            <ul>
                {inventoryItems.map((item, index) => {
                    return (
                        <StyledListItem key={index}>
                            <StyledSpan>{item}</StyledSpan>
                            <SecondaryButton  onClick={() => handleDelete(index)}>Delete</SecondaryButton>
                            <SecondaryButton onClick={(event) => handleSearchRecipe(event, item)}>Search recipes</SecondaryButton>
                        </StyledListItem>
                    );
                })}
            </ul>
        </StyledMain>
    );
}

export default InventoryList;