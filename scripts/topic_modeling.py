from sklearn.decomposition import NMF
from sklearn.feature_extraction.text import TfidfVectorizer
import os
from pinecone import Pinecone, ServerlessSpec

# Initialize Pinecone
pc = Pinecone(api_key="your_api_key")

# Select or create the index
index_name = "documents"

# Check if index exists, if not create it
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=1536,  # example dimension, set according to your vector size
        metric='euclidean',  # Set your distance metric
        spec=ServerlessSpec(
            cloud='aws',
            region='us-east-1'
        )
    )

index = pc.Index(index_name)

# Extract topics
def extract_topics(text):
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf = vectorizer.fit_transform([text])
    nmf = NMF(n_components=5, random_state=42)
    nmf.fit(tfidf)
    return nmf.components_

# Update Pinecone metadata
def update_metadata(doc_id, topics):
    metadata = {"topics": topics}
    # Use upsert for adding/updating vectors with metadata
    index.upsert(vectors=[(doc_id, topics, metadata)])

