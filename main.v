module main;
    reg a;
    reg b;
    wire and_result;
    wire or_result;
    wire xor_result;

    assign and_result = a & b;
    assign or_result  = a | b;
    assign xor_result = a ^ b;

    initial begin
        $display("Verilog Online Compiler Test");
        $display("----------------------------");

        a = 0; b = 0; #10;
        $display("a=%b b=%b AND=%b OR=%b XOR=%b",
                 a, b, and_result, or_result, xor_result);

        a = 0; b = 1; #10;
        $display("a=%b b=%b AND=%b OR=%b XOR=%b",
                 a, b, and_result, or_result, xor_result);

        a = 1; b = 0; #10;
        $display("a=%b b=%b AND=%b OR=%b XOR=%b",
                 a, b, and_result, or_result, xor_result);

        a = 1; b = 1; #10;
        $display("a=%b b=%b AND=%b OR=%b XOR=%b",
                 a, b, and_result, or_result, xor_result);

        $finish;
    end
endmodule
