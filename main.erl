-module(main).
-export([main/0]).

main() ->
    Numbers = [10, 20, 30, 40, 50],
    io:format("Numbers: ~p~n", [Numbers]),
    io:format("Sum: ~p~n", [lists:sum(Numbers)]),
    io:format("Maximum: ~p~n", [lists:max(Numbers)]),
    io:format("Minimum: ~p~n", [lists:min(Numbers)]).
