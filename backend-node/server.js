const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const INDEX_NAME = 'orders';

const esClient = new Client({ node: ELASTICSEARCH_URL });

app.use(cors());
app.use(express.json());

// Initialize Elasticsearch index on startup
async function initializeIndex() {
  try {
    const indexExists = await esClient.indices.exists({ index: INDEX_NAME });

    if (!indexExists) {
      const mapping = require('./orderIndexMapping.json');
      await esClient.indices.create({
        index: INDEX_NAME,
        body: mapping,
      });
      console.log(`✓ Index "${INDEX_NAME}" created successfully`);
    } else {
      console.log(`✓ Index "${INDEX_NAME}" already exists`);
    }
  } catch (error) {
    console.error('Error initializing Elasticsearch index:', error);
    process.exit(1);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// POST endpoint to create an order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, address, email, items } = req.body;

    if (!customerName || !address || !email || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderDoc = {
      customerName,
      address,
      email,
      items,
      createdAt: new Date().toISOString(),
    };

    const result = await esClient.index({
      index: INDEX_NAME,
      document: orderDoc,
    });

    res.status(201).json({
      success: true,
      orderId: result._id,
      order: orderDoc,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET endpoint to retrieve orders (optional, for debugging)
app.get('/api/orders', async (req, res) => {
  try {
    const result = await esClient.search({
      index: INDEX_NAME,
      body: {
        query: { match_all: {} },
        size: 100,
      },
    });

    const orders = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    res.json({ total: result.hits.total.value, orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// Start server
app.listen(PORT, async () => {
  await initializeIndex();
  console.log(`Server running on port ${PORT}`);
});
