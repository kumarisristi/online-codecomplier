import std/[strformat, sequtils]

let numbers = @[10, 20, 30, 40, 50]

let total = numbers.foldl(a + b)
let average = float(total) / float(numbers.len)
let highest = numbers.max
let lowest = numbers.min

echo fmt"Numbers: {numbers}"
echo fmt"Total: {total}"
echo fmt"Average: {average:.1f}"
echo fmt"Highest: {highest}"
echo fmt"Lowest: {lowest}"

