import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SimpleForm from "../components/SimpleForm";
import PageMain from "../components/PageMain";
import SecondaryButton from "../components/SecondaryButton";

const StyledTitle = styled.h1`
    @media (min-width: 768px) {
        display: none;
    }
`;

const StyledUL = styled.ul`
    padding: 0.5rem 2rem;

    @media (min-width: 768px) {
        padding: 1rem 2rem;
    }

    @media (min-width: 1280px) {
        padding: 1rem 6rem;
    }
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--outline-color);

    @media (min-width: 768px) {
        padding: 0.75rem;
    }

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
        <PageMain>
            <StyledTitle>Inventory List</StyledTitle>
                <SimpleForm handleSubmit={handleAdd} buttonText="Add"></SimpleForm>
            <StyledUL>
                {inventoryItems.map((item, index) => {
                    return (
                        <StyledListItem key={index}>
                            <StyledSpan>{item}</StyledSpan>
                            <SecondaryButton  onClick={() => handleDelete(index)}>Delete</SecondaryButton>
                            <SecondaryButton onClick={(event) => handleSearchRecipe(event, item)}>Search recipes</SecondaryButton>
                        </StyledListItem>
                    );
                })}
            </StyledUL>
        </PageMain>
    );
}

export default InventoryList;