<div align="center">
<img src="https://raw.githubusercontent.com/archanpatkar/mure/master/static/mure.png" />
</div>

# A rule engine for MIU System

<div align="left">
<div> <img src="https://github.com/archanpatkar/mure/workflows/build/badge.svg"/> <img src="https://img.shields.io/badge/Coverage-100%25-brightgreen" /> <img src="https://img.shields.io/badge/License-MIT-brightgreen" /> 
</div>
<img src="https://cdn.rawgit.com/standard/standard/master/badge.svg" href="https://github.com/standard/standard" />
</div>

### Introduction

Mure is rule engine, more specifically a string term rewriting system with production rules, the name **mure** stands for **mu rule engine** and has been kept due to the abbreviation it leads to, coincidentally (discovered after the fact) the meaning of the word **mure** (enclosed within walls or imprisoned) and it's implication in this context is very much what Dr. Hofstadter is trying to illustrate using the **MU puzzle** in the **GEB book**. The distinction of **reasoning in the system** and **reasoning about the system** and the limitation of expressing some propositions or proofs from within the system (trapped/constrained from the foundational formalisms or axioms of the system) and as humans, we have *meta-reasoning* skills which are activated as soon we start to get a hint by getting stuck or stonewalled from reasoning inside the system we start to think and analyze the system as a whole and in that effort we figure out the limitation of the system.

The **MIU System** is a formal system where in that system there are some valid symbols i.e. **`M`**, **`I`** and **`U`** and using these fundamental symbols you can combine them and create strings in the system. **MIU System** also defines some rules for string transformations, these rules are only applicable if the given string statisfies the rule's neccesary precondition which is essentially a pattern which has occur in the string and only then you can apply and transform it is something similar to the **rules of inference** of **Propsitional Logic** where the conclusion is proved or derived on basis of the statisfiability of the premise. The rules are given below -

| Rule no. |            Formal Rule           |   Example   |
|----------|:--------------------------------:|:-----------:|
|     1    |     *x* **`I`** ⟶ *x* **`IU`**     |   **`MI`** ⟶ **`MIU`**  |
|     2    |     **`M`** *x* ⟶ **`M`** *xx*     |   **`MI`** ⟶ **`MII`**  |
|     3    |  *x* **`III`** *y* ⟶ *x* **`U`** *y* | **`MIIIU`** ⟶ **`MUU`** |
|     4    |       *x* **`UU`** *y* ⟶ *xy*      | **`MIUUI`** ⟶ **`MII`** |

This library helps you work with the **MIU System** where you can check if the the given string is valid, check which rules can be applied, apply transformations etc. This project or the initial source code was conceived a couple of years ago when I was trying to solve the MU Puzzle (Challange in the GEB book), the problem statement of the puzzle is given an initial string or axiom **`MI`** can we derive using any number of transformations the string **`MU`**. I was stuck on the puzzle and trying to derive it by hand on paper then eventually got fed up and decided to write a bruteforce algorithm which would run and help me get the rule application order which would yield the answer. Then I eventually found out that it was not possible derive or give proof of the theorem by applying **inference rules** on the given **axiom**, explaination for **why?** is provided in the **GEB book** but if you don't have the book you can refer to a very good and concise explaination on [Wikipedia](https://en.wikipedia.org/wiki/MU_puzzle). Even though you can't derive the string **`MU`** from the given preconditions but still **MIU System** is a very interesting to work and explore using this library you can play and discover new theorems, higher level patterns etc. so I decided to publish this library as a package so other people can build on and reuse this work. 

But you may ask what's the point of this? Dr. Hofstadter is a proponent of a theory of cognitive science as he calls it **Analogy as the Core of Cognition** where he proposes that we humans at the core of our cognition use analogy making to learn through correlating things *consciously* and *unconsciously*. So **MIU System** serves as tool for us to learn a simple but profound conclusions about formal axiomatic systems, their limitations and their ability of performing self referential analysis i.e. to find out about the limitations about the system from within the framework of the system. So these concepts which we learn through **MIU System** get transfered directly to and serve as an analogue to the ideas and problems, in the context of *Mathematical Logic*, *Foundation of Mathematics* and *Gödel's incompleteness theorems*, for more details and how these things correlate and emerge you can pick up and read the book **Gödel, Escher, Bach: an Eternal Golden Braid** by **Douglas Hofstadter**. 

### Installation

#### `NPM`
```javascript
npm i mured
```

#### `CDN`
```html
<script src="https://unpkg.com/mured"></script>
```

### API Reference
> Mure has no external dependancies

#### `Importing Mure`
When you import the package you will get an object which includes all the functions needed for working with the **MIU System**.
```javascript
let mure = require("mure");
// or only include relevant functions
let { isValid, applyRule } = require("mure");
```

#### `mure.isValid(str: String) -> Boolean`
This function helps you check whether the string is valid within the **MIU System**. Note: Any function provided by the library is **case insensitive** so both the input strings **`mUi`** and **`MUI`** will yield **`true`**.
```javascript
let mure = require("mure");

console.log(mure.isValid("dslkfjl")); // -> false
console.log(mure.isValid("MII")); // -> true
```

