import {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import {getAllUserInventoryItems, 
        removeInventoryItemFromUser, 
        appendInventoryItemToUser} 
    from "../utils/http-helper";
import styled from "styled-components";
import SimpleForm from "../components/SimpleForm";
import PageMain from "../components/PageMain";
import SecondaryButton from "../components/SecondaryButton";
import Loading from "../components/Loading/Loading";
import CheckBox from "../components/CheckBox";
import Message from "../components/Message";

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
    justify-content: space-between;
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
    const [message, setMessage] = useState("");
    const inventoryItemsRef = useRef();

    const handleAddItem = (event) => {
        event.preventDefault();

        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        appendInventoryItemToUser({item_name: event.target.textInput.value}, headers, (response) => {
            const newItem = response.data;
            newItem.checked = false;
            setInventoryItems((prevState) => {
                const newState = [...prevState, newItem];
                inventoryItemsRef.current = newState;
                return newState;
            });
        }, (error) => {
            setMessage(error.response.data.message);
            setTimeout(() => setMessage(""), 1000);
        });

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

    const deleteAllCheckedItemsFromServer = (itemsArray, headers, callback) => {
        if (itemsArray) {
            itemsArray.forEach(item => {
                if (item.checked) {
                    headers.data = {id: item.id};
                    removeInventoryItemFromUser(headers, callback);
                }
            });
        }
    }

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };
        
        getAllUserInventoryItems(headers, (response) => {
            const userItems = response.data;
            userItems.forEach(item => {
                item.checked = false;
            })
            inventoryItemsRef.current = userItems;
            setInventoryItems(userItems);
        });

        return function cleanUp() {
            deleteAllCheckedItemsFromServer(
                inventoryItemsRef.current,
                headers,
                response => console.log(response)
            );
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
            {message && <Message isSuccess={false}>{message}</Message>}
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