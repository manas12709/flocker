---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /yashmcqblog
title: Yash's MCQ Blog
categories: [Yash Final Retrospective]
---



| **Number** | **Name**                                  | **Topic** | **Skills** |
|------------|-------------------------------------------|-----------|------------|
| Q55        | Average height algorithm                  | 3.8       | 2.A        |
| Q50        | Reasonable time algorithms                | 3.17      | 1.D        |
| Q35        | Generalization of MaxTwo and MaxThree     | 3.13      | 3.C        |
| Q28        | Swap alpha and beta                       | 3.1       | 4.B        |

# Q55 Average height algorithm
![Q55.png]({{site.baseurl}}/images/Sprint5/2020mccorrections/q55.png)

*Why Option A is Correct:*
Step 2 needs to establish the initial values for the algorithm to work properly. By having each person write their height at the top of the card and the number 1 at the bottom, we are:
- Tracking the sum of heights (top number)
- Tracking how many people's heights are included in that sum (bottom number)

This allows the final step (dividing the top number by the bottom number) to correctly calculate the average height.

*Why the Other Options Are Incorrect:*
Option B: "Each person writes their height, in centimeters, at the top of the card and writes the number 2 at the bottom of the card."
- This is incorrect because using 2 as the initial count would lead to an incorrect average calculation.

Option C: "Each person writes the number 1 at the top of the card and writes their height, in centimeters, at the bottom of the card."
- This is incorrect because the top number needs to represent the sum of heights, not the count.

Option D: "Each person writes the number 2 at the top of the card and writes their height, in centimeters, at the bottom of the card."
- This is incorrect because neither value is properly initialized for the algorithm to work.

# Q50 Reasonable time algorithms
![Q50.png]({{site.baseurl}}/images/Sprint5/2020mccorrections/q50.png)

*Why Option D is Correct:*
All three algorithms run in reasonable time:
- Algorithm I accesses each element twice (2n)
- Algorithm II accesses each element n times (n^2)
- Algorithm III only accesses the first 10 elements (10)
- All of these are algebraically considered to run in reasonable time.

*Why the Other Options Are Incorrect:*
Option A: "I only"
- This is incorrect because algorithms II and III also run in reasonable time.

Option B: "III only"
- This is incorrect because algorithms I and II also run in reasonable time.

Option C: "I and II only"
- This is incorrect because algorithm III also runs in reasonable time.

# Q35 Generalization of MaxTwo and MaxThree
![Q35.png]({{site.baseurl}}/images/Sprint5/2020mccorrections/q35.png)

*Why Option B is Correct:*
The `Max(numList)` procedure is a proper generalization of both `MaxTwo` and `MaxThree` because:
- It can handle any number of values, including exactly two or three
- It performs the same function (finding the maximum value) but generalizes to lists of any size
- The essential functionality of finding a maximum is preserved

*Why the Other Options Are Incorrect:*
Option A: "Procedure `Min(x, y)`, which returns the lesser of its two integer parameters"
- This is incorrect because it finds the minimum rather than the maximum, which is fundamentally different from the original procedures.

Option C: "Procedure `MaxFour(w, x, y, z)`, which returns the greatest of its four integer parameters"
- This is incorrect because while it extends the concept to four parameters, it's not a true generalization. It's just another specific case rather than handling an arbitrary number of values.

Option D: "Procedure `OverMax(numList, max)`, which returns the number of integers in numList that exceed the integer value max"
- This is incorrect because it counts values exceeding a threshold rather than finding the maximum value, which is a different functionality.

# Q28 Swap alpha and beta
![Q28.png]({{site.baseurl}}/images/Sprint5/2020mccorrections/q28.png)

*Why Option B is Correct:*
To properly swap two variables, we need a temporary variable to hold one value while we overwrite it with the other. Looking at the code segments:

I (temp ← alpha, alpha ← beta, beta ← temp):
- Correctly saves alpha in temp
- Assigns beta's value to alpha
- Assigns the original value of alpha (saved in temp) to beta

III (temp ← beta, beta ← alpha, alpha ← temp):
- Correctly saves beta in temp
- Assigns alpha's value to beta
- Assigns the original value of beta (saved in temp) to alpha

Both I and III properly swap the values.

*Why the Other Options Are Incorrect:*
Option A: "I and II only"
- This is incorrect because II does not properly swap the values. In II, alpha's value is lost when beta is assigned alpha.

Option C: "II and III only"
- This is incorrect because II does not properly swap the values, as explained above.

Option D: "I, II, and III"
- This is incorrect because II does not properly swap the values, as explained above.