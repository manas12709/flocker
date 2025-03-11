---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /anvaymcqblog
title: Anvay's MCQ Blog
categories: [Anvay Final Retrospective]
---

## Overview


![Image](https://github.com/user-attachments/assets/3d7ab0bb-2332-4df0-aded-05d2f645f960)


I recently completed an AP Computer Science Principles MCQ practice exam, and overall, my performance was strong. I answered **64/67** questions correctly, demonstrating a solid understanding of algorithms, programming, and computational principles. Below is a detailed breakdown of my results, including my overall performance, key mistakes, and areas for improvement.

---

## Performance Breakdown



### **Big Idea Analysis**

![Image](https://github.com/user-attachments/assets/fbded513-39c6-4450-b56a-eaf470827511)

| **Big Idea**                                      | **Number of Questions** | **Average Performance %** |
|---------------------------------------------------|--------------------------|---------------------------|
| AAP: Algorithms and Programming                  | 38                       | 92%                        |
| CRD: Creative Development            #            | 9                        | 100%                      |
| CSN: Computing Systems and Networks             | 6                        | 100%                      |
| DAT: Data                                        | 13                       | 100%                      |
| IOC: Impact of Computing                         | 9                        | 100%                      |



### **Practice Area Performance**

![Image](https://github.com/user-attachments/assets/ca70efe5-431f-403e-a4c0-e05d737dba70)

| **Practice**                                                        | **Number of Questions** | **Average Performance %** |
|----------------------------------------------------------------------|--------------------------|---------------------------|
| Practice 6: Contribute to an inclusive, safe, collaborative, and ethical computing culture. | 0                        | NA                        |
| Practice 5: Investigate computing innovations.                       | 18                       | 100%                      |
| Practice 4: Evaluate and test algorithms and programs.               | 12                       | 92%                       |
| Practice 3: Develop programs that incorporate abstractions.          | 7                        | 86%                       |
| Practice 2: Develop and implement algorithms.                        | 13                       | 100%                      |
| Practice 1: Design and evaluate computational solutions for a purpose. | 17                       | 94%                       |

### **Skill-Based Performance**

![Image](https://github.com/user-attachments/assets/70964d61-0035-4e4a-bf35-12ef489a82e0)


| **Skill**                                                          | **Number of Questions** | **Average Performance %** |
|--------------------------------------------------------------------|--------------------------|---------------------------|
| Skill 5.E: Evaluate the use of computing based on legal and ethical factors. | 4                        | 100%                      |
| Skill 5.D: Describe the impact of gathering data.                   | 2                        | 100%                      |
| Skill 5.C: Describe the impact of a computing innovation.           | 1                        | 100%                      |
| Skill 5.B: Explain how knowledge can be generated from data.        | 7                        | 100%                      |
| Skill 5.A: Explain how computing systems work.                      | 4                        | 100%                      |
| Skill 4.C: Identify and correct errors in algorithms and programs.  | 7                        | 100%                      |
| Skill 4.B: Determine the result of code segments.                   | 5                        | 80%                       |
| Skill 3.B: Use abstraction to manage complexity in a program.       | 5                        | 80%                       |
| Skill 2.B: Implement and apply an algorithm.                        | 11                       | 100%                      |
| Skill 1.D: Evaluate solution options.                               | 12                       | 92%                       |

---

## **Questions I Got Wrong: Analysis and Improvement**

### **1. Reasonable Time Algorithms**

![Image](https://github.com/user-attachments/assets/f3018c1f-9bed-41d7-a4e1-9cb17861f31a)

#### **Question Overview**
This question tested my understanding of algorithm efficiency and what constitutes reasonable runtime performance.

#### **My Answer (Incorrect):** `III only`
#### **Correct Answer:** `I, II, and III`

#### **Why I Got It Wrong**
- I assumed that only algorithm III (which accesses a fixed number of elements) was reasonable.
- However, algorithm I (accessing elements `2n` times) and algorithm II (accessing elements `n` times) are both **linear** in complexity (O(n)), which is still considered reasonable.

#### **How I Can Improve**
- Review **Big-O notation** and understand that linear time (O(n)) is still efficient for large inputs.
- Recognize that polynomial (O(n^2)) or exponential (O(2^n)) complexity is what makes an algorithm unreasonable.

---

### **2. Counting Unique Elements in Lists**

![Image](https://github.com/user-attachments/assets/207dbec3-9ece-48d1-b1da-c86b2a12ca04)

#### **Question Overview**
This question required me to correctly count the number of elements appearing in one list but not the other.

#### **My Answer (Incorrect):** `C`
#### **Correct Answer:** `D`

#### **Why I Got It Wrong**
- My approach improperly removed duplicates before merging lists, which led to miscounting.
- I didn't correctly account for the unique elements **before** combining both lists.

#### **How I Can Improve**
- Break down steps carefully when dealing with list operations like **merging, filtering, and set operations**.
- Visualize list transformations step by step to track where elements are lost or double-counted.

---

### **3. String Manipulation with Concatenation & Substring**

![Image](https://github.com/user-attachments/assets/1a669340-092a-46a1-a2c8-5605df85f1bd)

#### **Question Overview**
This question involved manipulating strings using `Substring()` and `Concat()` functions.

#### **My Answer (Incorrect):** `D`
#### **Correct Answer:** `A, B`

#### **Why I Got It Wrong**
- I misunderstood how substrings and concatenation were applied sequentially.
- My selected method improperly reordered parts of the string, creating an incorrect final output.

#### **How I Can Improve**
- Practice more **string manipulation problems** with functions like substring extraction and concatenation.
- Carefully **trace variable states** to see how each step modifies the string.

---

## **Final Reflection & Next Steps**

### **Strengths:**

- **Strong grasp of algorithms and programming:** I performed well in most algorithm-related questions (92% accuracy).

- **Excellent understanding of computing innovations and ethical concerns:** I scored 100% in all questions under these topics.

- **Solid debugging and error correction skills:** I successfully identified and fixed errors in most programs.

### **Areas for Improvement:**
- **Algorithm Complexity:** I need to reinforce my understanding of what constitutes **reasonable vs. unreasonable runtime**.
- **List Manipulation & Unique Element Counting:** I should practice **merging lists and filtering unique values** more methodically.
- **String Processing & Order of Operations:** I need to **trace variable transformations** carefully when dealing with substrings and concatenations.

### **Action Plan for Improvement:**
1. **Review Big-O Complexity:** Work through examples of **O(n), O(n^2), and O(2^n)** to recognize efficiency patterns.
2. **Practice More List Problems:** Use LeetCode or AP CSP practice sets to reinforce **list operations and set differences**.
3. **Work on String Manipulation Exercises:** Focus on **tracing substrings and concatenation functions** to improve debugging accuracy.

---

## **Final Thoughts**
This MCQ exam was a great way to assess my knowledge, and I’m happy with my overall performance. While I made a few mistakes, they were learning opportunities that will help me improve for future tests. By focusing on **algorithm complexity, list operations, and string manipulation**, I can strengthen my weak areas and ensure even better performance next time!
