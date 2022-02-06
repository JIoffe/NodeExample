import express from 'express';

const inventoryApiRouter = (inventoryService) => {
    const router = express.Router();

    // GET LIST
    router.get('/', (req, res) => {
        const items = inventoryService.getInventory(req.query);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items || []));
    });

    // GET SPECIFIC
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        const item = inventoryService.findInventoryItem(id);

        writeRecordOr404(res, id, item);
    });

    // CREATE
    router.post('/', (req, res) => {
        const { displayName, price, category } = req.body;

        if(!displayName || !price || !category){
            res.writeHead(400);
            res.end('Requires displayName, price, category.');
        }else{
            const item = inventoryService.addInventoryItem({displayName, price, category});
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        }
    });

    // UPDATE
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const item = inventoryService.updateInventoryItem({...req.body, id});

        writeRecordOr404(res, id, item);
    });

    // DELETE
    router.delete('/:id', (req, res) => {
        const id = req.params.id;
        const item = inventoryService.deleteInventoryItem(id);

        writeRecordOr404(res, id, item);
    });

    return router;
}

function writeRecordOr404(res, id, item){
    if(!item){
        res.writeHead(404);
        res.end(`Item ID ${id} not found.`);
    }else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
    }
}

export default inventoryApiRouter;