<div align="center">
<img src="./mure.png" />
</div>

# A rule engine for MIU System

<div align="left">
<div> <img src="https://github.com/archanpatkar/mure/workflows/build/badge.svg"/> <img src="https://img.shields.io/badge/License-MIT-brightgreen" /> <img src="https://img.shields.io/badge/Coverage-100%25-brightgreen" /> <img src="https://img.shields.io/badge/NPM-0.0.1-brightgreen" /> 
</div>
<img src="https://cdn.rawgit.com/standard/standard/master/badge.svg" href="https://github.com/standard/standard" />
</div>

<div align="center">

### Introduction

</div>

Mure is rule engine, more specifically a string term rewriting system or more generally a production rule system, but the name **`mure`** stands for `mu rule engine` and has been chosen due to the abbreviation it leads to, the word **mure** and its meaning is very much what Dr. Hofstadter is trying to illustrate using the MU puzzle in the book. The distinction of **`reasoning in the system`** and **`reasoning about the system`** and the limitation of expressing some propositions or proofs from within the system (trapped/constrained from the foundational formalisms or axioms of the system) but as humans, we have meta-reasoning skills which are activated as soon we start to get a hint from getting stuck from reasoning inside the system and we start to think and analyze the system as a whole and in that effort we figure out the limitation of the system.

The MU System is a formal system where in that system there are some valid symbols i.e. **`M`**, **`I`** and **`U`** and using these fundamental symbols you can combine them and create strings in the system. MU System also defines some rules for string transformations, these rules are only applicable if the given string statisfies the rule's neccesary precondition which is essentially a pattern which has occur in the string and only then you can apply and transform it something similar to the rules of inference of Propsitional Logic where the conclusion is proved or derived on basis of the statisfiability of the premise. The rules are given below -

| Rule no. |            Formal Rule           |   Example   |
|----------|:--------------------------------:|:-----------:|
|     1    |     *x***`I`** ⟶ *x***`IU`**     |   MI ⟶ MIU  |
|     2    |     **`M`***x* ⟶ **`M`***xx*     |   MI ⟶ MII  |
|     3    |  *x***`III`***y* ⟶ *x***`U`***y* | MIIIU ⟶ MUU |
|     4    |       *x***`UU`***y* ⟶ *xy*      | MIUUI ⟶ MII |
