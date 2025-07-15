# Memeplier: System Architecture Specification

## 1. System Overview

This document specifies the architecture for **Memeplier**, an API-only service for finding contextually relevant memes and reaction images based on a text query, built entirely on the Cloudflare developer platform.

The system is designed to be consumed by external clients, such as Telegram or Twitter bots, which will handle all user-facing interaction.


| Module Responsibility | Primary Cloudflare Service | Description |
| :--- | :--- | :--- |
| **Image Object Storage** | `Cloudflare R2` | Stores all meme image files (JPEG, GIF, PNG, etc.). Acts as the primary source of truth for assets. |
| **Vector Embeddings** | `Cloudflare Vectorize` | Stores vector embeddings of meme text and LLM-generated meme image alt text for semantic search capabilities. |
| **Relational Metadata** | `Cloudflare D1` | Stores meme metadata, including R2 object keys, source text, usage statistics, and tags. |
| **Backend Compute & Logic** | `Cloudflare Workers` | Serverless execution environment for all business logic, including API handlers and data processing pipelines. |
| **AI Model Inference** | `Cloudflare Workers AI` | Provides serverless GPU-powered inference for text embedding and image-to-text generation. |
| **API Endpoint Management** | `Cloudflare API Gateway` | Manages, secures, and routes all incoming API requests to the appropriate Workers. |
| **Web UI Hosting** | `Cloudflare Pages` | Hosts the static frontend application for direct user interaction. |
| **Asset Delivery** | `Cloudflare CDN` | Caches and serves images from R2 and the web application from Pages for low-latency global delivery. |
| **Admin/Internal Security**| `Cloudflare Access` | Secures internal endpoints (e.g., the upload endpoint) using a Zero Trust access model. |




### 1.1. Core Modules

The system is composed of three primary logical modules:

1.  **Data Ingestion Pipeline:** Responsible for processing and storing new meme images. It handles image storage, text extraction/generation, and creating vector embeddings for search.
2.  **Search API:** Exposes an endpoint that takes a user's text query, performs a semantic search against the meme database, and returns the most relevant results.
3.  **Bot Integration Layer:** Provides webhook endpoints to receive requests from external bot platforms and translate them into calls to the Search API.

### 1.2. Core Workflows

-   **Data Ingestion Flow:**
    1.  An automated parser or administrator finds a new meme.
    2.  The image and any associated text are submitted to the **Data Ingestion Pipeline**.
    3.  The pipeline stores the image, generates a text description, creates a searchable vector embedding from the text, and saves all associated metadata.

-   **Meme Search Flow:**
    1.  A user sends a message to a bot (e.g., on Telegram).
    2.  The bot forwards the user's query to the **Bot Integration Layer** via a webhook.
    3.  The integration layer calls the **Search API** with the user's query.
    4.  The Search API converts the query into a vector, finds the most similar memes in the database, and returns their URLs.
    5.  The integration layer formats this response and sends the meme back to the user via the bot platform.

---

## 2. Module Overview

### 2.1. Data Ingestion Module

-   **Responsibility:** To process and store new memes, making them available for search.
-   **Endpoint:** `POST /v1/memes`
-   **Cloudflare Services:** Worker, R2, D1, Vectorize, Workers AI.
-   **Input:** `multipart/form-data` containing:
    -   `image`: The image file.
    -   `source_text` (optional): Text associated with the meme.
    -   `source_url` (optional): The URL where the meme was found.
-   **Processing Logic:**
    1.  A Worker receives the request.
    2.  **Text Generation:**
        -   The Worker sends the `image` to a **[Chosen Image-to-Text Model]** on Workers AI to generate descriptive alt-text.
        -   If `source_text` is provided, it is also used for the embedding.
    3.  **Vectorization:** The final text is sent to a **[Chosen Text Embedding Model]** on Workers AI to create a vector embedding.
    4.  **Storage:**
        -   The image file is stored in an **R2** bucket.
        -   The vector embedding and its corresponding meme ID are stored in a **Vectorize** index.
        -   All other metadata (R2 object key, the text, the text hash, source URL) is stored in a **D1** database table.
-   **Output:** `201 Created` with the ID of the newly created meme record.

### 2.2. Search API Module

-   **Responsibility:** To find and return memes based on a semantic text search.
-   **Endpoint:** `GET /v1/search`
-   **Cloudflare Services:** Worker, D1, Vectorize, Workers AI.
-   **Input:**
    -   `q` (query parameter): The user's search text.
-   **Processing Logic:**
    1.  A Worker receives the request and validates the `q` parameter.
    2.  **Query Vectorization:** The Worker sends the query text to the **[Chosen Text Embedding Model]** on Workers AI to generate a query vector.
    3.  **Semantic Search:** The Worker uses the query vector to search the **Vectorize** index for the most similar meme vectors. The number of results to return should be configurable.
    4.  **Metadata Retrieval:** The Worker takes the IDs of the top-matching memes from Vectorize and retrieves their full metadata (specifically the R2 object key) from the **D1** database.
    5.  **URL Generation:** For each result, the Worker generates a temporary, signed URL that grants public, short-lived read access to the image file in the R2 bucket.
