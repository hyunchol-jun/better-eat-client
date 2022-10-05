import {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SimpleForm from "../components/SimpleForm";
import PageMain from "../components/PageMain";
import SecondaryButton from "../components/SecondaryButton";
import Loading from "../components/Loading/Loading";
import CheckBox from "../components/CheckBox";

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
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.25rem 0;
    
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

    const [inventoryItems, setInventoryItems] = useState(null);
    const inventoryItemsRef = useRef();

    const handleAddItem = (event) => {
        event.preventDefault();

        const newItem = {
            item_name: event.target.textInput.value,
            checked: false
        };

        setInventoryItems((prevState) => {

            const newState = [...prevState, newItem];
            inventoryItemsRef.current = newState;
            return newState;
        })

        event.target.reset();
    };

    const handleItemChange = (itemIndex) => {
        setInventoryItems((prevState) => {
            const copiedState = [...prevState];
            copiedState[itemIndex] = {...copiedState[itemIndex]};
            copiedState[itemIndex].checked = !copiedState[itemIndex].checked;
            inventoryItemsRef.current = copiedState;
            return copiedState;
        })
    };

    const handleSearchRecipe = (event, itemName) => {
        handleSearch(event, itemName);

        navigate("/");
    }

    useEffect(() => {
        const inventoryItemsFromStorage = JSON.parse(localStorage.getItem("inventoryList")) || [];
        inventoryItemsRef.current = inventoryItemsFromStorage;
        setInventoryItems(inventoryItemsFromStorage);
        
        return function cleanUp() {
            const uncheckedItems = inventoryItemsRef.current.filter(item => !item.checked);
            localStorage.setItem("inventoryList", JSON.stringify(uncheckedItems));
        }
    }, []);

    if (!inventoryItems) {
        return (
            <Loading />
        );
    }

    return (
        <PageMain>
            <StyledTitle>Inventory List</StyledTitle>
                <SimpleForm handleSubmit={handleAddItem} buttonText="Add"></SimpleForm>
            <StyledUL>
                {inventoryItems.map((item, index) => {
                    return (
                        <StyledListItem key={index}>
                            <CheckBox checked={item.checked} onChange={() => handleItemChange(index)}>
                                {item.item_name}
                            </CheckBox>
                            <SecondaryButton 
                                onClick={(event) => handleSearchRecipe(event, item.item_name)}>
                                Search recipes
                            </SecondaryButton>
                        </StyledListItem>
                    );
                })}
            </StyledUL>
        </PageMain>
    );
}

export default InventoryList;