#### `mure.canApply(str: String, rule: Integer[1..4]) -> Boolean`
This function takes a string and an integer within the range [1..4] (You can refer to the above table for the rule's transformational semantics) and yields a bool which determines whether the given rule is applicable over the string or not. Note: This function will throw an exception if the rule number sent was outside of the given range.
```javascript
let mure = require("mure");

console.log(mure.canApply("MI",2)); // -> true
console.log(mure.canApply("MIII",3)); // -> true
console.log(mure.canApply("MIU",4)); // -> false
```

#### `mure.canApplyWhich(str: String) -> Array<Integer[1..4]>`
This function takes a string and yields an array of integers which is, all the rules which can be applied on the string.
```javascript
let mure = require("mure");

console.log(mure.canApply("MI")); // -> [1, 2]
console.log(mure.canApply("MIII")); // -> [1, 2, 3]
console.log(mure.canApply("MIU")); // -> [2]
```

#### `mure.applyRule(str: String, rule: Integer[1..4]) -> String | Array<String>`
This function takes a string and an integer within the range [1..4] and yields either the transformed string or an array of transformed strings some strings in MIU System may yield different strings for the application of the same rule e.g. Let's take for example the string **`MIIII`** when we try to apply **rule 3** there are 2 ways you can transform and reduce the string **`MIIII`** ⟶ **`M[III]I`** ⟶ **`MUI`** or the second way **`MIIII`** ⟶ **`MI[III]`** ⟶ **`MIU`**. This function will only return an array for **rules 3 and 4** because there can be multiple outcomes from the application of rules. Note: This function will throw an exception either if the rule number sent was outside of the given range or the string sent was not a valid string in the **MIU System**.
```javascript
let mure = require("mure");

console.log(mure.applyRule("MI",1)); // -> "MIU"
console.log(mure.applyRule("MIII",3)); // -> ["MU"]
console.log(mure.applyRule("MIU",2)); // -> "MIUIU"
console.log(mure.applyRule("MIIII",3)); // -> ["MUI", "MIU"]
```

#### `mure.applyAll(str: String) -> Array<String>`
This function takes a string and yields an array of transformed strings by applying all the valid rules on the string. Note: This function will throw an exception if the given string sent was not a valid string in the **MIU System**.
```javascript
let mure = require("mure");

console.log(mure.applyAll("MI")); // -> ["MIU", "MII"]
console.log(mure.applyAll("MIII")); // -> ["MIIIU", "MIIIIII", "MU"]
console.log(mure.applyAll("MIU")); // -> ["MIUIU"]
console.log(mure.applyAll("MIIII")); // -> ["MIIIIU", "MIIIIIIII", "MUI", "MIU"]
```

#### `mure.possibility(iterations: Integer, start?: String | Array<String>) -> Set<Set<String>>`
This function takes an integer which is the number of iterations and second an optional argument which is the starting state and it either takes a String or an array of strings (Default is the axiom string from MU Puzzle - **`MI`**). This function takes the starting state which is a set of valid MIU strings then applies all the possible rules on each string and stores all the unique transformed strings in a new set which is used in the next iteration. This happens for n iterations as specified while calling the function and outcomes from all iterations are stored in a Set of Sets which is eventually returned after the completion. 

For example - 

Initial State → **`MI`**
Iterations → **2**

*{* **`MI`** *}* ⇒ <br>
*{* **`MIU`**, **`MII`** *}* ⇒ <br>
*{* **`MIUIU`**, **`MIIU`**, **`MIIII`** *}* <br>

Outcome → *{* *{* **`MI`** *}*, *{* **`MIU`**, **`MII`** *}*, *{* **`MIUIU`**, **`MIIU`**, **`MIIII`** *}* *}*

Note: This function will throw an exception if the given string sent was not a valid string in the **MIU System**.
```javascript
let mure = require("mure");

console.log(mure.possibility(3)); // ->
/*  
{
    { "MI" },
    { "MIU", "MII" },
    { "MIUIU", "MIIU", "MIIII" },
    { "MIUIUIUIU", "MIIUIIU", "MIIIIU", "MIIIIIIII", "MUI", "MIU" }
}
*/
console.log(mure.possibility(1,"MUI")); // -> { { "MUI" }, { "MUIU", "MUIUI" } }
console.log(mure.possibility(1,["MUI","MIII"])); // ->
/*  
{
    { 'MUI', 'MIII' },
    { 'MUIU', 'MUIUI', 'MIIIU', 'MIIIIII', 'MU' }
}
*/
```

#### `mure.lazyPossibility(start?: String | Array<String>, iterations?: Integer) -> Generator<Set<String>>`

This function is similar to the possibility function but is lazy variation where the function is a generator(coroutine based iterator) which yields the Set for each iteration. This technique is very useful where number of iterations is very high or in general if you want to avoid eager computation and compute on need-to-know basis. By default if you don't pass the iterations argument then you can keep on obtaining for **∞** *Infinity*, if you pass the iterations arguments only then it will terminate (beware if using this generator in foreach loops without passing iterations it will go on forever). The default starting string is **`MI`**. Note: This function will throw an exception if the given string sent was not a valid string in the **MIU System**.

```javascript
let mure = require("mure");

let gen = mure.lazyPossibility();
console.log(gen.next()); 
console.log(gen.next()); 
console.log(gen.next()); 

for(let i of mure.lazyPossibility("MUI",2)) {
    console.log(i);
}
```