-   **Output:** `200 OK` with a JSON object containing a list of results. Each result includes the meme text and the signed R2 URL.
    ```json
    {
      "results": [
        {
          "text": "The meme's source text or alt-text",
          "url": "https://<signed-r2-url-for-image>"
        }
      ]
    }
    ```

### 2.3. Bot Integration Layer

-   **Responsibility:** To act as a backend for various chat bots.
-   **Endpoint(s):** e.g., `POST /v1/bots/telegram`, `POST /v1/bots/twitter`
-   **Cloudflare Services:** Worker, API Gateway.
-   **Processing Logic:**
    1.  A dedicated Worker for each bot platform receives a webhook request (e.g., from Telegram).
    2.  It parses the platform-specific payload to extract the user's identity and query text.
    3.  It calls the **Search API Module's** logic internally to retrieve meme results for the query.
    4.  It formats the results into the response structure required by the bot platform's API (e.g., `sendMessage` with a photo URL for Telegram).
    5.  It sends the formatted response back to the bot platform to be delivered to the end-user.

---

## 3. Software Module Decomposition (TypeScript)

This section outlines a potential structure for the project's codebase, breaking down each system module into specific files, services, and utilities.

### 3.1. Data Ingestion Module (`ingestion-worker`)

This module is a Cloudflare Worker responsible for the `POST /v1/memes` endpoint.

-   **`ingestion-worker/index.ts`**: The main entry point for the worker.
    -   **Responsibility:** Handles the incoming `Request`, orchestrates the entire ingestion flow, manages error handling, and sends the final `Response`. It will call the various services in sequence.

-   **`ingestion-worker/ingestion-service.ts`**: The core business logic for the ingestion flow.
    -   **Responsibility:** Contains the primary function that takes the parsed request data and performs the step-by-step logic: generating text, checking for duplicates, creating embeddings, and storing all data. This separates the core logic from the HTTP request/response handling in `index.ts`.

-   **`shared/services/ai-service.ts`**: A service for interacting with Workers AI.
    -   **Responsibility:** Provides abstracted functions to call the AI models. It will expose methods like `generateAltText(image: ArrayBuffer)` and `generateTextEmbedding(text: string | string[])`. This keeps all AI model interaction in one place.

-   **`shared/services/storage-service.ts`**: A consolidated service for all storage operations.
    -   **Responsibility:** Manages interactions with R2, D1, and Vectorize. It will expose a clean API for the rest of the application, such as:
        -   `uploadImageToR2(id: string, image: ArrayBuffer)`
        -   `storeMemeMetadataInD1(metadata: MemeMetadata)`
        -   `insertVector(id: string, vector: number[])`
        -   `findMemeByTextHash(hash: string)`

-   **`shared/utils/request-parser.ts`**: A utility for handling incoming requests.
    -   **Responsibility:** Parses the `multipart/form-data` from the request object to extract the image file, `source_text`, and other fields.

-   **`shared/types.ts`**: A file for shared TypeScript type definitions.
    -   **Responsibility:** Defines common data structures, like the `MemeMetadata` object that is stored in D1, to ensure type safety across modules.

### 3.2. Search API Module (`search-worker`)

This module is a Cloudflare Worker responsible for the `GET /v1/search` endpoint.

-   **`search-worker/index.ts`**: The main entry point for the worker.
    -   **Responsibility:** Parses the incoming search query from the URL, calls the `SearchService` to perform the search, formats the results, and returns the final JSON response.

-   **`search-worker/search-service.ts`**: The core business logic for the search flow.
    -   **Responsibility:** Contains the primary function that takes a query string and orchestrates the search. It will:
        1.  Use the `ai-service.ts` to vectorize the query.
        2.  Use the `storage-service.ts` to find similar vectors in Vectorize.
        3.  Use the `storage-service.ts` to retrieve the corresponding metadata from D1.
        4.  Use the `storage-service.ts` to generate signed URLs for the images in R2.

-   **Shared Modules:** This worker will reuse the following from the `shared/` directory:
    -   `shared/services/ai-service.ts`
    -   `shared/services/storage-service.ts`
    -   `shared/types.ts`

### 3.3. Bot Integration Layer (`bot-worker`)

This module is a single Cloudflare Worker that handles webhooks from multiple bot platforms.

-   **`bot-worker/index.ts`**: The main entry point and router.
    -   **Responsibility:** Inspects the request URL (e.g., `/v1/bots/telegram`) and delegates the request to the appropriate platform-specific handler.

-   **`bot-worker/search-client.ts`**: An internal client for calling the Search API.
    -   **Responsibility:** Provides a simple, abstracted function `findMemes(query: string)` that makes a service-to-service call to the `search-worker`. This decouples the bot logic from the search implementation.

-   **`bot-worker/handlers/telegram-handler.ts`**: Logic for handling Telegram webhooks.
    -   **Responsibility:**
        1.  Defines TypeScript types for Telegram's webhook payload.
        2.  Parses the incoming request to extract the user's chat ID and message text.
        3.  Calls the `search.client.ts` to get meme results.
        4.  Formats the results into a valid response for the Telegram Bot API (e.g., a `sendMessage` or `sendPhoto` payload).
        5.  Returns the formatted response.

-   **`bot-worker/handlers/twitter-handler.ts`**: (Example) Logic for handling Twitter webhooks.
    -   **Responsibility:** Similar to the Telegram handler, but specific to the data structures and response formats of the Twitter API.
