let numbers = [10; 20; 30; 40; 50]

let total = List.sum numbers
let average = float total / float numbers.Length
let highest = List.max numbers
let lowest = List.min numbers

printfn "Numbers: %A" numbers
printfn "Total: %d" total
printfn "Average: %.1f" average
printfn "Highest: %d" highest
printfn "Lowest: %d" lowest
