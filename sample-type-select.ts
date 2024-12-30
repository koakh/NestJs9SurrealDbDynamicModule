import { Surreal } from 'surrealdb';

export class RagEmbeddingCollection {
  title: string;
  file: string;
  path: string;
  filePath: string;
  sha256: string | unknown;
  chunks: number;
  creator: string;
  processing?: boolean;
}

// Initialize the SurrealDB client
const db = new Surreal('http://localhost:8888');

// Function to fetch data
async function fetchRagEmbeddingCollections(): Promise<RagEmbeddingCollection[]> {
  try {
    // Connect to the database
    await db.connect('root', 'root');

    // Perform the SELECT query and type the result
    const result = await db.select<RagEmbeddingCollection>('RagEmbeddingCollection');

    // Return the typed result
    return result;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  } finally {
    // Close the database connection
    await db.close();
  }
}

// Usage
fetchRagEmbeddingCollections().then((collections) => {
  collections.forEach((collection) => {
    console.log(collection.title); // Access properties with type safety
  });
});