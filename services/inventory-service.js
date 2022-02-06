// All in memory as an implementation
const inventory = [
    {
        "id": generateId(),
        "displayName": "Potato Chips",
        "price": 1.50,
        "category": "Food",
    },
    {
        "id": generateId(),
        "displayName": "Lawn Chair",
        "price": 50,
        "category": "Furniture"
    }
]

export class InventoryService{
    constructor(){

    }

    getInventory(filters){
        if(filters){
            const propNames = Object.keys(filters);

            return inventory.filter(item => {
                return propNames.every(key => (''+item[key]).toLocaleLowerCase() === (''+filters[key]).toLocaleLowerCase());
            });
        }

        return inventory;
    }

    findInventoryItem(id){
        return inventory.find(item => item.id === id);
    }

    addInventoryItem(props){
        const record = {
            ...props,
            id: generateId()
        };

        console.log('Creating item: %o', record);
        return inventory[inventory.push(record) - 1];
    }

    updateInventoryItem({id, ...props}){
        const record = inventory.find(item => item.id === id);

        if(!record)
            return null;

        Object.keys(props).forEach(k => record[k] = props[k]);

        console.log('Updated record: %o', record);
        return record;
    }

    deleteInventoryItem(id){
        const i = inventory.findIndex(item => item.id === id);
        
        if(i < 0)
            return null;

        const record = inventory[i];
        inventory.splice(i, 1);

        console.log('Deleted record: %o', record);
        return record;
    }
}


function generateId(){
    return `${+new Date()}-${String.fromCharCode(...[0,0,0,0].map(x => Math.floor(Math.random() * 25)+97))}`;
}