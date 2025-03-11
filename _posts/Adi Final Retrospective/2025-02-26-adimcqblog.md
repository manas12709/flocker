---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /adimcqblog
title: Adi's MCQ Blog
categories: [Adi Final Retrospective]
---

# 2020 Practice Exam 1 MCQ Reflection

## tl;dr: I spent 2:21 on the exam (OT) and I need to review BI 3 as well as getting faster with logic-heavy problems (logic gates, etc.)

![score](https://github.com/user-attachments/assets/72511716-89f6-41ad-81f5-3a4c6543f086)

Even though I answered most of the questions on this practice test using my knowledge and a sheet of paper, I needed help on this question. While taking the practice test, I forgot how to convert from binary to decimal, but I eventually re-learned it after a quick refresher.

Even though I performed well on this practice exam, I need to reduce the amount of time I spend per question, and be more efficient with the questions that require lots of logic to figure out.

Big Idea 3 was also an area that I struggled with in this practice exam and the previous one. Specifically, logic gates seem confusing to me despite how simple they seem on the surface. To prepare for the AP exam, I want to get more practice with Big Idea 3 as a whole with a focus on 3.5.

In this question, I made an interesting mistake:
![conpresion](https://github.com/user-attachments/assets/96b475d4-5eaf-48db-96e8-e838a7b3ba28)
In this question, the reason the answer isn't D is because answer option D does not use any compression. However, in option A, both devices manage to compress and decompress without losing any data, which is why it is considered lossless.

![sillymistake](https://github.com/user-attachments/assets/6de56b80-4ad8-4c7e-b7e4-5ae29dc77a0d)
It doesn't make any sense to store a duplicate copy of data at all in the case of an image, so it makes sense to choose answer option D in this example.

A prime example of a problem that took me lots of time is "Question 15: Compare output of program a and b."
![wronganswer](https://github.com/user-attachments/assets/ec969893-2c86-45dd-935b-eb962a33b3e5)
In this problem, I made the mistake of taking too long on this question and overthinking what it was trying to ask me. I should have "went with my gut" and chosen answer A. The reason why option C is incorrect is because it doesn't account for the one extra loop iteration that happens in program b compared to program a.

This mistake is related to converting from decimal to binary.
![Image](https://github.com/user-attachments/assets/4502a174-3102-4ade-89cc-70531f336311)

To convert a decimal number to binary, follow these steps:

1. Divide the decimal number by 2.
2. Record the remainder (it will be either 0 or 1).
3. Update the decimal number to be the quotient from the division.
4. Repeat steps 1-3 until the decimal number is 0.
5. The binary representation is the sequence of remainders read from bottom to top.

Here are some examples:

- Converting `75` to binary:
    - 75 ÷ 2 = 37 remainder 1
    - 37 ÷ 2 = 18 remainder 1
    - 18 ÷ 2 = 9 remainder 0
    - 9 ÷ 2 = 4 remainder 1
    - 4 ÷ 2 = 2 remainder 0
    - 2 ÷ 2 = 1 remainder 0
    - 1 ÷ 2 = 0 remainder 1
    - Binary: `1001011`

- Converting `0` to binary:
    - Binary: `0`

- Converting `130` to binary:
    - 130 ÷ 2 = 65 remainder 0
    - 65 ÷ 2 = 32 remainder 1
    - 32 ÷ 2 = 16 remainder 0
    - 16 ÷ 2 = 8 remainder 0
    - 8 ÷ 2 = 4 remainder 0
    - 4 ÷ 2 = 2 remainder 0
    - 2 ÷ 2 = 1 remainder 0
    - 1 ÷ 2 = 0 remainder 1
    - Binary: `10000010`

![Image](https://github.com/user-attachments/assets/08db54a4-d634-4c7d-a499-b30ac6e00b71)

- **Understanding the circuit logic:**
  - The circuit consists of three logic gates: OR, AND, and a final AND gate.
  - The OR gate takes inputs A and B.
  - The first AND gate takes inputs C and D.
  - The final AND gate takes the outputs from the OR and AND gates.

- **Conditions for a TRUE output:**
  - The OR gate outputs **true** if at least one of A or B is true.
  - The first AND gate outputs **true** only if both C and D are true.
  - The final AND gate outputs **true** if both inputs from the OR and first AND gates are true.

- **Evaluating the correct answer (C: A = false, B = true, C = true, D = true):**
  - OR gate: `A OR B = false OR true = true`
  - First AND gate: `C AND D = true AND true = true`
  - Final AND gate: `true AND true = true`
  - **Final output is true, so this is the correct choice.**

I did well on the rest of the practice exam, and I believe that I was pretty efficient with managing my time and answering questions accurately considering that I spent the majority of my time in the first half of the exam and left little for the rest. In the future, it will help to get more practice with problems of this style so that I can manage my time more efficiently.