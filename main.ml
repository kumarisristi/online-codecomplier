let numbers = [10; 20; 30; 40; 50]

let total = List.fold_left ( + ) 0 numbers
let average = float total /. float (List.length numbers)
let highest = List.fold_left max min_int numbers
let lowest = List.fold_left min max_int numbers

let () =
  Printf.printf "Numbers: %s\n"
    (String.concat "; " (List.map string_of_int numbers));
  Printf.printf "Total: %d\n" total;
  Printf.printf "Average: %.1f\n" average;
  Printf.printf "Highest: %d\n" highest;
  Printf.printf "Lowest: %d\n" lowest

