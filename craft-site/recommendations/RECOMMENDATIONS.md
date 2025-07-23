# Recommendation Feature Setup

Currently, this recommendation feature utilizes TF-IDF and cosine similarity to determine which products to recommend

## Requirements
 - Setup the Supabase database with a product table
 - Product table should have a title, description, and category

## Use a virtual environment to manage dependencies and packages:
 - To activate on Mac: source venv/bin/activate
 - To activate on Windows: venv\Scripts\activate
 - To deactivate: deactivate

## Tools used:
 1. supabase
 2. scikit-learn
 3. pandas

 Future versions will look at user purchase history, likes, watch time, etc

 ## How to run
  - Right now, the script needs to be run manually every so often
  - In the future, might set up service to automatically refresh at an interval