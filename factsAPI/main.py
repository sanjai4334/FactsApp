import os
from random import shuffle
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Command to start API: uvicorn main:app --reload

class Stack:
    def __init__(self) -> None:
        self.stack = []
    
    def push(self, item):
        self.stack.append(item)
        
    def pop(self):
        return self.stack.pop()
    
    def isEmpty(self):
        return len(self.stack) == 0

    def reload(self, other):
        """Reloads the stack in this Stack instance from another Stack instance.
        
        Copies the stack from the other Stack into this one, 
        and clears the other Stack."""
        self.stack = other.stack.copy()
        other.stack = []
        
        shuffle(self.stack) # Shuffle contents using random.shuffle()


app = FastAPI()

# Configure CORS middleware to allow all origins, credentials, 
# GET methods, and headers for the FastAPI app. This allows 
# the frontend to make requests to the backend API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Two stacks are used to ensure that the facts are not sent twice
unsentFacts = Stack()
sentFacts = Stack()

PATH = os.path.dirname(__file__)


#  Read facts from file and remove the trailing newline character "\n"
try:
    with open(f"{PATH}/facts.txt", "r", encoding="utf-8") as f:
        for fact in f.readlines():
            unsentFacts.push(fact.strip("\n"))

    # Shuffle facts in stack using random.shuffle()
    shuffle(unsentFacts.stack)

except FileNotFoundError:
    print("No facts.txt file found.")
except Exception as e:
    print(f"An Unknown Error occured while reading facts.txt: {e}")

# Default page
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Main fact api endpoint
@app.get("/get-fact")
async def getFact():
    if unsentFacts.isEmpty():
        # If the unsent facts stack is empty, reload it with the sent facts stack
        unsentFacts.reload(sentFacts)
    
    fact = unsentFacts.pop()
    sentFacts.push(fact)
    
    return {"fact": fact}