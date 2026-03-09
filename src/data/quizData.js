export const QUIZ_DATA = {
  "Quiz: Python Basics": [
    { q: "What keyword defines a function in Python?", options: ["func","def","function","define"], answer: 1 },
    { q: "Which data type stores key-value pairs?",    options: ["List","Tuple","Dictionary","Set"], answer: 2 },
    { q: "What does `len([1,2,3])` return?",           options: ["2","3","4","Error"], answer: 1 },
  ],
  "Quiz: JS Basics": [
    { q: "Which method adds an element to end of array?",  options: ["push()","pop()","shift()","append()"], answer: 0 },
    { q: "What does `document.getElementById()` return?", options: ["CSS class","HTML element","A URL","String"], answer: 1 },
    { q: "Which declares a block-scoped variable?",       options: ["var","val","let","function"], answer: 2 },
  ],
  "Quiz: React Core": [
    { q: "Which hook manages local component state?", options: ["useEffect","useRef","useState","useContext"], answer: 2 },
    { q: "Props in React are:",                       options: ["Mutable internal data","Read-only from parent","Global vars","CSS classes"], answer: 1 },
    { q: "useEffect runs:",                           options: ["Before render","After render","During render","Never"], answer: 1 },
  ],
  "Quiz: SQL": [
    { q: "Which JOIN returns all rows from both tables?", options: ["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL OUTER JOIN"], answer: 3 },
    { q: "Which clause filters grouped results?",         options: ["WHERE","HAVING","FILTER","ORDER BY"], answer: 1 },
    { q: "What does COUNT(*) return?",                    options: ["Sum","Total rows","Average","Max"], answer: 1 },
  ],
  "Quiz: Git Basics": [
    { q: "Which command stages all changes?", options: ["git commit","git add .","git push","git pull"], answer: 1 },
    { q: "What does git merge do?",           options: ["Deletes a branch","Combines branches","Reverts commits","Clones a repo"], answer: 1 },
    { q: "What is a pull request?",           options: ["Fetching data","Proposing code changes","Deleting a branch","A git command"], answer: 1 },
  ],
  "Quiz: CSS Layout": [
    { q: "Which property makes a container a flexbox?",     options: ["display: block","display: flex","float: left","position: flex"], answer: 1 },
    { q: "Which CSS property creates named grid areas?",    options: ["grid-template","grid-areas","grid-template-areas","area-template"], answer: 2 },
    { q: "What does justify-content: space-between do?",   options: ["Centers items","Adds padding","Spaces items at edges","Stacks items"], answer: 2 },
  ],
  "Quiz: TypeScript": [
    { q: "Which keyword defines a TypeScript interface?", options: ["type","struct","interface","class"], answer: 2 },
    { q: "What does a generic <T> represent?",           options: ["A type variable","A number","A template string","A class"], answer: 0 },
    { q: "Which utility type makes all fields optional?", options: ["Required<T>","Partial<T>","Omit<T>","Readonly<T>"], answer: 1 },
  ],
  "Quiz: Node & Express": [
    { q: "Which method handles a GET request in Express?", options: ["app.post()","app.get()","app.put()","app.use()"], answer: 1 },
    { q: "What is middleware in Express?",                 options: ["A database","A function with req/res/next","A route","A module"], answer: 1 },
    { q: "What does res.json() do?",                      options: ["Reads JSON","Sends JSON response","Parses JSON","Validates JSON"], answer: 1 },
  ],
};
