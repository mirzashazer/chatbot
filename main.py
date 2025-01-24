# main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Product, Supplier
from langgraph import Chatbot

app = FastAPI()

# Initialize chatbot
chatbot = Chatbot("openai", model_name="gpt-3.5-turbo")

@app.get("/query")
async def handle_query(user_query: str, db: Session = Depends(get_db)):
    # Extract information from the database
    if "brand" in user_query:
        brand_name = user_query.split("brand")[-1].strip()
        products = db.query(Product).filter(Product.brand == brand_name).all()
        data = [{"name": p.name, "price": p.price, "category": p.category} for p in products]
    elif "suppliers" in user_query:
        category = user_query.split("provide")[-1].strip()
        suppliers = db.query(Supplier).filter(Supplier.product_categories.ilike(f"%{category}%")).all()
        data = [{"name": s.name, "contact": s.contact_info} for s in suppliers]
    else:
        data = []

    # Enhance response using LLM
    response = chatbot.ask(f"Summarize the following: {data}")
    return {"response": response}
