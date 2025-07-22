import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# TF-IDF will turn the text from the product into numeric vectors
# use cosine similarity to find the most similar entries

# Step 1: sample data to replace with data from db later
products = pd.DataFrame([
    {"id": 1, "title": "Handmade Clay Mug", "description": "A cozy mug for tea or coffee", "category": "Kitchen"},
    {"id": 2, "title": "Rustic Wooden Spoon", "description": "Carved from oak, perfect for cooking", "category": "Kitchen"},
    {"id": 3, "title": "Crochet Cat Toy", "description": "Colorful toy for cats made of yarn", "category": "Pets"},
    {"id": 4, "title": "Wool Knit Scarf", "description": "Warm scarf for winter days", "category": "Clothing"},
    {"id": 5, "title": "Ceramic Plate", "description": "Hand-painted dinner plate", "category": "Kitchen"},
])

# Step 2: combine fields into one string
products['combined'] = products.apply(
    lambda row: f"{row['title']} {row['description']} {row['category']}", axis=1
)

# Step 3: TF-IDF vectorization
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(products['combined'])

# Step 4: Cosine similarity
cosine_sim = cosine_similarity(tfidf_matrix)

# Step 5: Recommend top N similar products for each product
def get_recommendations(index, top_n=3):
    scores = list(enumerate(cosine_sim[index]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    scores = scores[1:top_n + 1]  # skip the product itself
    recommended_ids = [products.iloc[i[0]]['id'] for i in scores]
    return recommended_ids

# Step 6: Output recommendations
for i in range(len(products)):
    prod_id = products.iloc[i]['id']
    recs = get_recommendations(i)
    print(f"Product {prod_id} recommended IDs: {recs}")