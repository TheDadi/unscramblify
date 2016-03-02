# unscramblify

## GOAL

The goal is to implement a small word puzzle game that presents the user with a mangled word and
asks her to enter the correct, unmangled word. If the word to unmangle is pizza the application may
present the word as zpaiz and the user must then enter P I Z Z A in this order for the solution to be
accepted.

## SCORING

The scoring of the game is as follows:
* A full score is given only if the word was entered correctly on first guess without ever
deleting any character
* For each character that was deleted whilst entering the word -1 is subtracted from the score
* The maximally obtainable score for a word is max_score = floor(1.95^(n/3))where n
is the number of characters in the word, ^ denotes the exponential function and floor is the
round-down function which truncates a float to an integer
* The score for a word can never be negative, as such max_score >= score >= 0 always holds for
score being the actual score the user receives for solving this word
A game runs for 40 seconds, during which the user can solve as many words as she can manage.
Users are identified by their name (no need to create a registration form/password) and a global,
