// AWS Lambda API URL
const API_URL = "https://e0z7xxyqid.execute-api.us-east-2.amazonaws.com/items";

// Wait for the page to load
window.onload = function() {
    // Add event listeners
    document.getElementById('load-all-items').addEventListener('click', loadAllItems);
    document.getElementById('add-item-form').addEventListener('submit', addNewItem);
    
    // Load items 
    loadAllItems();
};

// Load all items from the database
function loadAllItems() {
    // Clear existing items
    document.getElementById('items-list').innerHTML = '';
    
    // Get request to load items
    let xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            let items = JSON.parse(xhr.responseText);
            
            // Display each item in the table
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                
                // Create a new row
                let row = document.createElement('tr');
                
                // Add the item data to the row
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td><button onclick="deleteItem('${item.id}')">Delete</button></td>
                `;
                
                // Add the row to the table
                document.getElementById('items-list').appendChild(row);
            }
        } else {
            alert('Error loading items');
        }
    };
    
    xhr.send();
}

// Add a new item
function addNewItem(event) {
    event.preventDefault();
    
    // Get form values
    let id = document.getElementById('item-id').value;
    let name = document.getElementById('item-name').value;
    let price = document.getElementById('item-price').value;
    
    // Create item object
    let item = {
        id: id,
        name: name,
        price: parseInt(price)
    };
    
    // Send PUT request to add item
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Reset form
            document.getElementById('add-item-form').reset();
            
            // Reload items
            loadAllItems();
            
            alert('Item added!');
        } else {
            alert('Error adding item');
        }
    };
    
    xhr.send(JSON.stringify(item));
}

// Delete an item
function deleteItem(id) {
    if (confirm('Delete this item?')) {
        // Send DELETE 
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `https://e0z7xxyqid.execute-api.us-east-2.amazonaws.com/${id}`);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Reload items
                loadAllItems();
                alert('Item deleted!');
            } else {
                alert('Error deleting item');
            }
        };
        
        xhr.send();
    }
}
