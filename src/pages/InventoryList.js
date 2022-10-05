import {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SimpleForm from "../components/SimpleForm";
import PageMain from "../components/PageMain";
import SecondaryButton from "../components/SecondaryButton";
import Loading from "../components/Loading/Loading";

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

const StyledLabel = styled.label`
    display: flex;
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    @media (min-width: 768px) {
        font-size: 1.25rem;
        padding-left: 2.5rem;
    }

    @media (min-width: 1280px) {
        font-size: 1.5rem;
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:hover ~ .checkmark {
            background-color: var(--secondary-text-color);
        }
    
        &:checked ~ .checkmark {
            background-color: var(--primary-color);
        
            &:after {
                display: block;
            }
        }
    }
`;

const StyledCheckmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 1.25rem;
    width: 1.25rem;
    background-color: var(--outline-color);
    border-radius: 3px;

    @media (min-width: 768px) {
        top: 0.15rem;
        height: 1.5rem;
        width: 1.5rem;
    }

    &:after {
        content: "";
        position: absolute;
        display: none;
    
        left: 0.5rem;
        top: 0.25rem;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);

        @media (min-width: 768px) {
            width: 7.5px;
            height: 12.5px;
        }
    }
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
            console.log(uncheckedItems)
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
                            <StyledLabel>
                                {item.item_name}
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => handleItemChange(index)}
                                />
                                <StyledCheckmark className="checkmark"></StyledCheckmark>
                            </StyledLabel>
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