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
        shuffle(self.stack)  # Shuffle contents when pushing
    
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

unsentChemFacts = Stack()
sentChemFacts = Stack()

unsentItFacts = Stack()
sentItFacts = Stack()

unsentMechFacts = Stack()
sentMechFacts = Stack()

unsentElectricalFacts = Stack()
sentElectricalFacts = Stack()

PATH = os.path.dirname(__file__)

# Read facts from file and remove the trailing newline character "\n"
def load_facts(file_name, unsent_stack):
    try:
        with open(file_name, "r", encoding="utf-8") as f:
            for fact in f.readlines():
                unsent_stack.push(fact.strip("\n"))
    except FileNotFoundError:
        print(f"No {file_name} file found.")
    except Exception as e:
        print(f"An unknown error occurred while reading {file_name}: {e}")

load_facts(f"{PATH}/chem.txt", unsentChemFacts)
load_facts(f"{PATH}/it.txt", unsentItFacts)
load_facts(f"{PATH}/mech.txt", unsentMechFacts)
load_facts(f"{PATH}/electrical.txt", unsentElectricalFacts)

# Default page
@app.get("/")
async def root():
    return {"message": "Hello World"}

# Main fact api endpoints
@app.get("/get-chem-fact")
async def get_chem_fact():
    if unsentChemFacts.isEmpty():
        unsentChemFacts.reload(sentChemFacts)
    fact = unsentChemFacts.pop()
    sentChemFacts.push(fact)
    return {"fact": fact}

@app.get("/get-it-fact")
async def get_it_fact():
    if unsentItFacts.isEmpty():
        unsentItFacts.reload(sentItFacts)
    fact = unsentItFacts.pop()
    sentItFacts.push(fact)
    return {"fact": fact}

@app.get("/get-mech-fact")
async def get_mech_fact():
    if unsentMechFacts.isEmpty():
        unsentMechFacts.reload(sentMechFacts)
    fact = unsentMechFacts.pop()
    sentMechFacts.push(fact)
    return {"fact": fact}

@app.get("/get-electrical-fact")
async def get_electrical_fact():
    if unsentElectricalFacts.isEmpty():
        unsentElectricalFacts.reload(sentElectricalFacts)
    fact = unsentElectricalFacts.pop()
    sentElectricalFacts.push(fact)
    return {"fact": fact}
